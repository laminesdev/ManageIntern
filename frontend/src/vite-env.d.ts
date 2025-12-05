/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_DEBUG: string;
  // Add other environment variables you use
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}