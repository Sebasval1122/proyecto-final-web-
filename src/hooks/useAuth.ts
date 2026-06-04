import { useAuthContext } from '../context/AuthContext';

export function useAuth() {
  const { user, login, logout, register, setUser } = useAuthContext();

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isDealer: user?.role === 'dealer',
    isUser: user?.role === 'user',
    login,
    logout,
    register,
    setUser
  };
}
