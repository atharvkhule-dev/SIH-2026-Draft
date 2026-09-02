import { User, ProviderProfile } from '../../types';
import { INITIAL_USER, MOCK_PROVIDERS } from '../mockData';

let localUser: User = (() => {
  const saved = localStorage.getItem('coop_user');
  return saved ? JSON.parse(saved) : INITIAL_USER;
})();

export const userService = {
  async getCurrentUser(): Promise<User> {
    return Promise.resolve(localUser);
  },

  async updateUser(updates: Partial<User>): Promise<User> {
    localUser = { ...localUser, ...updates };
    localStorage.setItem('coop_user', JSON.stringify(localUser));
    return Promise.resolve(localUser);
  },

  async getProviders(): Promise<ProviderProfile[]> {
    return Promise.resolve(MOCK_PROVIDERS);
  },
};
