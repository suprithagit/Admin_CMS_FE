'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import TextInput from '@/components/TextInput';
import TextArea from '@/components/TextArea';
import Modal from '@/components/Modal';
import { servicesAPI } from '@/lib/api';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll();
      setServices(response.data);
    } catch (error) {
      toast.error('Error fetching services');
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await servicesAPI.update(editingId, data);
        toast.success('Service updated');
      } else {
        await servicesAPI.create(data);
        toast.success('Service created');
      }
      setModalOpen(false);
      reset();
      setEditingId(null);
      fetchServices();
    } catch (error) {
      toast.error('Error saving service');
    }
  };

  const handleEdit = (service) => {
    reset(service);
    setEditingId(service._id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await servicesAPI.delete(id);
        toast.success('Service deleted');
        fetchServices();
      } catch (error) {
        toast.error('Error deleting service');
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
              <h1 className="text-3xl font-bold">Services</h1>
              <button
                onClick={() => {
                  reset();
                  setEditingId(null);
                  setModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <FiPlus /> Add Service
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {services.map((service) => (
                <div key={service._id} className="bg-white rounded shadow p-6">
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="flex-1 text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2"
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
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
        title={editingId ? 'Edit Service' : 'Add Service'}
        onClose={() => {
          setModalOpen(false);
          reset();
          setEditingId(null);
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput label="Title" name="title" register={register} errors={errors} />
        <TextArea label="Description" name="description" register={register} errors={errors} />
        <TextInput label="Icon" name="icon" register={register} errors={errors} />
        <TextInput label="Image URL" name="image" register={register} errors={errors} />
      </Modal>
    </ProtectedRoute>
  );
}
