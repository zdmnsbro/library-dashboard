import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface BookFormProps {
  onSubmit: (book: {
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    genre: string;
  }) => void;
}

export function BookForm({ onSubmit }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedYear: new Date().getFullYear(),
    genre: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      author: '',
      isbn: '',
      publishedYear: new Date().getFullYear(),
      genre: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Tambah Buku Baru</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Penulis</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">ISBN</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Tahun Terbit</label>
          <input
            type="number"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.publishedYear}
            onChange={(e) => setFormData({ ...formData, publishedYear: parseInt(e.target.value) })}
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Genre</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Tambah Buku
      </button>
    </form>
  );
}