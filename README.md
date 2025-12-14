# UPSS Website CMS

A modern, full-featured Content Management System for the University Preparatory Secondary School website. Built with React, TypeScript, and Vite for a fast, responsive, and maintainable web experience.

## 🎯 Overview

This project provides a comprehensive CMS solution for managing the UPSS school website, featuring a dynamic content management system, news publishing platform, admin panel, and media library.

## ✨ Features

- **Content Management System (CMS)**: Dynamic page builder with customizable sections
- **News System**: Publish and manage school news articles with rich content
- **Admin Panel**: Secure administrative interface for content management
- **Media Library**: Upload and manage images and media assets
- **Page Builder**: Create and edit pages with flexible section-based layouts
- **User Management**: Admin user authentication and access control
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Modern Tech Stack**: Built with TypeScript, React 18, and Vite for optimal performance

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Express.js with PostgreSQL
- **Database**: PostgreSQL with custom models
- **Icons & Fonts**: Google Fonts (DM Serif Display, Inter)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (for production deployment)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hredostate/Upss-Webly.git
   cd Upss-Webly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   DATABASE_URL=your_postgresql_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
Upss-Webly/
├── src/
│   ├── api/              # API client modules
│   ├── components/       # Reusable React components
│   ├── pages/
│   │   ├── admin/        # Admin panel pages
│   │   └── public/       # Public-facing pages
│   ├── hooks/            # Custom React hooks
│   ├── types.ts          # TypeScript type definitions
│   ├── index.css         # Global styles
│   ├── index.tsx         # Application entry point
│   └── App.tsx           # Main App component with routing
├── server/
│   ├── controllers/      # API controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── index.ts          # Server entry point
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Project dependencies
```

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run server` - Run the backend server
- `npm run seed` - Seed the database with initial data
- `npm start` - Start the production server

## 🔐 Admin Panel Access

To access the admin panel:

1. Navigate to `/admin/login`
2. Enter your admin credentials
3. Manage content at `/admin`

**Admin Features:**
- Dashboard with overview metrics
- Page management and creation
- News article publishing
- Media library management
- Site settings configuration
- User management

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | API key for Gemini AI integration | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes (for production) |

## 🎨 Design System

The project uses a custom design system built on Tailwind CSS with:
- **Primary Color**: Maroon (school brand color)
- **Typography**: DM Serif Display (headings), Inter (body text)
- **Responsive Breakpoints**: Mobile-first approach
- **Components**: Reusable UI components with consistent styling

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please contact the UPSS web development team.

---

Built with ❤️ for University Preparatory Secondary School
