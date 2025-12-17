
import { Router } from 'express';
import { PageController } from '../controllers/PageController.js';
import { SectionController } from '../controllers/SectionController.js';
import { AuthController } from '../controllers/AuthController.js';
import { NewsController } from '../controllers/NewsController.js';
import { JobController } from '../controllers/JobController.js';
import { ApplicationController } from '../controllers/ApplicationController.js';
import { ApplicantController } from '../controllers/ApplicantController.js';
import { requireAdmin, requireApplicant } from '../middleware/auth.js';

const router = Router();

// --- Auth Routes ---
router.post('/admin/login', AuthController.login);

// --- Public Routes ---
// Pages
router.get('/pages', PageController.getAll);
router.get('/pages/slug/:slug', PageController.getBySlug);
router.get('/pages/:pageId/sections', SectionController.getByPageId);
// News
router.get('/news', NewsController.getAll);
router.get('/news/slug/:slug', NewsController.getBySlug);

// --- Careers Public Routes ---
// Job Categories
router.get('/careers/categories', JobController.getAllCategories);
// Job Listings
router.get('/careers/jobs', JobController.getAllJobs);
router.get('/careers/jobs/slug/:slug', JobController.getJobBySlug);

// Applicant Auth
// SECURITY NOTE: In production, add rate limiting to prevent brute force attacks
router.post('/careers/register', ApplicantController.register);
router.post('/careers/login', ApplicantController.login);

// --- Applicant Portal Routes (Protected) ---
router.get('/careers/profile', requireApplicant, ApplicantController.getProfile);
router.put('/careers/profile', requireApplicant, ApplicantController.updateProfile);

// My Applications
router.get('/careers/my-applications', requireApplicant, ApplicationController.getMyApplications);
router.get('/careers/applications/:id', requireApplicant, ApplicationController.getApplicationById);
router.get('/careers/applications/:id/history', requireApplicant, ApplicationController.getApplicationHistory);
router.post('/careers/applications', requireApplicant, ApplicationController.submitApplication);
router.patch('/careers/applications/:id/withdraw', requireApplicant, ApplicationController.withdrawApplication);

// Saved Jobs
router.get('/careers/saved-jobs', requireApplicant, ApplicantController.getSavedJobs);
router.post('/careers/saved-jobs', requireApplicant, ApplicantController.saveJob);
router.delete('/careers/saved-jobs/:jobId', requireApplicant, ApplicantController.unsaveJob);

// Job Alerts
router.get('/careers/job-alerts', requireApplicant, ApplicantController.getJobAlerts);
router.post('/careers/job-alerts', requireApplicant, ApplicantController.createJobAlert);
router.put('/careers/job-alerts/:id', requireApplicant, ApplicantController.updateJobAlert);
router.delete('/careers/job-alerts/:id', requireApplicant, ApplicantController.deleteJobAlert);

// --- Admin Routes (Protected) ---

// Page Management
router.get('/pages/:id', requireAdmin, PageController.getById);
router.post('/pages', requireAdmin, PageController.create);
router.put('/pages/:id', requireAdmin, PageController.update);
router.delete('/pages/:id', requireAdmin, PageController.delete);

// Section Management
router.post('/pages/:pageId/sections', requireAdmin, SectionController.create);
router.put('/sections/:id', requireAdmin, SectionController.update);
router.delete('/sections/:id', requireAdmin, SectionController.delete);
router.patch('/sections/reorder', requireAdmin, SectionController.reorder);

// News Management
router.get('/news/:id', requireAdmin, NewsController.getById); // Admin might need exact ID fetch
router.post('/news', requireAdmin, NewsController.create);
router.put('/news/:id', requireAdmin, NewsController.update);
router.delete('/news/:id', requireAdmin, NewsController.delete);

// Careers Admin - Jobs
router.get('/admin/careers/jobs/:id', requireAdmin, JobController.getJobById);
router.post('/admin/careers/jobs', requireAdmin, JobController.createJob);
router.put('/admin/careers/jobs/:id', requireAdmin, JobController.updateJob);
router.delete('/admin/careers/jobs/:id', requireAdmin, JobController.deleteJob);

// Careers Admin - Categories
router.post('/admin/careers/categories', requireAdmin, JobController.createCategory);
router.put('/admin/careers/categories/:id', requireAdmin, JobController.updateCategory);
router.delete('/admin/careers/categories/:id', requireAdmin, JobController.deleteCategory);

// Careers Admin - Applications
router.get('/admin/careers/applications', requireAdmin, ApplicationController.getAllApplications);
router.get('/admin/careers/applications/:id', requireAdmin, ApplicationController.getApplicationById);
router.patch('/admin/careers/applications/:id/status', requireAdmin, ApplicationController.updateApplicationStatus);
router.put('/admin/careers/applications/:id', requireAdmin, ApplicationController.updateApplication);
router.delete('/admin/careers/applications/:id', requireAdmin, ApplicationController.deleteApplication);

export default router;
