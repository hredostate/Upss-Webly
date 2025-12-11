
import { Router } from 'express';
import { PageController } from '../controllers/PageController';
import { SectionController } from '../controllers/SectionController';
import { AuthController } from '../controllers/AuthController';
import { NewsController } from '../controllers/NewsController';
import { requireAdmin } from '../middleware/auth';

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

export default router;
