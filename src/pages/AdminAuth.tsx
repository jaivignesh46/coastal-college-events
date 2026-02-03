import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BeachBackground from '@/components/BeachBackground';
import AuthForm from '@/components/AuthForm';

const AdminAuth: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user?.type === 'admin') {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <BeachBackground>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            🏖️ Admin Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Manage and create exciting campus events
          </p>
        </div>

        <AuthForm type="admin" onSuccess={() => navigate('/admin/dashboard')} />

        <div className="mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            ← Back to Student Portal
          </button>
        </div>
      </div>
    </BeachBackground>
  );
};

export default AdminAuth;
