/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_I18N_LOCALE: string;
  readonly VITE_I18N_FALLBACK_LOCALE: string;
  readonly VITE_API_VERSION: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_API_URL: string;
  readonly VITE_S3_ACCESS_KEY: string;
  readonly VITE_S3_SECRET_KEY: string;
  readonly VITE_APP_WP_URL: string;
  readonly VITE_APP_GMO_PAYMENT_SHOP_ID: string;
  readonly VITE_APP_GMO_PAYMENT_TOKEN_SERVICE_URL: string;
  readonly VITE_APP_CONTACT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
