import type { User } from '@/types';

export const getUserInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const formatUserName = (user: User): string => {
  return `${user.name} (${user.role.charAt(0).toUpperCase() + user.role.slice(1)})`;
};

export const getUserDisplayName = (user: User | null): string => {
  if (!user) return 'Unknown User';
  return `${user.name} - ${user.role.toUpperCase()}`;
};

export const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case 'admin': return 'Administrator';
    case 'manager': return 'Manager';
    case 'intern': return 'Intern';
    default: return role.charAt(0).toUpperCase() + role.slice(1);
  }
};