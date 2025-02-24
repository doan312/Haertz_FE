
interface ImportMetaEnv {
  readonly VITE_GOOGLE_LOGIN_CLIENT_ID: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_GOOGLE_LOGIN_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}