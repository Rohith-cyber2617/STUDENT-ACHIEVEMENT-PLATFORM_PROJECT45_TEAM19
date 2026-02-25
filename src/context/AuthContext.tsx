import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, findUserByEmail, saveUser, generateId } from '../utils/localStorage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, role: 'Student' | 'Admin') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('eams_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = findUserByEmail(email);
    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      localStorage.setItem('eams_current_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string, role: 'Student' | 'Admin'): boolean => {
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return false;
    }
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password,
      role,
    };
    saveUser(newUser);
    setUser(newUser);
    localStorage.setItem('eams_current_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eams_current_user');
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
