import React, { useState } from 'react';
import { Book } from '../types/book';
import { BookOpen, Search } from 'lucide-react';
import { BorrowForm } from './BorrowForm';

interface UserViewProps {
  books: Book[];
  onBorrowBook: (id: string, borrowInfo: {
    studentName: string;
    class: string;
    borrowDate: string;
    borrowTime: string;
  }) => boolean;
}

export function UserView({ books, onBorrowBook }: UserViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBorrow = (borrowInfo: {
    studentName: string;
    class: string;
    borrowDate: string;
    borrowTime: string;
  }) => {
    if (selectedBookId) {
      onBorrowBook(selectedBookId, borrowInfo);
      setSelectedBookId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          placeholder="Cari judul, penulis, atau genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
          <p className="text-sm sm:text-base">Oops! Buku yang kamu cari tidak ada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">{book.title}</h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">
                    {(book.borrowHistory || []).length} Dipinjam
                  </span>
                </div>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <p className="text-xs sm:text-sm text-gray-500">Genre: {book.genre}</p>
                <p className="text-xs sm:text-sm text-gray-500">Penerbit: {book.publishedYear}</p>
                
                <button
                  onClick={() => setSelectedBookId(book.id)}
                  className="mt-3 w-full inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Pinjam Buku
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBookId && (
        <BorrowForm
          onSubmit={handleBorrow}
          onCancel={() => setSelectedBookId(null)}
        />
      )}
    </div>
  );
}