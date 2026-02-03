import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEvents } from '@/contexts/EventContext';
import BeachBackground from '@/components/BeachBackground';
import EventForm from '@/components/EventForm';
import EventCard from '@/components/EventCard';
import { LogOut, User, Calendar, LayoutGrid } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { events } = useEvents();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (!user || user.type !== 'admin') {
    navigate('/admin');
    return null;
  }

  return (
    <BeachBackground>
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-ocean-dark flex items-center justify-center">
                <LayoutGrid className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{user.email}</span>
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
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Events', value: events.length, icon: Calendar, color: 'from-primary to-ocean-dark' },
              { label: 'Technical', value: events.filter(e => e.category === 'Technical').length, icon: LayoutGrid, color: 'from-blue-500 to-blue-600' },
              { label: 'Cultural', value: events.filter(e => e.category === 'Cultural').length, icon: LayoutGrid, color: 'from-coral to-sunset' },
              { label: 'Sports', value: events.filter(e => e.category === 'Sports').length, icon: LayoutGrid, color: 'from-green-500 to-green-600' },
            ].map((stat, i) => (
              <div key={i} className="beach-card flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shrink-0`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Event Form */}
          <div className="mb-12">
            <EventForm />
          </div>

          {/* Event List */}
          {events.length > 0 && (
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Your Events ({events.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </BeachBackground>
  );
};

export default AdminDashboard;
