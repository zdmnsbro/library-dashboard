import { useState, useEffect } from 'react';
import { Book, BorrowInfo } from '../types/book';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('library-books');
    if (savedBooks) {
      const parsedBooks = JSON.parse(savedBooks);
      return parsedBooks.map((book: Book) => ({
        ...book,
        borrowHistory: book.borrowHistory || []
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('library-books', JSON.stringify(books));
  }, [books]);

  const addBook = (book: Omit<Book, 'id' | 'borrowHistory'>) => {
    const newBook = {
      ...book,
      id: crypto.randomUUID(),
      borrowHistory: [],
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const removeBook = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const borrowBook = (id: string, borrowInfo: BorrowInfo) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id
          ? { ...book, borrowHistory: [...(book.borrowHistory || []), borrowInfo] }
          : book
      )
    );
    return true;
  };

  const removeBorrowHistory = (bookId: string, borrowIndex: number) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId
          ? {
              ...book,
              borrowHistory: book.borrowHistory.filter((_, index) => index !== borrowIndex),
            }
          : book
      )
    );
  };

  return { books, addBook, removeBook, borrowBook, removeBorrowHistory };
}