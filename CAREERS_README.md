# UPSS Employment Application System

A complete job application and recruitment management system for the UPSS school website.

## 🎯 Overview

The Employment Application System provides a comprehensive platform for managing job postings, applications, applicant accounts, and recruitment workflows at UPSS. It includes public-facing career pages, an applicant portal, and admin/HR management tools.

## ✨ Features

### Public Features
- **Careers Homepage**: Hero section, benefits showcase, featured jobs, job categories
- **Job Listings**: Browse and search jobs with filtering by category, type, and keywords
- **Job Details**: Full job descriptions with apply button
- **Applicant Registration/Login**: Create accounts and authenticate

### Applicant Portal (Protected)
- **Dashboard**: Overview of applications, stats, and job recommendations
- **My Applications**: List view of all submitted applications with status tracking
- **Application Detail**: Full application view with **Visual Status Tracker**
- **Profile Management**: Edit personal information and upload resume (TODO)
- **Saved Jobs**: Bookmark jobs for later (TODO)
- **Job Alerts**: Set up email notifications for new jobs (TODO)

### Admin/HR Features (Protected)
- **Job Management**: Create, edit, and manage job listings
- **Application Review**: View and manage all applications
- **Status Management**: Update application status and schedule interviews
- **Category Management**: Organize jobs by department/category

## 🗄️ Database Schema

### Tables
1. **job_categories** - Job categories/departments (17 categories)
2. **job_listings** - Job postings with full details
3. **job_applicants** - Applicant accounts and profiles
4. **job_applications** - Application submissions with status tracking
5. **application_status_history** - Audit trail for status changes
6. **saved_jobs** - Bookmarked jobs by applicants
7. **job_alerts** - Email notification preferences

## 📍 Routes

### Public Routes
- `/careers` - Careers homepage
- `/careers/jobs` - Job listings with search/filters
- `/careers/jobs/:slug` - Job detail page
- `/careers/jobs/:slug/apply` - Application form
- `/careers/register` - Applicant registration
- `/careers/login` - Applicant login

### Applicant Portal (Protected)
- `/careers/dashboard` - Applicant dashboard
- `/careers/my-applications` - Applications list
- `/careers/my-applications/:id` - Application detail with status tracker
- `/careers/profile` - Profile management (TODO)
- `/careers/saved-jobs` - Saved jobs (TODO)
- `/careers/job-alerts` - Job alerts (TODO)

### Admin Routes (Protected)
- `/admin/careers/jobs` - Manage jobs (TODO)
- `/admin/careers/jobs/new` - Create job (TODO)
- `/admin/careers/jobs/:id/edit` - Edit job (TODO)
- `/admin/careers/applications` - View applications (TODO)
- `/admin/careers/applications/:id` - Review application (TODO)

## 🎨 Visual Status Tracker

The system includes a visual timeline component showing application progress:

```
●━━━━━●━━━━━●━━━━━○━━━━━○━━━━━○
✓      ✓      ✓
Submitted  Under    Shortlisted  Interview  Offer    Hired
Jan 15    Review    Jan 22
          Jan 18
```

### Application Statuses
- **Submitted** (Blue) - Application received
- **Under Review** (Yellow) - Being reviewed by HR
- **Shortlisted** (Green) - Selected for interview
- **Interview Scheduled** (Purple) - Interview date set
- **Interview Completed** (Indigo) - Interview done
- **Offer Extended** (Teal) - Job offer sent
- **Offer Accepted** (Green) - Offer accepted
- **Hired** (Green) - Successfully hired
- **Rejected** (Red) - Application declined
- **Withdrawn** (Gray) - Withdrawn by applicant

## 🎨 Design System

