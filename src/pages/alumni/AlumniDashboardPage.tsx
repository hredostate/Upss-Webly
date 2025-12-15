import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAlumniAuth } from '../../context/AlumniAuthContext';
import { alumniApi } from '../../api/alumniApi';
import { AlumniEvent } from '../../types/alumni';

export default function AlumniDashboardPage() {
  const { profile } = useAlumniAuth();
  const [stats, setStats] = useState({
    unread_messages: 0,
    upcoming_events: 0,
    connections: 0,
  });
  const [upcomingEvents, setUpcomingEvents] = useState<AlumniEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile) return;

      try {
        const dashboardStats = await alumniApi.getDashboardStats(profile.id);
        setStats(dashboardStats);

        const myEvents = await alumniApi.getMyEvents(profile.id);
        if (myEvents.data) {
          setUpcomingEvents(myEvents.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [profile]);

  if (!profile) return null;

  const completionPercentage = profile.completion_percentage || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {profile.recent_photo_url ? (
                <img
                  src={profile.recent_photo_url}
                  alt={`${profile.first_name} ${profile.last_name}`}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white text-blue-900 flex items-center justify-center text-2xl font-bold">
                  {profile.first_name[0]}{profile.last_name[0]}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold">
                  Welcome back, {profile.first_name}!
                </h1>
                <p className="text-blue-100">
                  Class of {profile.graduation_year}
                </p>
              </div>
            </div>
            <Link
              to={`/alumni/profile/${profile.id}`}
              className="px-6 py-2 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100"
            >
              View Profile
            </Link>
          </div>
        </div>

        {/* Profile Completion */}
        {completionPercentage < 100 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                  Complete Your Profile
                </h3>
                <p className="text-yellow-700 mb-3">
                  Your profile is {completionPercentage}% complete
                </p>
                <div className="w-full bg-yellow-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
              <Link
                to="/alumni/profile/edit"
                className="ml-6 px-6 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700"
              >
                Complete Now
              </Link>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/alumni/messages"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Messages</p>
                <p className="text-3xl font-bold text-blue-900">
                  {stats.unread_messages}
                </p>
                <p className="text-gray-500 text-sm">Unread</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
            </div>
          </Link>

          <Link
            to="/alumni/events"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Events</p>
                <p className="text-3xl font-bold text-blue-900">
                  {stats.upcoming_events}
                </p>
                <p className="text-gray-500 text-sm">Registered</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </Link>

          <Link
            to="/alumni/directory"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Connections</p>
                <p className="text-3xl font-bold text-blue-900">
                  {stats.connections}
                </p>
                <p className="text-gray-500 text-sm">Alumni</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Your Upcoming Events
              </h2>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex space-x-4">
                      <div className="w-16 h-16 bg-gray-300 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((reg: any) => {
                    const event = reg.event;
                    return (
                      <Link
                        key={event.id}
                        to={`/alumni/events/${event.id}`}
                        className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="w-16 h-16 bg-blue-100 rounded flex items-center justify-center text-2xl">
                          📅
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(event.event_date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                          <p className="text-sm text-gray-500">
                            {event.location || 'Virtual Event'}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>You haven't registered for any events yet.</p>
                  <Link
                    to="/alumni/events"
                    className="inline-block mt-4 text-blue-900 hover:underline"
                  >
                    Browse Events
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/alumni/directory"
                  className="block w-full px-4 py-3 bg-blue-50 text-blue-900 rounded-lg hover:bg-blue-100 transition-colors text-center font-medium"
                >
                  🔍 Find Alumni
                </Link>
                <Link
                  to="/alumni/events"
                  className="block w-full px-4 py-3 bg-green-50 text-green-900 rounded-lg hover:bg-green-100 transition-colors text-center font-medium"
                >
                  📅 Browse Events
                </Link>
                <Link
                  to="/alumni/chapters"
                  className="block w-full px-4 py-3 bg-purple-50 text-purple-900 rounded-lg hover:bg-purple-100 transition-colors text-center font-medium"
                >
                  🌍 Join a Chapter
                </Link>
                <Link
                  to="/alumni/donate"
                  className="block w-full px-4 py-3 bg-yellow-50 text-yellow-900 rounded-lg hover:bg-yellow-100 transition-colors text-center font-medium"
                >
                  ❤️ Make a Donation
                </Link>
              </div>
            </div>

            {/* Give Back Badges */}
            {(profile.willing_to_mentor ||
              profile.available_for_career_talks ||
              profile.can_offer_internships) && (
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Your Contributions
                </h2>
                <div className="space-y-2">
                  {profile.willing_to_mentor && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        🎓
                      </span>
                      <span className="text-gray-700">Active Mentor</span>
                    </div>
                  )}
                  {profile.available_for_career_talks && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        💼
                      </span>
                      <span className="text-gray-700">Career Speaker</span>
                    </div>
                  )}
                  {profile.can_offer_internships && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        🚀
                      </span>
                      <span className="text-gray-700">Offers Internships</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
