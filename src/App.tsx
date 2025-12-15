
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import MainLayout from './components/MainLayout';
import AdminLayout from './components/AdminLayout';
import HomePage from './pages/public/HomePage';
import NewsIndex from './pages/public/NewsIndex';
import NewsDetail from './pages/public/NewsDetail';
import GenericPage from './pages/public/GenericPage';
import { LoginPage } from './pages/admin/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import AdminPagesList from './pages/admin/AdminPagesList';
import AdminPageForm from './pages/admin/AdminPageForm';
import AdminSectionsManager from './pages/admin/AdminSectionsManager';
import AdminNewsList from './pages/admin/AdminNewsList';
import AdminNewsForm from './pages/admin/AdminNewsForm';
import MediaLibrary from './pages/admin/MediaLibrary';
import Settings from './pages/admin/Settings';
import Users from './pages/admin/Users';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes using MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            
            {/* Specific Features */}
            <Route path="news" element={<NewsIndex />} />
            <Route path="news/:slug" element={<NewsDetail />} />
            
            {/* Dynamic Catch-all for CMS Pages (About, Academics, Contact, etc.) */}
            <Route path=":slug" element={<GenericPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            
            {/* Page Builder */}
            <Route path="pages" element={<AdminPagesList />} />
            <Route path="pages/new" element={<AdminPageForm />} />
            <Route path="pages/:id" element={<AdminPageForm />} />
            <Route path="pages/:pageId/sections" element={<AdminSectionsManager />} />
            
            {/* News Admin */}
            <Route path="news" element={<AdminNewsList />} />
            <Route path="news/new" element={<AdminNewsForm />} />
            <Route path="news/:id" element={<AdminNewsForm />} />

            {/* Other Admin Features */}
            <Route path="media" element={<MediaLibrary />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<Users />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
