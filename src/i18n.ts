import { initI18n } from '../i18n/services';

const defaultLanguage = 'en-US';
const defaultNamespace = 'common';
const supportedNamespaces = [defaultNamespace];

export const supportedLanguages = [defaultLanguage, 'zh-CN']; // used in the language switcher

initI18n(
  '/locales/{{lng}}/{{ns}}.json',
  defaultLanguage,
  defaultNamespace,
  supportedNamespaces
);
