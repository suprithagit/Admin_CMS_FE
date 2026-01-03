'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import TextInput from '@/components/TextInput';
import TextArea from '@/components/TextArea';
import Modal from '@/components/Modal';
import { projectsAPI } from '@/lib/api';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      toast.error('Error fetching projects');
    }
  };

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        title: data.title,
        description: data.description,
        image: data.image,
        
        // --- CHANGE 1: Update field mapping ---
        skills: data.skills || "", // Maps frontend 'skills' to DB 'skills'
        
        live_url: data.liveUrl || null,
        github_url: data.githubUrl || null
      };

      if (editingId) {
        await projectsAPI.update(editingId, formattedData);
        toast.success('Project updated');
      } else {
        await projectsAPI.create(formattedData);
        toast.success('Project created');
      }
      setModalOpen(false);
      reset();
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error("Save Error:", error.response?.data || error.message);
      toast.error('Error saving project');
    }
  };

  const handleEdit = (project) => {
    // --- CHANGE 2: Update reset values ---
    reset({
      title: project.title,
      description: project.description,
      image: project.image,
      skills: project.skills, // Read from DB 'skills' column
      liveUrl: project.live_url,
      githubUrl: project.github_url
    });
    setEditingId(project.id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await projectsAPI.delete(id);
        toast.success('Project deleted');
        fetchProjects();
      } catch (error) {
        toast.error('Error deleting project');
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
              <h1 className="text-3xl font-bold">Projects</h1>
              <button
                onClick={() => {
                  reset();
                  setEditingId(null);
                  setModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <FiPlus /> Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4 flex-1">
                    
                    {/* --- CHANGE 3: Display Skills --- */}
                    {project.skills && (
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                        {project.skills}
                      </span>
                    )}

                    <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{project.description}</p>
                    
                    <div className="flex gap-3 mt-auto">
                      <button onClick={() => handleEdit(project)} className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded hover:bg-blue-100 transition">
                        <FiEdit /> Edit
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded hover:bg-red-100 transition">
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        title={editingId ? 'Edit Project' : 'Add Project'}
        onClose={() => {
          setModalOpen(false);
          reset();
          setEditingId(null);
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput 
          label="Title" 
          name="title" 
          register={register} 
          validation={{ required: "Title is required" }} 
          errors={errors} 
        />
        <TextArea 
          label="Description" 
          name="description" 
          register={register} 
          validation={{ required: "Description is required" }} 
          errors={errors} 
        />
        <TextInput 
          label="Image URL" 
          name="image" 
          register={register} 
          validation={{ required: "Image is required" }} 
          errors={errors} 
        />
        
        {/* --- CHANGE 4: Update Input Label and Name --- */}
        <TextInput 
          label="Skills (e.g. React, Node.js)" 
          name="skills" 
          register={register} 
          errors={errors} 
        />
        
        <TextInput 
          label="Live URL (Optional)" 
          name="liveUrl" 
          register={register} 
          errors={errors} 
        />
        <TextInput 
          label="GitHub URL (Optional)" 
          name="githubUrl" 
          register={register} 
          errors={errors} 
        />
      </Modal>
    </ProtectedRoute>
  );
}