import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api, { getCsrfCookie } from '../../lib/api';

interface AuthUser {
  id: number;
  nama: string;
  username: string;
  email: string;
  id_role: number; // 1 = Admin, 2 = User
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Cek apakah user sudah login saat app pertama load
  useEffect(() => {
    api.get('/user')
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    await getCsrfCookie();
    const res = await api.post('/login', { username, password });
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    await api.post('/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAdmin: user?.id_role === 1,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
