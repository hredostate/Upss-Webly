import React from 'react';
import { Link } from 'react-router-dom';

const CORE_VALUES = [
  {
    title: 'Academic Excellence',
    description: 'We push the boundaries of traditional learning, encouraging students to question assumptions and engage deeply with complex ideas across all disciplines. Our curriculum is designed to foster intellectual curiosity and rigor.',
    link: '/academics'
  },
  {
    title: 'Character & Leadership',
    description: 'Beyond grades, we cultivate integrity, resilience, and empathy. Our students are groomed to become ethical leaders who serve their communities with distinction and moral clarity.',
    link: '/student-life'
  },
  {
    title: 'Global Readiness',
    description: 'In an interconnected world, UPSS students are equipped with the technological skills, cultural fluency, and critical perspectives needed to compete and collaborate on a global stage.',
    link: '/about'
  }
];

const STATS = [
  { label: 'University Admission', value: '95%' },
  { label: 'Student Societies', value: '20+' },
  { label: 'Intl. Medals', value: '10+' },
  { label: 'Years of Heritage', value: '25' }
];

const NEWS_ITEMS = [
  {
    id: 1,
    title: 'UPSS Robotics Team Wins National Championship',
    date: 'October 12, 2023',
    category: 'Achievement',
    summary: 'Our senior robotics team took home the gold medal in Lagos this weekend, qualifying for the international finals in Tokyo.'
  },
  {
    id: 2,
    title: 'Annual "Knowledge for Service" Symposium',
    date: 'November 05, 2023',
    category: 'Events',
    summary: 'Join us for a day of lectures and workshops featuring distinguished alumni and industry leaders discussing the future of education in Nigeria.'
  },
  {
    id: 3,
    title: 'Admissions for 2024/2025 Session Now Open',
    date: 'September 15, 2023',
    category: 'Admissions',
    summary: 'Prospective parents are invited to apply. Entrance examinations are scheduled to begin in January.'
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full font-sans text-gray-900">
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Students walking on UPSS campus" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-900/40 to-black/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] mb-8 drop-shadow-xl tracking-tight">
            Where Nigerian Scholars<br />Prepare for a Global Future.
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 font-light max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-md">
            UPSS is Benin City’s premier institution for rigorous academic inquiry and character development, nurturing the next generation of innovative leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/admissions" 
              className="inline-block bg-maroon-700 hover:bg-maroon-600 text-white text-sm font-bold uppercase tracking-[0.15em] px-10 py-5 shadow-lg transition-transform transform hover:-translate-y-1"
            >
              Apply to UPSS
            </Link>
            <Link 
              to="/contact" 
              className="inline-block bg-transparent border border-white hover:bg-white hover:text-maroon-900 text-white text-sm font-bold uppercase tracking-[0.15em] px-10 py-5 transition-colors"
            >
              Visit Our Campus
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Value Pillars */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
            {CORE_VALUES.map((pillar, idx) => (
              <div key={idx} className="flex flex-col group">
                <div className="w-16 h-1 bg-maroon-800 mb-8 group-hover:w-24 transition-all duration-500 ease-out"></div>
                <h3 className="font-serif text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-8 flex-grow text-lg font-light">
                  {pillar.description}
                </p>
                <Link 
                  to={pillar.link} 
                  className="text-maroon-800 font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all"
                >
                  Learn More 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. UPSS at a Glance (Stats) */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">UPSS at a Glance</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
            {STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4">
                <div className="font-serif text-6xl md:text-7xl font-bold text-maroon-900 mb-4 leading-none">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] max-w-[140px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Academics & Student Life Panels */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Academics Panel */}
        <div className="relative h-[600px] group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
            alt="Library Study" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-maroon-900/80 group-hover:bg-maroon-900/90 transition-colors duration-500 flex flex-col justify-center items-center text-center p-12 px-6">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Academics</h2>
            <p className="text-gray-100 max-w-lg mb-10 leading-relaxed text-lg font-light">
              Our curriculum challenges students to think critically and express themselves clearly. From STEM to the Arts, we strive for mastery in every subject.
            </p>
            <Link 
              to="/academics" 
              className="border border-white text-white hover:bg-white hover:text-maroon-900 px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-colors"
            >
              Explore Academics
            </Link>
          </div>
        </div>

        {/* Student Life Panel */}
        <div className="relative h-[600px] group overflow-hidden">
           <img 
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1532&q=80" 
            alt="Student Activities" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gray-900/80 group-hover:bg-gray-900/90 transition-colors duration-500 flex flex-col justify-center items-center text-center p-12 px-6">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Student Life</h2>
            <p className="text-gray-100 max-w-lg mb-10 leading-relaxed text-lg font-light">
              Education happens both inside and outside the classroom. Discover our clubs, sports teams, and community service initiatives that build character.
            </p>
            <Link 
              to="/student-life" 
              className="border border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-colors"
            >
              Life at UPSS
            </Link>
          </div>
        </div>
      </section>

      {/* 5. News & Events Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-8">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl text-gray-900 mb-4">News & Events</h2>
              <p className="text-gray-500 text-lg">The latest stories, achievements, and upcoming gatherings from our vibrant community.</p>
            </div>
            <Link to="/news" className="hidden md:block text-maroon-800 font-bold uppercase tracking-wider text-sm hover:underline mt-6 md:mt-0">
              View All News &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {NEWS_ITEMS.map((item) => (
              <div key={item.id} className="group flex flex-col h-full">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                  <span className="text-gold-600">{item.category}</span>
                  <span className="text-gray-300">•</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="font-serif text-2xl text-gray-900 mb-4 leading-tight group-hover:text-maroon-800 transition-colors">
                  <Link to={`/news/${item.id}`}>{item.title}</Link>
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                  {item.summary}
                </p>
                <Link to={`/news/${item.id}`} className="inline-block text-maroon-800 text-xs font-bold uppercase tracking-wider border-b-2 border-transparent hover:border-maroon-800 transition-all self-start pb-1">
                  Read Story
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 md:hidden text-center">
            <Link to="/news" className="inline-block bg-gray-100 text-gray-800 px-6 py-3 font-bold uppercase tracking-wider text-sm hover:bg-gray-200">
              View All News
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;