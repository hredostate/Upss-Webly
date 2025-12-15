import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { careersApi } from '../../api/careersClient';
import { JobListing, JobCategory } from '../../types/careers';
import JobCard from '../../components/careers/JobCard';

const JobsListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [jobsData, catsData] = await Promise.all([
          careersApi.getJobs({ 
            status: 'open',
            categoryId: selectedCategory || undefined 
          }),
          careersApi.getCategories()
        ]);
        setJobs(jobsData);
        setCategories(catsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === '' || job.employmentType === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Open Positions
          </h1>
          <p className="text-gray-600">
            Explore career opportunities at UPSS and join our team of dedicated educators.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-20">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    if (e.target.value) {
                      setSearchParams({ category: e.target.value });
                    } else {
                      setSearchParams({});
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employment Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedCategory || selectedType) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSelectedType('');
                    setSearchParams({});
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
                <p className="mt-4 text-gray-600">Loading jobs...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or check back later for new opportunities.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSelectedType('');
                    setSearchParams({});
                  }}
                  className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
                >
                  View All Jobs
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing <span className="font-semibold">{filteredJobs.length}</span> job{filteredJobs.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="space-y-6">
                  {filteredJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsListing;
