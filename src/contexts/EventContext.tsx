import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Event {
  id: string;
  category: 'Technical' | 'Non-Technical' | 'Cultural' | 'Sports';
  eventName: string;
  collegeName: string;
  registrationDate: string;
  venue: string;
  registrationUrl: string;
  flyerUrl?: string;
  createdAt: string;
  createdBy: string;
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'createdAt'>) => { success: boolean; message: string };
  getEventsByCategory: (category: string) => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const addEvent = (eventData: Omit<Event, 'id' | 'createdAt'>): { success: boolean; message: string } => {
    const newEvent: Event = {
      ...eventData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    return { success: true, message: 'Event added successfully' };
  };

  const getEventsByCategory = (category: string): Event[] => {
    if (category === 'All') return events;
    return events.filter((event) => event.category === category);
  };

  return (
    <EventContext.Provider value={{ events, addEvent, getEventsByCategory }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
