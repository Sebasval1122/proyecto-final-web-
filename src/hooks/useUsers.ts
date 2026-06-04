import { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types';
import { authService } from '../services/auth.service';
import { storageService } from '../services/storage.service';

export function useUsers() {
  const [users, setUsers] = useState<UserProfile[]>([]);

  const fetchUsers = useCallback(() => {
    const data = authService.getUsers();
    setUsers(data);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = (user: UserProfile & { password?: string }) => {
    const currentUsers = authService.getUsers();
    const updated = [...currentUsers, user];
    storageService.set('drivepoint_users', updated);
    setUsers(updated);
  };

  return {
    users,
    addUser,
    refreshUsers: fetchUsers
  };
}
