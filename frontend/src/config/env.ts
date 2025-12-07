// src/config/env.ts
export const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Marriott Management System',
  TOKEN_KEY: 'ims_token',
  USER_KEY: 'ims_user',
} as const;