export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'Student' | 'Admin';
}

export interface Achievement {
  id: string;
  userId: string;
  title: string;
  category: 'Sports' | 'Technical' | 'Cultural' | 'Hackathon' | 'Others';
  level: 'College' | 'State' | 'National' | 'International';
  date: string;
  position: 'Winner' | 'Runner' | 'Participant';
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const USERS_KEY = 'eams_users';
const ACHIEVEMENTS_KEY = 'eams_achievements';

export const getUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(u => u.email === email);
};

export const getAchievements = (): Achievement[] => {
  const data = localStorage.getItem(ACHIEVEMENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveAchievement = (achievement: Achievement): void => {
  const achievements = getAchievements();
  achievements.push(achievement);
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
};

export const updateAchievement = (id: string, updates: Partial<Achievement>): void => {
  const achievements = getAchievements();
  const index = achievements.findIndex(a => a.id === id);
  if (index !== -1) {
    achievements[index] = { ...achievements[index], ...updates };
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  }
};

export const getAchievementsByUserId = (userId: string): Achievement[] => {
  const achievements = getAchievements();
  return achievements.filter(a => a.userId === userId);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
