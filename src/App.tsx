import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { TokenProvider } from './contexts/TokenContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Rewards from './pages/Rewards';
import ForgotPassword from './pages/ForgotPassword';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  // Add a loading state if necessary in the future

  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { user } = useAuth();

  return (
    <TokenProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/donate"
                element={
                  <PrivateRoute>
                    <Donate />
                  </PrivateRoute>
                }
              />
              <Route
                path="/rewards"
                element={
                  <PrivateRoute>
                    <Rewards />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TokenProvider>
  );
}

export default App;