import React from 'react';
import { Event } from '@/contexts/EventContext';
import { Calendar, MapPin, ExternalLink, Building } from 'lucide-react';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const getCategoryStyles = (category: Event['category']) => {
    switch (category) {
      case 'Technical':
        return 'category-technical';
      case 'Non-Technical':
        return 'category-nontechnical';
      case 'Cultural':
        return 'category-cultural';
      case 'Sports':
        return 'category-sports';
      default:
        return 'category-technical';
    }
  };

  const getCategoryEmoji = (category: Event['category']) => {
    switch (category) {
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
    <div className="beach-card group hover:scale-[1.02] transition-all duration-300 overflow-hidden">
      {/* Flyer Image */}
      {event.flyerUrl && (
        <div className="relative -mx-6 -mt-6 mb-4 h-48 overflow-hidden">
          <img
            src={event.flyerUrl}
            alt={event.eventName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Category Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryStyles(event.category)}`}>
          {getCategoryEmoji(event.category)} {event.category}
        </span>
      </div>

      {/* Event Name */}
      <h3 className="text-xl font-display font-bold text-foreground mb-3 line-clamp-2">
        {event.eventName}
      </h3>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Building className="w-4 h-4" />
          <span className="text-sm">{event.collegeName}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            {format(new Date(event.registrationDate), 'PPP')}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{event.venue}</span>
        </div>
      </div>

      {/* Register Button */}
      <a
        href={event.registrationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="sunset-button w-full flex items-center justify-center gap-2"
      >
        Register Now
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
};

export default EventCard;
