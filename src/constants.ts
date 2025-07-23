// API Endpoints

const env = import.meta.env;
export const BASE_URL = env.VITE_BASE_URL;
export const API_ENDPOINTS = {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGET_PASSWORD: '/forget-password',
    DASHBOARD: '/auth/dashboard',
    PROFILE: '/auth/profile',
} as const;
