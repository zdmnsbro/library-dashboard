export interface BorrowInfo {
  studentName: string;
  class: string;
  borrowDate: string;
  borrowTime: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  borrowHistory: BorrowInfo[];
}