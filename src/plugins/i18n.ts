import { languages } from '@/locales/index';
import { createI18n } from 'vue-i18n';
const messages = Object.assign(languages);

const numberFormats = {
  en: {
    currency: {
      style: 'currency',
      currency: 'JPY',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
    decimal: {
      style: 'decimal',
      currency: 'JPY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    noDecimal: {
      style: 'currency',
      currency: 'JPY',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  },
  jp: {
    currency: {
      style: 'currency',
      currency: 'JPY',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
    decimal: {
      style: 'decimal',
      currency: 'JPY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    noDecimal: {
      style: 'currency',
      currency: 'JPY',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  },
};

export default createI18n({
  legacy: false,
  silentFallbackWarn: true,
  warnHtmlMessage: false,
  locale: import.meta.env.VITE_I18N_LOCALE || 'jp',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'jp',
  messages,
  numberFormats,
});
