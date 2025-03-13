import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi, { HttpBackendOptions } from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export type TI18nLanguage = 'en-US' | 'zh-CN';

function initI18n(
  loadPath: string,
  defaultLanguage: string,
  defaultNamespace: string,
  supportedNamespaces: string[]
) {
  return i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(HttpApi)
    .init<HttpBackendOptions>({
      backend: { loadPath },
      fallbackLng: defaultLanguage,
      load: 'currentOnly',
      debug: true,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      defaultNS: defaultNamespace,
      ns: supportedNamespaces,
      nsSeparator: ':',
    });
}

function getCurrentLanguage(): TI18nLanguage {
  return i18n.language as TI18nLanguage;
}

function changeLanguage(language: string) {
  console.log('changeLanguage', language);
  return i18n.changeLanguage(language);
}

function onLanguageChanged(callback: (language: string) => void) {
  return i18n.on('languageChanged', callback);
}

export { initI18n, getCurrentLanguage, changeLanguage, onLanguageChanged };
