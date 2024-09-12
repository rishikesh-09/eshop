import { defineStore } from 'pinia';
import userData from '@/assests/userData.json';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(email, password) {
      const user = userData.users.find(u => u.email === email && u.password === password);
      if (user) {
        this.user = { id: user.id, email: user.email, name: user.name };
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        throw new Error('Invalid credentials');
      }
    },
    async signup(email, password, name) {
      if (userData.users.some(u => u.email === email)) {
        throw new Error('Email already registered');
      }
      const newUser = {
        id: userData.users.length + 1,
        email,
        password,
        name
      };
      userData.users.push(newUser);
      this.user = { id: newUser.id, email: newUser.email, name: newUser.name };
      localStorage.setItem('user', JSON.stringify(this.user));
    
      console.log('New user registered:', newUser);
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
    initAuth() {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
