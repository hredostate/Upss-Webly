import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white border-t-4 border-maroon-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Logo size="sm" variant="filled" />
              <div className="leading-tight">
                <h3 className="font-serif text-xl tracking-wide text-white">UPSS</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Benin City</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              A premier institution dedicated to rigorous academic inquiry and the cultivation of ethical leadership.
            </p>
            <address className="not-italic text-gray-400 text-sm leading-relaxed">
              123 Education Drive, GRA<br />
              Benin City, Edo State<br />
              Nigeria
            </address>
            <div className="text-sm text-gray-300 font-medium pt-2">
              <p>+234 800 123 4567</p>
              <p>info@upss.edu.ng</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-gold-500/50">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors duration-200">Our History</Link></li>
              <li><Link to="/academics" className="hover:text-white transition-colors duration-200">Academic Calendar</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors duration-200">Tuition & Fees</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors duration-200">Latest News</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-gold-500/50">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="https://schoolguardian360.com/#Dashboard" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">Student Portal</a></li>
              <li><a href="https://schoolguardian360.com/#Dashboard" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">Parent Portal</a></li>
              <li><Link to="/alumni" className="hover:text-white transition-colors duration-200">Alumni Network</Link></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Library Catalog</a></li>
              <li><Link to="/careers" className="hover:text-white transition-colors duration-200">Careers</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
             <h4 className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-gold-500/50">
              Connect
            </h4>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Stay updated with the latest news, achievements, and upcoming events from the UPSS community.
            </p>
            <div className="flex gap-3">
              {['FB', 'IG', 'LN', 'YT'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 bg-gray-800 rounded-sm flex items-center justify-center hover:bg-maroon-800 transition-all duration-300 text-xs text-white font-bold border border-gray-700 hover:border-maroon-700"
                  aria-label={`Visit our ${social} page`}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} University Preparatory Secondary School. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;