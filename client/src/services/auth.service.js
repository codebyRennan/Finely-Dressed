import api from './api.js';

export async function register(payload) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function login(payload) {
  const { data } = await api.post('/auth/login', payload);
  return data;
}

export async function getProfile() {
  const { data } = await api.get('/users/me');
  return data.user;
}

export async function updateProfile(payload) {
  const { data } = await api.put('/users/me', payload);
  return data.user;
}
