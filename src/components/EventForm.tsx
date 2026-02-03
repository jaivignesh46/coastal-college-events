import React, { useState } from 'react';
import { useEvents, Event } from '@/contexts/EventContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, Link, Upload, Tag, Building, Sparkles } from 'lucide-react';

const EventForm: React.FC = () => {
  const { addEvent } = useEvents();
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    category: '' as Event['category'] | '',
    eventName: '',
    collegeName: '',
    registrationDate: '',
    venue: '',
    registrationUrl: '',
    flyerUrl: '',
  });

  const categories: Event['category'][] = ['Technical', 'Non-Technical', 'Cultural', 'Sports'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return (
      formData.category &&
      formData.eventName &&
      formData.collegeName &&
      formData.registrationDate &&
      formData.venue &&
      formData.registrationUrl
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast({
        title: 'Error',
        description: 'Please fill all the details',
        variant: 'destructive',
      });
      return;
    }

    const result = addEvent({
      category: formData.category as Event['category'],
      eventName: formData.eventName,
      collegeName: formData.collegeName,
      registrationDate: formData.registrationDate,
      venue: formData.venue,
      registrationUrl: formData.registrationUrl,
      flyerUrl: formData.flyerUrl || undefined,
      createdBy: user?.id || '',
    });

    toast({
      title: result.success ? 'Success!' : 'Error',
      description: result.message,
    });

    if (result.success) {
      setFormData({
        category: '',
        eventName: '',
        collegeName: '',
        registrationDate: '',
        venue: '',
        registrationUrl: '',
        flyerUrl: '',
      });
    }
  };

  const inputClasses = "input-beach pl-12";
  const labelClasses = "block text-sm font-medium text-foreground mb-2";

  return (
    <div className="beach-card max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-ocean-dark flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Create New Event</h2>
          <p className="text-muted-foreground text-sm">Fill in the details to add a new event</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClasses}>Category</label>
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>Event Name</label>
            <div className="relative">
              <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="eventName"
                placeholder="Enter event name"
                value={formData.eventName}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className={labelClasses}>College Name</label>
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="collegeName"
                placeholder="Enter college name"
                value={formData.collegeName}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>Registration Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="date"
                name="registrationDate"
                value={formData.registrationDate}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className={labelClasses}>Venue</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="venue"
                placeholder="Enter venue"
                value={formData.venue}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClasses}>Registration URL</label>
          <div className="relative">
            <Link className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="url"
              name="registrationUrl"
              placeholder="https://example.com/register"
              value={formData.registrationUrl}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Event Flyer URL (Optional)</label>
          <div className="relative">
            <Upload className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="url"
              name="flyerUrl"
              placeholder="https://example.com/flyer.jpg"
              value={formData.flyerUrl}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid()}
          className="ocean-button w-full text-lg font-semibold mt-6"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
