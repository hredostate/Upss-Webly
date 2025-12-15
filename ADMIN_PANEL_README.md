# UPSS Website Admin Panel

## Overview

The UPSS Website Admin Panel is a complete content management system (CMS) for managing pages, sections, and news articles for the University Preparatory Secondary School website.

## Features

### Pages Management
- Create, read, update, and delete pages
- Configure page metadata (SEO title, description)
- Set page slug for URL routing
- Mark page as homepage
- Track type classification (general, foundation, science, humanities, business)
- Publish/unpublish pages

### Sections Management
- Add dynamic content sections to pages
- Reorder sections with drag-and-drop or up/down buttons
- Toggle section visibility
- Support for multiple section types:
  - **HERO**: Hero banner with title and subtitle
  - **TEXT_BLOCK**: Rich text content blocks
  - **VALUE_COLUMNS**: Multi-column value propositions
  - **STATS**: Statistics display
  - **CTA_BANNER**: Call-to-action banners
  - **PROCESS_STEPS**: Step-by-step process flows
  - **LIST_BLOCK**: Bulleted/numbered lists
  - **SIGNATURE_BLOCK**: Signature sections with name and title
  - **FEATURE_LIST**: Feature listings
  - **NEWS_LIST**: News article listings

### News Management
- Create and manage news articles
- Set featured articles
- Organize by category
- SEO-optimized slugs

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, React Router DOM
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: PostgreSQL with UUID support
- **Build Tool**: Vite
- **Authentication**: Token-based admin authentication

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hredostate/Upss-Webly.git
cd Upss-Webly
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials and configuration
```

4. Set up the database:
```bash
# Create database
createdb upss_website

# Run schema migration
psql upss_website < server/db/schema.sql
psql upss_website < server/db/news_schema.sql

# (Optional) Seed initial data
npm run seed
```

5. Start development servers:
```bash
# Terminal 1: Start frontend dev server
npm run dev

# Terminal 2: Start backend API server
npm run server
```

6. Access the admin panel:
- Frontend: http://localhost:5173
- Admin Login: http://localhost:5173/#/admin/login
- API: http://localhost:3001/api

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Admin Routes

- `/admin` - Dashboard overview
- `/admin/pages` - List all pages
- `/admin/pages/new` - Create new page
- `/admin/pages/:id` - Edit page settings
- `/admin/pages/:pageId/sections` - Manage page sections
- `/admin/news` - List all news articles
- `/admin/news/new` - Create new article
- `/admin/news/:id` - Edit article
- `/admin/media` - Media library
- `/admin/settings` - Site settings
- `/admin/users` - User management

## API Endpoints

### Pages
- `GET /api/pages` - List all pages
- `GET /api/pages/:id` - Get page by ID (admin)
- `GET /api/pages/slug/:slug` - Get page by slug
- `POST /api/pages` - Create page (admin)
- `PUT /api/pages/:id` - Update page (admin)
- `DELETE /api/pages/:id` - Delete page (admin)

### Sections
- `GET /api/pages/:pageId/sections` - Get sections for page
- `POST /api/pages/:pageId/sections` - Create section (admin)
- `PUT /api/sections/:id` - Update section (admin)
- `DELETE /api/sections/:id` - Delete section (admin)
- `PATCH /api/sections/reorder` - Reorder sections (admin)

### News
- `GET /api/news` - List all news articles
- `GET /api/news/:id` - Get article by ID
- `GET /api/news/slug/:slug` - Get article by slug
- `POST /api/news` - Create article (admin)
- `PUT /api/news/:id` - Update article (admin)
- `DELETE /api/news/:id` - Delete article (admin)

### Authentication
- `POST /api/admin/login` - Admin login

## Database Schema

### Pages Table
```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  seo_title VARCHAR(255),
  seo_description TEXT,
  track_type VARCHAR(50),
  is_home_page BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);
```

### Sections Table
```sql
CREATE TABLE sections (
  id UUID PRIMARY KEY,
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  order_index INTEGER NOT NULL,
  title VARCHAR(255),
  subtitle TEXT,
  content TEXT,
  content_json JSONB,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);
```

## Development

### Project Structure
```
src/
├── api/                 # API client functions
│   ├── adminClient.ts   # Admin API calls
│   └── cmsClient.ts     # Public CMS API calls
├── components/          # React components
│   ├── admin/          # Admin-specific components
│   │   └── SectionForm.tsx
│   └── sections/       # Public section renderers
├── pages/              # Page components
│   ├── admin/         # Admin pages
│   └── public/        # Public pages
├── types/             # TypeScript type definitions
│   └── cms.ts
├── hooks/             # Custom React hooks
├── data/              # Seed data
└── App.tsx            # Main app component

server/
├── controllers/       # Request handlers
├── models/           # Database models
├── routes/           # API routes
├── middleware/       # Express middleware
├── types/            # Server-side types
└── db/              # Database files
    └── schema.sql    # Database schema
```

### Adding a New Section Type

1. Add the type to `src/types/cms.ts` and `src/types.ts`:
```typescript
export type SectionType = 
  | 'HERO'
  | 'YOUR_NEW_TYPE'
  | ...
```

2. Update the database schema CHECK constraint in `server/db/schema.sql`

3. Create a renderer component in `src/components/sections/`

4. Add the renderer to `src/components/SectionRenderer.tsx`

5. Add form fields in `src/components/admin/SectionForm.tsx`

## Security

- Admin routes are protected with token-based authentication
- All admin API endpoints require authentication
- Database queries use parameterized statements to prevent SQL injection
- CORS configured for production deployment

## License

Copyright © 2024 University Preparatory Secondary School

## Support

For questions or issues, contact the development team or open an issue on GitHub.
