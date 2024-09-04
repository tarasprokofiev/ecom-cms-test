import type {InitOptions} from 'i18next';
import enTranslations from './translations/en.json';
import ukTranslations from './translations/uk.json';

export default {
  supportedLngs: ['en', 'uk'],
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common'],
  resources: {
    en: {
      common: enTranslations,
    },
    uk: {
      common: ukTranslations,
    },
  }
} satisfies InitOptions;