### Colors
- **Primary**: Navy Blue (#1e3a5f)
- **Accent**: Gold (#c9a227)
- **Status Colors**: Blue, Yellow, Green, Purple, Teal, Red, Gray

### Styling
- Tailwind CSS with custom theme
- Fully responsive design
- Professional appearance for educational institution
- Consistent with UPSS branding

## 📦 Components

### Shared Components
- `CareersLayout.tsx` - Main layout wrapper
- `CareersNav.tsx` - Navigation with auth state
- `JobCard.tsx` - Job listing card component
- `StatusTracker.tsx` - Visual application status timeline
- `StatusBadge.tsx` - Status badge component

### Page Components
- `CareersHome.tsx` - Homepage
- `JobsListing.tsx` - Jobs list with filters
- `JobDetail.tsx` - Job detail view
- `ApplyForJob.tsx` - Application form
- `ApplicantLogin.tsx` - Login page
- `ApplicantRegister.tsx` - Registration page
- `ApplicantDashboard.tsx` - Dashboard
- `MyApplications.tsx` - Applications list
- `ApplicationDetail.tsx` - Application detail with tracker

## 🔧 Setup & Installation

### 1. Database Setup

Run the careers schema migration:
```sql
-- Run server/db/careers_schema.sql
```

### 2. Seed Data

Seed job categories and sample jobs:
```bash
npm run seed:careers
# or manually run: ts-node server/scripts/seedCareers.ts
```

This will create:
- 17 job categories (Teaching, Administration, IT, etc.)
- 3 sample job listings (Math Teacher, Physics Teacher, Admin Officer)

### 3. Environment Variables

Ensure your `.env` has the database connection:
```
DATABASE_URL=postgresql://username:password@localhost:5432/upss_db
```

### 4. Build & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔐 Authentication

### Applicant Authentication
- Simple token-based auth (temp-token-{applicantId})
- Token stored in localStorage
- In production, implement proper JWT

### Admin Authentication
- Uses existing admin auth system
- Required for job and application management

## 📊 API Endpoints

### Public APIs
- `GET /api/careers/categories` - Get all job categories
- `GET /api/careers/jobs` - Get job listings (with filters)
- `GET /api/careers/jobs/slug/:slug` - Get job by slug
- `POST /api/careers/register` - Register applicant
- `POST /api/careers/login` - Applicant login

### Applicant APIs (Protected)
- `GET /api/careers/profile` - Get profile
- `PUT /api/careers/profile` - Update profile
- `GET /api/careers/my-applications` - Get my applications
- `GET /api/careers/applications/:id` - Get application
- `GET /api/careers/applications/:id/history` - Get status history
- `POST /api/careers/applications` - Submit application
- `PATCH /api/careers/applications/:id/withdraw` - Withdraw application
- `GET /api/careers/saved-jobs` - Get saved jobs
- `POST /api/careers/saved-jobs` - Save job
- `DELETE /api/careers/saved-jobs/:jobId` - Unsave job

### Admin APIs (Protected)
- `GET /admin/careers/jobs/:id` - Get job
- `POST /admin/careers/jobs` - Create job
- `PUT /admin/careers/jobs/:id` - Update job
- `DELETE /admin/careers/jobs/:id` - Delete job
- `GET /admin/careers/applications` - Get all applications
- `GET /admin/careers/applications/:id` - Get application
- `PATCH /admin/careers/applications/:id/status` - Update status
- `PUT /admin/careers/applications/:id` - Update application

## 🚀 Future Enhancements

### High Priority
- [ ] Complete applicant profile page with resume upload
- [ ] Implement saved jobs functionality
- [ ] Add job alerts system
- [ ] Create admin job management pages
- [ ] Create admin application review pages
- [ ] Add email notifications for status changes
- [ ] Implement proper JWT authentication

### Medium Priority
- [ ] Add file upload for resumes and certificates
- [ ] Implement advanced search with Elasticsearch
- [ ] Add analytics dashboard for HR
- [ ] Create bulk application actions
- [ ] Add interview scheduling calendar
- [ ] Implement offer letter generation

### Low Priority
- [ ] Add video interview integration
- [ ] Create applicant assessment tools
- [ ] Add employee referral system
- [ ] Implement talent pool management
- [ ] Add diversity & inclusion tracking

## 📝 Testing

### Manual Testing Checklist

#### Public Pages
- [ ] Careers homepage loads with featured jobs
- [ ] Job listings show with filters working
- [ ] Job detail page displays correctly
- [ ] Can navigate between pages

#### Authentication
- [ ] Can register new applicant account
- [ ] Can login with credentials
- [ ] Token persists in localStorage
- [ ] Protected routes redirect when not logged in

#### Applicant Portal
- [ ] Dashboard shows stats correctly
- [ ] Can view applications list
- [ ] Application detail shows status tracker
- [ ] Status tracker displays correctly for different statuses
- [ ] Can submit new application
- [ ] Can withdraw application

#### Admin Functions
- [ ] Can create new jobs (via API)
- [ ] Can update job listings (via API)
- [ ] Can view applications (via API)
- [ ] Can update application status (via API)

## 🤝 Contributing

When adding new features:
1. Follow existing code patterns
2. Use TypeScript types consistently
3. Maintain responsive design
4. Test all authentication flows
5. Update this README

## 📄 License

MIT License - Same as parent project

---

Built with ❤️ for University Preparatory Secondary School
