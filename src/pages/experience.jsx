'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import TextInput from '@/components/TextInput';
import TextArea from '@/components/TextArea';
import Modal from '@/components/Modal';
import { experienceAPI } from '@/lib/api';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  
  // Watch the checkbox to disable End Year if currently working
  const currentlyWorking = watch("currentlyWorking");

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const response = await experienceAPI.getAll();
      setExperiences(response.data);
    } catch (error) {
      toast.error('Error fetching experience');
    }
  };

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        company: data.company,
        position: data.position,
        description: data.description,
        
        // --- CHANGED: Map to new year columns ---
        start_year: data.startYear, 
        end_year: data.currentlyWorking ? null : data.endYear,
        currently_working: !!data.currentlyWorking,
      };

      if (editingId) {
        await experienceAPI.update(editingId, formattedData);
        toast.success('Experience updated');
      } else {
        await experienceAPI.create(formattedData);
        toast.success('Experience created');
      }
      setModalOpen(false);
      reset();
      setEditingId(null);
      fetchExperience();
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Error saving experience');
    }
  };

  const handleEdit = (exp) => {
    reset({
      company: exp.company,
      position: exp.position,
      description: exp.description,
      
      // --- CHANGED: Load from new year columns ---
      startYear: exp.start_year,
      endYear: exp.end_year,
      currentlyWorking: exp.currently_working
    });
    setEditingId(exp.id || exp._id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await experienceAPI.delete(id);
        toast.success('Experience deleted');
        fetchExperience();
      } catch (error) {
        toast.error('Error deleting experience');
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
              <h1 className="text-3xl font-bold">Experience</h1>
              <button
                onClick={() => {
                  reset();
                  setEditingId(null);
                  setModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <FiPlus /> Add Experience
              </button>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Company</th>
                    <th className="px-6 py-3 text-left font-semibold">Position</th>
                    {/* --- CHANGED: Updated Table Headers --- */}
                    <th className="px-6 py-3 text-left font-semibold">Duration</th>
                    <th className="px-6 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {experiences.map((exp) => (
                    <tr key={exp.id || exp._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{exp.company}</td>
                      <td className="px-6 py-4">{exp.position}</td>
                      
                      {/* --- CHANGED: Display Start - End Year --- */}
                      <td className="px-6 py-4">
                        {exp.start_year} - {exp.currently_working ? 'Present' : exp.end_year}
                      </td>

                      <td className="px-6 py-4 flex gap-2">
                        <button onClick={() => handleEdit(exp)} className="text-blue-600 hover:text-blue-800"><FiEdit /></button>
                        <button onClick={() => handleDelete(exp.id || exp._id)} className="text-red-600 hover:text-red-800"><FiTrash2 /></button>
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
        title={editingId ? 'Edit Experience' : 'Add Experience'}
        onClose={() => { setModalOpen(false); reset(); setEditingId(null); }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput 
          label="Company" 
          name="company" 
          register={register} 
          validation={{ required: "Company is required" }}
          errors={errors} 
        />
        <TextInput 
          label="Position" 
          name="position" 
          register={register} 
          validation={{ required: "Position is required" }}
          errors={errors} 
        />
        <TextArea 
          label="Description" 
          name="description" 
          register={register} 
          errors={errors} 
        />

        {/* --- CHANGED: Text Inputs for Years --- */}
        <div className="grid grid-cols-2 gap-4">
          <TextInput 
            label="Start Year" 
            name="startYear" 
            register={register} 
            validation={{ required: "Start Year is required" }}
            errors={errors} 
          />
          
          {/* Conditionally disable End Year if 'Currently Working' is checked */}
          <div className={currentlyWorking ? 'opacity-50 pointer-events-none' : ''}>
             <TextInput 
              label="End Year" 
              name="endYear" 
              register={register} 
              errors={errors} 
            />
          </div>
        </div>

        <div className="mb-4 mt-2">
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              {...register('currentlyWorking')} 
              className="mr-2 w-4 h-4 text-blue-600" 
            />
            <span className="text-sm font-semibold text-gray-700">I currently work here</span>
          </label>
        </div>
      </Modal>
    </ProtectedRoute>
  );
}