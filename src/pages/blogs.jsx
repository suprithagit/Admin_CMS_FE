'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import TextInput from '@/components/TextInput';
import TextArea from '@/components/TextArea';
import Modal from '@/components/Modal';
import { blogsAPI } from '@/lib/api';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogsAPI.getAll();
      setBlogs(response.data);
    } catch (error) {
      toast.error('Error fetching blogs');
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await blogsAPI.update(editingId, data);
        toast.success('Blog updated');
      } else {
        await blogsAPI.create(data);
        toast.success('Blog created');
      }
      setModalOpen(false);
      reset();
      setEditingId(null);
      fetchBlogs();
    } catch (error) {
      toast.error('Error saving blog');
    }
  };

  const handleEdit = (blog) => {
    reset(blog);
    setEditingId(blog._id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await blogsAPI.delete(id);
        toast.success('Blog deleted');
        fetchBlogs();
      } catch (error) {
        toast.error('Error deleting blog');
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
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Blogs</h1>
              <button
                onClick={() => {
                  reset();
                  setEditingId(null);
                  setModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <FiPlus /> Add Blog
              </button>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Title</th>
                    <th className="px-6 py-3 text-left font-semibold">Author</th>
                    <th className="px-6 py-3 text-left font-semibold">Published</th>
                    <th className="px-6 py-3 text-left font-semibold">Views</th>
                    <th className="px-6 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold">{blog.title}</td>
                      <td className="px-6 py-4">{blog.author}</td>
                      <td className="px-6 py-4">{blog.published ? 'Yes' : 'No'}</td>
                      <td className="px-6 py-4">{blog.views}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        title={editingId ? 'Edit Blog' : 'Add Blog'}
        onClose={() => {
          setModalOpen(false);
          reset();
          setEditingId(null);
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput label="Title" name="title" register={register} errors={errors} />
        <TextArea label="Content" name="content" register={register} errors={errors} rows={6} />
        <TextArea label="Excerpt" name="excerpt" register={register} errors={errors} rows={3} />
        <TextInput label="Image URL" name="image" register={register} errors={errors} />
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" {...register('published')} className="mr-2" />
            <span className="text-sm font-semibold">Published</span>
          </label>
        </div>
      </Modal>
    </ProtectedRoute>
  );
}
