import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BeachBackground from '@/components/BeachBackground';
import AuthForm from '@/components/AuthForm';
import { useEffect } from 'react';

const StudentAuth: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user?.type === 'student') {
      navigate('/student/events');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <BeachBackground>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            🌴 Campus Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Discover amazing events happening at colleges near you!
          </p>
        </div>

        <AuthForm type="student" onSuccess={() => navigate('/student/events')} />

        <div className="mt-8">
          <button
            onClick={() => navigate('/admin')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Admin Login →
          </button>
        </div>
      </div>
    </BeachBackground>
  );
};

export default StudentAuth;
