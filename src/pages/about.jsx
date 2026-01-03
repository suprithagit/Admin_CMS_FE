'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import TextInput from '@/components/TextInput';
import TextArea from '@/components/TextArea';
import { aboutAPI } from '@/lib/api';
import { toast } from 'react-toastify';

export default function AboutPage() {
  const [about, setAbout] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await aboutAPI.get();
      // Only set data if response exists
      if (response.data) {
        setAbout(response.data);
        
        // ✅ MAP DATABASE (snake_case) TO FORM (camelCase)
        // This ensures the form pre-fills correctly
        reset({
          title: response.data.title,
          description: response.data.description,
          image: response.data.image,
          resume: response.data.resume,
          yearsExperience: response.data.years_experience, // Map years_experience -> yearsExperience
          featured: response.data.featured
        });
      }
    } catch (error) {
      // It's okay if no about info exists yet
      console.log("No about info found, ready to create.");
    }
  };

  const onSubmit = async (data) => {
    try {
      // ✅ PREPARE DATA FOR DB (Convert back to snake_case)
      const formattedData = {
        title: data.title,
        description: data.description,
        image: data.image,
        resume: data.resume,
        
        // ✅ SAVE AS TEXT (No parseInt)
        years_experience: data.yearsExperience, 
        
        featured: data.featured || false
      };

      if (about?.id) {
        await aboutAPI.update(about.id, formattedData);
        toast.success('About updated');
      } else {
        await aboutAPI.create(formattedData);
        toast.success('About created');
      }
      fetchAbout();
    } catch (error) {
      console.error(error);
      toast.error('Error saving about');
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            <h1 className="text-3xl font-bold mb-8">About</h1>

            <div className="bg-white rounded shadow p-8 max-w-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <TextInput
                  label="Title"
                  name="title"
                  register={register}
                  errors={errors}
                  placeholder="Your title (e.g. Full Stack Developer)"
                />
                <TextArea
                  label="Description"
                  name="description"
                  register={register}
                  errors={errors}
                  rows={6}
                />
                <TextInput
                  label="Image URL"
                  name="image"
                  register={register}
                  errors={errors}
                  placeholder="https://..."
                />
                <TextInput
                  label="Resume URL"
                  name="resume"
                  register={register}
                  errors={errors}
                  placeholder="https://..."
                />
                
                {/* ✅ UPDATED INPUT: Removed type="number" */}
                <TextInput
                  label="Years of Experience"
                  name="yearsExperience"
                  // type="number"  <-- REMOVED THIS so it accepts text
                  register={register}
                  errors={errors}
                  placeholder="e.g. 5+ Years" 
                />
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
                >
                  Save About
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}