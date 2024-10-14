import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    username: null
  }),
  actions: {
    setUsername(username) {
        this.username = username;
        localStorage.setItem('username', username);
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    clearUsername() {
        this.username = null;
        localStorage.removeItem('username');
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('token');
    },
  },
  getters: {
    getUsername: (state) => {
      return state.username || localStorage.getItem('username');
    },
    getToken: (state) => {
      return state.token || localStorage.getItem('token');
    },
  },
});
