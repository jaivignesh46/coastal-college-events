import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Phone, User, Building } from 'lucide-react';

interface AuthFormProps {
  type: 'admin' | 'student';
  onSuccess?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    collegeName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password, type);
        toast({
          title: result.success ? 'Success!' : 'Error',
          description: result.message,
          variant: result.success ? 'default' : 'destructive',
        });
        if (result.success && onSuccess) {
          onSuccess();
        }
      } else {
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
          toast({
            title: 'Error',
            description: 'Please fill all the details',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }
        if (type === 'student' && !formData.collegeName) {
          toast({
            title: 'Error',
            description: 'Please fill all the details',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        const result = await signup({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          type,
          collegeName: type === 'student' ? formData.collegeName : undefined,
        });
        toast({
          title: result.success ? 'Success!' : 'Error',
          description: result.message,
          variant: result.success ? 'default' : 'destructive',
        });
        if (result.success && onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  const inputClasses = "input-beach pl-12";

  return (
    <div className="beach-card max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-foreground mb-2">
          {type === 'admin' ? '🏖️ Admin Portal' : '🌊 Student Portal'}
        </h2>
        <p className="text-muted-foreground">
          {isLogin ? 'Welcome back! Please login to continue.' : 'Create your account to get started.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              name="name"
              placeholder={type === 'admin' ? 'Admin Name' : 'Student Name'}
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        )}

        {!isLogin && type === 'student' && (
          <div className="relative">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              name="collegeName"
              placeholder="College Name"
              value={formData.collegeName}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        )}

        {!isLogin && (
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground">🔒</div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`${inputClasses} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="ocean-button w-full text-lg font-semibold"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary hover:text-ocean-dark font-medium transition-colors"
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
