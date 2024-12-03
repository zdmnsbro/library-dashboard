import React from 'react';
import { Book } from '../types/book';
import { Trash2, BookOpen, User, GraduationCap, Clock, X } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onDelete: (id: string) => void;
  onRemoveBorrowHistory: (bookId: string, borrowIndex: number) => void;
}

export function BookList({ books, onDelete, onRemoveBorrowHistory }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <BookOpen className="w-16 h-16 mx-auto mb-4" />
        <p>Oops! Buku yang kamu cari tidak ada.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
            </div>
            <button
              onClick={() => onDelete(book.id)}
              className="text-red-500 hover:text-red-700"
              title="Delete book"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
            <p className="text-sm text-gray-500">Penerbit: {book.publishedYear}</p>
            <p className="text-sm text-gray-500">Genre: {book.genre}</p>
            
            {(book.borrowHistory || []).length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-900">History Peminjaman:</h4>
                {(book.borrowHistory || []).map((borrow, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md space-y-2 relative group">
                    <button
                      onClick={() => onRemoveBorrowHistory(book.id, index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove borrow history"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{borrow.studentName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4" />
                      <span>{borrow.class}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{borrow.borrowDate} pada {borrow.borrowTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}