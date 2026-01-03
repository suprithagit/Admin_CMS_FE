'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import TextInput from '@/components/TextInput';
import TextArea from '@/components/TextArea';
import Modal from '@/components/Modal';
import { testimonialsAPI } from '@/lib/api';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Added 'reset' here to ensure form clears correctly
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialsAPI.getAll();
      setTestimonials(response.data || []); // Safety check if data is null
    } catch (error) {
      toast.error('Error fetching testimonials');
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await testimonialsAPI.update(editingId, data);
        toast.success('Testimonial updated');
      } else {
        await testimonialsAPI.create(data);
        toast.success('Testimonial created');
      }
      setModalOpen(false);
      reset();
      setEditingId(null);
      fetchTestimonials();
    } catch (error) {
      toast.error('Error saving testimonial');
    }
  };

  const handleEdit = (testimonial) => {
    reset(testimonial);
    // ✅ FIXED: Use .id instead of ._id
    setEditingId(testimonial.id); 
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await testimonialsAPI.delete(id);
        toast.success('Testimonial deleted');
        fetchTestimonials();
      } catch (error) {
        toast.error('Error deleting testimonial');
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
              <h1 className="text-3xl font-bold">Testimonials</h1>
              <button
                onClick={() => {
                  reset();
                  setEditingId(null);
                  setModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <FiPlus /> Add Testimonial
              </button>
            </div>

            <div className="space-y-4">
              {/* Safety check: ensure testimonials is an array */}
              {Array.isArray(testimonials) && testimonials.map((testimonial) => (
                // ✅ FIXED: Use .id for unique key
                <div key={testimonial.id} className="bg-white rounded shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.position} at {testimonial.company}
                      </p>
                    </div>
                    <span className="text-yellow-500">{'⭐'.repeat(testimonial.rating)}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial.content}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="flex-1 text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2"
                    >
                      <FiEdit /> Edit
                    </button>
                    {/* ✅ FIXED: Use .id instead of ._id */}
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="flex-1 text-red-600 hover:text-red-800 flex items-center justify-center gap-2"
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

      <Modal
        isOpen={modalOpen}
        title={editingId ? 'Edit Testimonial' : 'Add Testimonial'}
        onClose={() => {
          setModalOpen(false);
          reset();
          setEditingId(null);
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput label="Name" name="name" register={register} errors={errors} />
        <TextInput label="Position" name="position" register={register} errors={errors} />
        <TextInput label="Company" name="company" register={register} errors={errors} />
        <TextArea label="Content" name="content" register={register} errors={errors} />
        <TextInput label="Image URL" name="image" register={register} errors={errors} />
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Rating</label>
          <select
            {...register('rating', { required: 'Rating is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </Modal>
    </ProtectedRoute>
  );
}