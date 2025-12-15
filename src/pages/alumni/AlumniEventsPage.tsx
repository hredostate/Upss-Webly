import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { alumniApi } from '../../api/alumniApi';
import { AlumniEvent } from '../../types/alumni';

export default function AlumniEventsPage() {
  const [events, setEvents] = useState<AlumniEvent[]>([]);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [tab]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data } = await alumniApi.getEvents(tab === 'upcoming');
      if (data) {
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Alumni Events</h1>
          <p className="text-lg text-gray-600">
            Connect with fellow alumni at these exciting gatherings
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b">
          <button
            onClick={() => setTab('upcoming')}
            className={`px-6 py-3 font-medium ${
              tab === 'upcoming'
                ? 'border-b-2 border-blue-900 text-blue-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setTab('past')}
            className={`px-6 py-3 font-medium ${
              tab === 'past'
                ? 'border-b-2 border-blue-900 text-blue-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Past Events
          </button>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-6 space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
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
                    <span className="text-white text-5xl">📅</span>
                  </div>
                )}
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
                    {event.event_type || 'Event'}
                  </span>
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
                  <p className="text-gray-500 text-sm mb-3">
                    {event.location || 'Virtual Event'}
                  </p>
                  {event.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {event.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No {tab} events at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
