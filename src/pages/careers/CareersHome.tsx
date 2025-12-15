import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { careersApi } from '../../api/careersClient';
import { JobListing, JobCategory } from '../../types/careers';
import JobCard from '../../components/careers/JobCard';

const CareersHome: React.FC = () => {
  const [featuredJobs, setFeaturedJobs] = useState<JobListing[]>([]);
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobs, cats] = await Promise.all([
          careersApi.getJobs({ status: 'open', featured: true }),
          careersApi.getCategories()
        ]);
        setFeaturedJobs(jobs.slice(0, 3));
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join the UPSS Team
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Where Future Scholars Rise — And So Do Great Educators
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-blue-50">
              Be part of a dynamic, high-achieving team dedicated to building confident scholars 
              and global leaders. Discover rewarding career opportunities at Nigeria's leading 
              secondary school.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                to="/careers/jobs"
                className="px-8 py-3 bg-yellow-500 text-blue-900 rounded-md font-semibold hover:bg-yellow-400 transition-colors"
              >
                Browse Open Positions
              </Link>
              <Link 
                to="/careers/register"
                className="px-8 py-3 bg-white text-blue-900 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Why Work at UPSS */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Work at UPSS?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Excellence & Impact
            </h3>
            <p className="text-gray-600">
              Join a culture of academic excellence, rigorous standards, and measurable student success. 
              Your work directly shapes Nigeria's future leaders.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-5xl mb-4">💼</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Professional Growth
            </h3>
            <p className="text-gray-600">
              Access continuous training, mentorship programs, and career advancement opportunities 
              in a supportive, collaborative environment.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-5xl mb-4">⚖️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Competitive Benefits
            </h3>
            <p className="text-gray-600">
              Enjoy competitive salaries, health insurance, performance bonuses, and a fulfilling 
              work-life balance in a well-structured institution.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Jobs */}
      {!loading && featuredJobs.length > 0 && (
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Opportunities
              </h2>
              <Link 
                to="/careers/jobs"
                className="text-blue-900 font-medium hover:text-blue-700 transition-colors"
              >
                View All Jobs →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Job Categories */}
      {!loading && categories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explore Career Categories
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/careers/jobs?category=${category.id}`}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all text-center"
              >
                <div className="text-4xl mb-3">{category.icon || '📂'}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                {category.description && (
                  <p className="text-sm text-gray-600">{category.description}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join UPSS and be part of a movement transforming Nigerian education.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/careers/jobs"
              className="px-8 py-3 bg-yellow-500 text-blue-900 rounded-md font-semibold hover:bg-yellow-400 transition-colors"
            >
              View Open Positions
            </Link>
            <Link 
              to="/careers/register"
              className="px-8 py-3 bg-white text-blue-900 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Create Applicant Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersHome;
