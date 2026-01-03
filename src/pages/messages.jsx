'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { contactAPI } from '@/lib/api';
import { toast } from 'react-toastify';
// FIXED: Replaced FiReply with FiSend (valid Feather icon)
import { FiTrash2, FiSend } from 'react-icons/fi'; 

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await contactAPI.getAll();
      setMessages(response.data);
    } catch (error) {
      toast.error('Error fetching messages');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await contactAPI.delete(id);
        toast.success('Message deleted');
        setSelectedMessage(null);
        fetchMessages();
      } catch (error) {
        toast.error('Error deleting message');
      }
    }
  };

  const handleReply = async (id) => {
    if (!replyText.trim()) {
      toast.error('Reply cannot be empty');
      return;
    }
    try {
      await contactAPI.reply(id, replyText);
      toast.success('Reply sent');
      setReplyText('');
      setSelectedMessage(null);
      fetchMessages();
    } catch (error) {
      toast.error('Error sending reply');
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>

            <div className="grid grid-cols-3 gap-4 h-[calc(100vh-200px)]">
              {/* Messages List */}
              <div className="col-span-1 bg-white rounded shadow overflow-auto">
                {messages.length === 0 && <p className="p-4 text-gray-500 text-center">No messages found</p>}
                {messages.map((msg) => (
                  <div
                    key={msg.id} // FIXED: Using 'id' from Supabase
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                      selectedMessage?.id === msg.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <p className="font-semibold">{msg.name}</p>
                    <p className="text-sm text-gray-600 truncate">{msg.subject}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {/* FIXED: Using 'created_at' from Supabase */}
                      {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Message Details */}
              <div className="col-span-2 bg-white rounded shadow p-6 flex flex-col">
                {selectedMessage ? (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
                      <p className="text-gray-600">
                        From: <strong>{selectedMessage.name}</strong> ({selectedMessage.email})
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {/* FIXED: Using 'created_at' from Supabase */}
                        {selectedMessage.created_at ? new Date(selectedMessage.created_at).toLocaleString() : ''}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded mb-6 flex-1 overflow-auto border border-gray-100">
                      <p className="whitespace-pre-wrap text-gray-800">{selectedMessage.message}</p>
                    </div>

                    {selectedMessage.replied && (
                      <div className="bg-green-50 p-4 rounded mb-6 border border-green-100">
                        <p className="text-sm text-green-600 font-semibold mb-2">Your Reply:</p>
                        {/* FIXED: Using 'reply_message' from Supabase */}
                        <p className="text-gray-700">{selectedMessage.reply_message}</p>
                      </div>
                    )}

                    {!selectedMessage.replied && (
                      <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Send Reply</label>
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Type your reply..."
                        />
                        <button
                          onClick={() => handleReply(selectedMessage.id)}
                          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2 transition"
                        >
                          <FiSend /> Send Reply
                        </button>
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t">
                      <button
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="bg-red-50 text-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white flex items-center gap-2 transition"
                      >
                        <FiTrash2 /> Delete Message
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 italic">Select a message from the sidebar to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}