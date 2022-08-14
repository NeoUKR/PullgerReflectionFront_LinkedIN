import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// config
import { defaultLang } from '../config';
//
import enLocales from './en';
import ukLocales from './uk';
// import frLocales from './fr';
// import vnLocales from './vn';
// import cnLocales from './cn';
// import arLocales from './ar';

// ----------------------------------------------------------------------

let lng = defaultLang.value;

if (typeof window !== 'undefined') {
  lng = localStorage.getItem('i18nextLng') || defaultLang.value;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      uk: { translations: ukLocales },
      // fr: { translations: frLocales },
      // vn: { translations: vnLocales },
      // cn: { translations: cnLocales },
      // ar: { translations: arLocales },
    },
    lng,
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;