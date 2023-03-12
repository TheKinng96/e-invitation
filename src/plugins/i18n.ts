import { createI18n } from 'vue-i18n';
import { jp } from '@/locales/jp';
import { en } from '@/locales/en';
import { cn } from '@/locales/cn';

const locale = import.meta.env.VITE_I18N_LOCALE || 'en';
const fallbackLocale = import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en';

export default createI18n({
  legacy: false,
  silentFallbackWarn: true,
  warnHtmlMessage: false,
  locale,
  fallbackLocale,
  messages: {
    jp,
    en,
    cn,
  },
});
