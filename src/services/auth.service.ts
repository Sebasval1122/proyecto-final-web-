import { Role, UserProfile } from '../types';
import { storageService } from './storage.service';

const USERS_KEY = 'drivepoint_users';
const CURRENT_USER_KEY = 'drivepoint_auth';

const defaultUsers: (UserProfile & { password?: string })[] = [
  {
    id: 'admin-001',
    name: 'Admin Drive',
    email: 'admin@drivepoint.test',
    role: 'admin',
    password: 'Admin1234!'
  },
  {
    id: 'dealer-001',
    name: 'Concesionaria Alfa',
    email: 'dealer@drivepoint.test',
    role: 'dealer',
    password: 'Dealer1234!'
  },
  {
    id: 'user-001',
    name: 'Cliente Demo',
    email: 'user@drivepoint.test',
    role: 'user',
    password: 'User1234!'
  }
];

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export const authService = {
  getUsers: (): (UserProfile & { password?: string })[] => {
    const users = storageService.get<(UserProfile & { password?: string })[]>(USERS_KEY);
    if (!users) {
      storageService.set(USERS_KEY, defaultUsers);
      return defaultUsers;
    }
    return users;
  },

  login: async (email: string, password: string, role?: Role): Promise<UserProfile> => {
    const users = authService.getUsers();
    const found = users.find(
      u => u.email === email && u.password === password && (!role || u.role === role)
    );

    if (found) {
      const { password: _, ...profile } = found;
      storageService.set(CURRENT_USER_KEY, profile);
      return profile;
    }

    const existing = users.find(u => u.email === email);
    if (existing) {
      throw new Error('Email o contraseña incorrectos');
    }

    // Auto-register if not found (matching original logic)
    const newUser: UserProfile & { password?: string } = {
      id: generateId(),
      name: email.split('@')[0],
      email,
      role: role || 'user',
      password
    };
    
    const updatedUsers = [...users, newUser];
    storageService.set(USERS_KEY, updatedUsers);
    
    const { password: __, ...profile } = newUser;
    storageService.set(CURRENT_USER_KEY, profile);
    return profile;
  },

  register: async (name: string, email: string, password: string, role: Role = 'user'): Promise<UserProfile> => {
    const users = authService.getUsers();
    const exists = users.find(u => u.email === email);
    if (exists) throw new Error('El email ya está registrado');
    
    const profile: UserProfile & { password?: string } = { id: generateId(), name, email, role, password };
    const updatedUsers = [...users, profile];
    storageService.set(USERS_KEY, updatedUsers);
    
    const { password: _, ...userProfile } = profile;
    storageService.set(CURRENT_USER_KEY, userProfile);
    return userProfile;
  },

  logout: (): void => {
    storageService.remove(CURRENT_USER_KEY);
  },

  getCurrentUser: (): UserProfile | null => {
    return storageService.get<UserProfile>(CURRENT_USER_KEY);
  }
};
