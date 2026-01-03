'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import FileInput from '@/components/FileInput';
import { mediaAPI } from '@/lib/api';
import { toast } from 'react-toastify';
import { FiTrash2, FiPlus } from 'react-icons/fi';

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await mediaAPI.getAll();
      setMedia(response.data);
    } catch (error) {
      toast.error('Error fetching media');
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      await mediaAPI.upload(file);
      toast.success('File uploaded successfully');
      fetchMedia();
    } catch (error) {
      toast.error('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this file?')) {
      try {
        await mediaAPI.delete(id);
        toast.success('File deleted');
        fetchMedia();
      } catch (error) {
        toast.error('Error deleting file');
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            <h1 className="text-3xl font-bold mb-8">Media Library</h1>

            <div className="bg-white rounded shadow p-6 mb-8">
              <FileInput
                label="Upload File"
                onChange={handleUpload}
                accept="image/*,.pdf,video/*"
              />
              {uploading && <p className="text-blue-600">Uploading...</p>}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {media.map((file) => (
                <div key={file._id} className="bg-white rounded shadow overflow-hidden">
                  {file.type === 'image' && (
                    <img
                      src={file.url}
                      alt={file.filename}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  {file.type !== 'image' && (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">{file.type.toUpperCase()}</span>
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-sm font-semibold truncate">{file.filename}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={() => handleDelete(file._id)}
                      className="w-full mt-3 text-red-600 hover:text-red-800 flex items-center justify-center gap-2"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
