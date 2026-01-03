'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import TextInput from '@/components/TextInput';
import TextArea from '@/components/TextArea';
import FileInput from '@/components/FileInput';
import Modal from '@/components/Modal';
import { skillsAPI, mediaAPI } from '@/lib/api';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillsAPI.getAll();
      setSkills(response.data);
    } catch (error) {
      toast.error('Error fetching skills');
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (editingId) {
        await skillsAPI.update(editingId, data);
        toast.success('Skill updated');
      } else {
        await skillsAPI.create(data);
        toast.success('Skill created');
      }
      setModalOpen(false);
      reset();
      setEditingId(null);
      fetchSkills();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving skill');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    reset(skill);
    setEditingId(skill._id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await skillsAPI.delete(id);
        toast.success('Skill deleted');
        fetchSkills();
      } catch (error) {
        toast.error('Error deleting skill');
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
              <h1 className="text-3xl font-bold">Skills</h1>
              <button
                onClick={() => {
                  reset();
                  setEditingId(null);
                  setModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <FiPlus /> Add Skill
              </button>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Name</th>
                    <th className="px-6 py-3 text-left font-semibold">Category</th>
                    <th className="px-6 py-3 text-left font-semibold">Proficiency</th>
                    <th className="px-6 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((skill) => (
                    <tr key={skill._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{skill.name}</td>
                      <td className="px-6 py-4">{skill.category}</td>
                      <td className="px-6 py-4">{skill.proficiency}%</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(skill)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(skill._id)}
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
        title={editingId ? 'Edit Skill' : 'Add Skill'}
        onClose={() => {
          setModalOpen(false);
          reset();
          setEditingId(null);
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput label="Name" name="name" register={register} errors={errors} />
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="tools">Tools</option>
            <option value="other">Other</option>
          </select>
        </div>
        <TextInput
          label="Proficiency (%)"
          name="proficiency"
          type="number"
          register={register}
          errors={errors}
        />
        <TextArea label="Description" name="description" register={register} errors={errors} />
      </Modal>
    </ProtectedRoute>
  );
}
