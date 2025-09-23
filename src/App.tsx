import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import DashboardPage from '@/pages/DashboardPage';
import InternshipPortal from '@/pages/InternshipPortal';
import AuthPage from '@/pages/AuthPage';
import ContactPage from '@/pages/ContactPage';
import { useAuthStore } from '@/store/authStore';
import './lib/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/internships" element={<InternshipPortal />} />
              <Route 
                path="/login" 
                element={isAuthenticated ? <HomePage /> : <AuthPage />} 
              />
              <Route 
                path="/signup" 
                element={isAuthenticated ? <HomePage /> : <AuthPage />} 
              />
              <Route path="/contact" element={<ContactPage />} />
              {/* Add more routes as needed */}
              <Route path="/about" element={<div className="p-8">About Page - Coming Soon</div>} />
              <Route path="/eligibility" element={<div className="p-8">Eligibility Page - Coming Soon</div>} />
              <Route 
                path="/dashboard" 
                element={isAuthenticated ? <DashboardPage /> : <AuthPage />} 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;