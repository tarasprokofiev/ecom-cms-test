import {RemixI18Next} from 'remix-i18next/server';
import i18n from '~/admin/locale/i18n.config';

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
  },
});

export default i18next;
