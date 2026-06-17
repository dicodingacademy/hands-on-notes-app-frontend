import { Navigate, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import AddNotePage from './pages/AddNotePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';
import NotesPage from './pages/NotesPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

// Halaman yang butuh login — kalau belum login, arahkan ke halaman Masuk.
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <ProtectedRoute>
              <NoteDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddNotePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
