import React, { useState } from 'react';
import { Clock, User, GraduationCap } from 'lucide-react';

interface BorrowFormProps {
  onSubmit: (borrowInfo: {
    studentName: string;
    class: string;
    borrowDate: string;
    borrowTime: string;
  }) => void;
  onCancel: () => void;
}

export function BorrowForm({ onSubmit, onCancel }: BorrowFormProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    class: '',
    borrowDate: new Date().toISOString().split('T')[0],
    borrowTime: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Pinjam Buku</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nama Kamu
              </div>
            </label>
            <input
              type="text"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Kelas
              </div>
            </label>
            <input
              type="text"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Tanggal
                </div>
              </label>
              <input
                type="date"
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.borrowDate}
                onChange={(e) => setFormData({ ...formData, borrowDate: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Waktu
                </div>
              </label>
              <input
                type="time"
                required
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.borrowTime}
                onChange={(e) => setFormData({ ...formData, borrowTime: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Pinjam Buku
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}