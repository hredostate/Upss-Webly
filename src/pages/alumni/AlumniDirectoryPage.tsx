import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { alumniApi } from '../../api/alumniApi';
import { AlumniProfile, DirectoryFilters } from '../../types/alumni';

export default function AlumniDirectoryPage() {
  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<DirectoryFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAlumni();
  }, [filters]);

  const fetchAlumni = async () => {
    setLoading(true);
    try {
      const { data } = await alumniApi.searchProfiles(filters);
      if (data) {
        setAlumni(data);
      }
    } catch (error) {
      console.error('Error fetching alumni:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setFilters({ ...filters, search: searchTerm });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Alumni Directory
          </h1>
          <p className="text-lg text-gray-600">
            Connect with UPSS alumni around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
            >
              Search
            </button>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <select
              value={filters.graduation_year || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  graduation_year: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Years</option>
              {Array.from({ length: 35 }, (_, i) => 2024 - i).map((year) => (
                <option key={year} value={year}>
                  Class of {year}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Location"
              value={filters.location || ''}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Industry"
              value={filters.industry || ''}
              onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />

            <label className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={filters.mentors_only || false}
                onChange={(e) =>
                  setFilters({ ...filters, mentors_only: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Mentors only</span>
            </label>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : alumni.length > 0 ? (
          <>
            <div className="mb-4 text-gray-600">
              Found {alumni.length} alumni
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alumni.map((alumnus) => (
                <Link
                  key={alumnus.id}
                  to={`/alumni/profile/${alumnus.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
                >
                  <div className="text-center">
                    {alumnus.recent_photo_url ? (
                      <img
                        src={alumnus.recent_photo_url}
                        alt={`${alumnus.first_name} ${alumnus.last_name}`}
                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {alumnus.first_name[0]}{alumnus.last_name[0]}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {alumnus.first_name} {alumnus.last_name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Class of {alumnus.graduation_year}
                    </p>
                    {alumnus.job_title && alumnus.company && (
                      <p className="text-sm text-gray-500 mb-3">
                        {alumnus.job_title} at {alumnus.company}
                      </p>
                    )}
                    {alumnus.city && alumnus.country && (
                      <p className="text-sm text-gray-500 mb-3">
                        📍 {alumnus.city}, {alumnus.country}
                      </p>
                    )}
                    <div className="flex flex-wrap justify-center gap-2">
                      {alumnus.willing_to_mentor && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                          Mentor
                        </span>
                      )}
                      {alumnus.available_for_career_talks && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          Speaker
                        </span>
                      )}
                      {alumnus.can_offer_internships && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                          Internships
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No alumni found matching your criteria.
            </p>
            <button
              onClick={() => setFilters({})}
              className="text-blue-900 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
