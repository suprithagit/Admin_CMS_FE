'use client';

export default function TextArea({ label, name, register, errors, placeholder = '', rows = 4 }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        {...register(name, { required: `${label} is required` })}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors[name] && (
        <p className="text-red-600 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
