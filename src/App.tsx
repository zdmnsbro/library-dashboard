import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';
import { AdminLogin } from './components/AdminLogin';
import { UserView } from './components/UserView';
import { Header } from './components/Header';
import { NotFound } from './components/NotFound';
import { useBooks } from './hooks/useBooks';
import { useAuth } from './hooks/useAuth';

function App() {
  const { books, addBook, removeBook, borrowBook, removeBorrowHistory } = useBooks();
  const { authState, login, logout } = useAuth();

  const AdminDashboard = () => (
    <div className="min-h-screen bg-gray-100">
      <Header isAdmin={true} onLogout={logout} />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          <BookForm onSubmit={addBook} />
          <BookList
            books={books}
            onDelete={removeBook}
            onRemoveBorrowHistory={removeBorrowHistory}
          />
        </div>
      </main>
    </div>
  );

  const UserDashboard = () => (
    <div className="min-h-screen bg-gray-100">
      <Header isAdmin={false} />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:px-8">
        <UserView books={books} onBorrowBook={borrowBook} />
      </main>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            authState.isAdmin ? (
              <AdminDashboard />
            ) : (
              <AdminLogin onLogin={login} />
            )
          }
        />
        <Route path="/" element={<UserDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;