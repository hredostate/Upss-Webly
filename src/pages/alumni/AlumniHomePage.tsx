import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { alumniApi } from '../../api/alumniApi';
import { AlumniProfile, AlumniEvent } from '../../types/alumni';

export default function AlumniHomePage() {
  const [stats, setStats] = useState({
    total_alumni: 2000,
    countries_represented: 15,
    companies_represented: 50,
    total_scholarships: 10000000,
  });
  const [featuredAlumni, setFeaturedAlumni] = useState<AlumniProfile[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<AlumniEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, alumniData, eventsData] = await Promise.all([
          alumniApi.getAlumniStats(),
          alumniApi.getFeaturedAlumni(6),
          alumniApi.getEvents(true),
        ]);

        if (statsData) setStats(statsData);
        if (alumniData.data) setFeaturedAlumni(alumniData.data);
        if (eventsData.data) setUpcomingEvents(eventsData.data.slice(0, 3));
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
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome Back, UPSS Alumni!
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Join a thriving community of UPSS graduates making an impact worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/alumni/register"
                className="px-8 py-3 bg-yellow-500 text-blue-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Join the Alumni Network
              </Link>
              <Link
                to="/alumni/directory"
                className="px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Directory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">
                {stats.total_alumni.toLocaleString()}+
              </div>
              <div className="text-gray-600">Alumni Network</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">
                {stats.countries_represented}+
              </div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">
                {stats.companies_represented}+
              </div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">
                ₦{(stats.total_scholarships / 1000000).toFixed(1)}M+
              </div>
              <div className="text-gray-600">Scholarships Given</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Alumni */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Alumni
            </h2>
            <p className="text-lg text-gray-600">
              Meet some of our distinguished graduates making waves in their fields
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredAlumni.map((alumni) => (
                <Link
                  key={alumni.id}
                  to={`/alumni/profile/${alumni.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center"
                >
                  {alumni.recent_photo_url ? (
                    <img
                      src={alumni.recent_photo_url}
                      alt={`${alumni.first_name} ${alumni.last_name}`}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {alumni.first_name[0]}{alumni.last_name[0]}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {alumni.first_name} {alumni.last_name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Class of {alumni.graduation_year}
                  </p>
                  {alumni.job_title && alumni.company && (
                    <p className="text-sm text-gray-500">
                      {alumni.job_title} at {alumni.company}
                    </p>
                  )}
                  {alumni.willing_to_mentor && (
                    <span className="inline-block mt-3 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                      Mentor
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/alumni/directory"
              className="inline-block px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              View Full Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600">
              Don't miss out on these exciting alumni gatherings
            </p>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  to={`/alumni/events/${event.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  {event.image_url ? (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                      <span className="text-white text-4xl">📅</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {new Date(event.event_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {event.location || 'Virtual Event'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No upcoming events at this time.</p>
          )}

          <div className="text-center mt-12">
            <Link
              to="/alumni/events"
              className="inline-block px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Reconnect?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of UPSS alumni around the world. Network, mentor, and give back to our community.
          </p>
          <Link
            to="/alumni/register"
            className="inline-block px-8 py-3 bg-yellow-500 text-blue-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            Join the Network Today
          </Link>
        </div>
      </section>
    </div>
  );
}
