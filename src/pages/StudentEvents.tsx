import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEvents, Event } from '@/contexts/EventContext';
import BeachBackground from '@/components/BeachBackground';
import EventCard from '@/components/EventCard';
import { LogOut, User, Search, Filter, Waves } from 'lucide-react';

const StudentEvents: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { events, getEventsByCategory } = useEvents();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Technical', 'Non-Technical', 'Cultural', 'Sports'];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || user.type !== 'student') {
    navigate('/');
    return null;
  }

  const filteredEvents = getEventsByCategory(selectedCategory).filter(
    (event) =>
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'All':
        return '🌟';
      case 'Technical':
        return '💻';
      case 'Non-Technical':
        return '🎯';
      case 'Cultural':
        return '🎭';
      case 'Sports':
        return '⚽';
      default:
        return '📌';
    }
  };

  return (
    <BeachBackground>
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-ocean-dark flex items-center justify-center">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-foreground">Campus Events</h1>
                <p className="text-sm text-muted-foreground">Hello, {user.name}!</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{user.collegeName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-xl hover:bg-destructive/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              🌴 Discover Amazing Events
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore exciting events happening across colleges. From tech talks to cultural fests, find your next experience!
            </p>
          </div>

          {/* Search and Filter */}
          <div className="beach-card mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search events, colleges, venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-beach pl-12 w-full"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-5 h-5 text-muted-foreground" />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {getCategoryEmoji(category)} {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="beach-card text-center py-16">
              <div className="text-6xl mb-4">🏝️</div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                No Events Found
              </h3>
              <p className="text-muted-foreground">
                {events.length === 0
                  ? 'No events have been added yet. Check back later!'
                  : 'Try adjusting your search or filters.'}
              </p>
            </div>
          )}
        </main>
      </div>
    </BeachBackground>
  );
};

export default StudentEvents;
