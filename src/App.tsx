
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlumniAuthProvider } from './context/AlumniAuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ProtectedAlumniRoute } from './components/alumni/ProtectedAlumniRoute';
import MainLayout from './components/MainLayout';
import AdminLayout from './components/AdminLayout';
import { AlumniLayout } from './components/alumni/AlumniLayout';
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
import AlumniHomePage from './pages/alumni/AlumniHomePage';
import AlumniRegisterPage from './pages/alumni/AlumniRegisterPage';
import AlumniLoginPage from './pages/alumni/AlumniLoginPage';
import AlumniDashboardPage from './pages/alumni/AlumniDashboardPage';
import AlumniProfilePage from './pages/alumni/AlumniProfilePage';
import AlumniEditProfilePage from './pages/alumni/AlumniEditProfilePage';
import AlumniDirectoryPage from './pages/alumni/AlumniDirectoryPage';
import AlumniEventsPage from './pages/alumni/AlumniEventsPage';
import AlumniEventDetailPage from './pages/alumni/AlumniEventDetailPage';
import AlumniMessagesPage from './pages/alumni/AlumniMessagesPage';
import AlumniChaptersPage from './pages/alumni/AlumniChaptersPage';
import AlumniClassPage from './pages/alumni/AlumniClassPage';
import AlumniDonatePage from './pages/alumni/AlumniDonatePage';

// Careers components
import CareersLayout from './components/careers/CareersLayout';
import CareersHome from './pages/careers/CareersHome';
import JobsListing from './pages/careers/JobsListing';
import JobDetail from './pages/careers/JobDetail';
import ApplicantLogin from './pages/careers/ApplicantLogin';
import ApplicantRegister from './pages/careers/ApplicantRegister';
import ApplicantDashboard from './pages/careers/ApplicantDashboard';
import MyApplications from './pages/careers/MyApplications';
import ApplicationDetail from './pages/careers/ApplicationDetail';
import ApplyForJob from './pages/careers/ApplyForJob';
import { ScrollRestoration } from './components/navigation/ScrollRestoration';

export default function App() {
  return (
    <AuthProvider>
      <AlumniAuthProvider>
        <Router>
          <ScrollRestoration />
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

            {/* Alumni Routes */}
            <Route path="/alumni" element={<AlumniLayout />}>
              <Route index element={<AlumniHomePage />} />
              <Route path="register" element={<AlumniRegisterPage />} />
              <Route path="login" element={<AlumniLoginPage />} />
              <Route path="dashboard" element={
                <ProtectedAlumniRoute>
                  <AlumniDashboardPage />
                </ProtectedAlumniRoute>
              } />
              <Route path="profile/:id" element={<AlumniProfilePage />} />
              <Route path="profile/edit" element={
                <ProtectedAlumniRoute>
                  <AlumniEditProfilePage />
                </ProtectedAlumniRoute>
              } />
              <Route path="directory" element={<AlumniDirectoryPage />} />
              <Route path="events" element={<AlumniEventsPage />} />
              <Route path="events/:id" element={<AlumniEventDetailPage />} />
              <Route path="messages" element={
                <ProtectedAlumniRoute>
                  <AlumniMessagesPage />
                </ProtectedAlumniRoute>
              } />
              <Route path="chapters" element={<AlumniChaptersPage />} />
              <Route path="class/:year" element={<AlumniClassPage />} />
              <Route path="donate" element={<AlumniDonatePage />} />
            </Route>

            {/* Careers/Employment Routes */}
            <Route path="/careers" element={<CareersLayout />}>
              <Route index element={<CareersHome />} />
              <Route path="jobs" element={<JobsListing />} />
              <Route path="jobs/:slug" element={<JobDetail />} />
              <Route path="jobs/:slug/apply" element={<ApplyForJob />} />
              <Route path="login" element={<ApplicantLogin />} />
              <Route path="register" element={<ApplicantRegister />} />
              <Route path="dashboard" element={<ApplicantDashboard />} />
              <Route path="my-applications" element={<MyApplications />} />
              <Route path="my-applications/:id" element={<ApplicationDetail />} />
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
      </AlumniAuthProvider>
    </AuthProvider>
  );
}
