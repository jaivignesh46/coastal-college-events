import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'admin' | 'student';
  collegeName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'admin' | 'student') => Promise<{ success: boolean; message: string }>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('eventUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = async (userData: Omit<User, 'id'> & { password: string }): Promise<{ success: boolean; message: string }> => {
    const users = JSON.parse(localStorage.getItem('eventUsers') || '[]');
    
    const existingUser = users.find((u: any) => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'User already exists with this email' };
    }

    const newUser: User & { password: string } = {
      ...userData,
      id: crypto.randomUUID(),
    };

    users.push(newUser);
    localStorage.setItem('eventUsers', JSON.stringify(users));

    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('eventUser', JSON.stringify(userWithoutPassword));

    return { success: true, message: 'Signup successful' };
  };

  const login = async (email: string, password: string, type: 'admin' | 'student'): Promise<{ success: boolean; message: string }> => {
    const users = JSON.parse(localStorage.getItem('eventUsers') || '[]');
    
    const foundUser = users.find((u: any) => u.email === email && u.type === type);
    
    if (!foundUser) {
      return { success: false, message: 'User not found' };
    }

    if (foundUser.password !== password) {
      return { success: false, message: 'Please enter the correct password' };
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('eventUser', JSON.stringify(userWithoutPassword));

    return { success: true, message: 'Login successful' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
