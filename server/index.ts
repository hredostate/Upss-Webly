
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allow all for dev
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Serve static files from the dist folder (production build)
app.use(express.static(path.join(__dirname, '../dist')));

// Catch-all route: send index.html for any non-API routes
// This must be AFTER all other routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
