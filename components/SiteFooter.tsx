import React from 'react';
import { Link } from 'react-router-dom';

const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white border-t-4 border-maroon-800">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-maroon-800 flex items-center justify-center rounded-sm">
                <span className="font-serif font-bold text-xl">U</span>
              </div>
              <div className="leading-tight">
                <h3 className="font-serif text-lg tracking-wide">UPSS</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Benin City</p>
              </div>
            </div>
            <address className="not-italic text-gray-400 text-sm leading-relaxed mb-6">
              123 Education Drive<br />
              GRA, Benin City<br />
              Edo State, Nigeria
            </address>
            <div className="text-sm text-gray-400">
              <p>Phone: +234 800 123 4567</p>
              <p>Email: info@upss.edu.ng</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">Our History</Link></li>
              <li><Link to="/academics" className="hover:text-white transition-colors">Academic Calendar</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Tuition & Fees</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">Latest News</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Student Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Parent Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Alumni Network</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Library</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Employment</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-6">Connect</h4>
            <p className="text-sm text-gray-400 mb-6">
              Stay updated with the latest news and events from UPSS.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-maroon-800 transition-colors text-xs text-white">FB</a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-maroon-800 transition-colors text-xs text-white">IG</a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-maroon-800 transition-colors text-xs text-white">LN</a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-maroon-800 transition-colors text-xs text-white">YT</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} University Preparatory Secondary School. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;