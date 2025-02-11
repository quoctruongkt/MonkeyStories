import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {LanguageDetectorModule} from 'i18next';
import {storage} from '@/storage';
import en from '@/assets/languages/en.json';

const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: () => {
    const savedDataJSON = storage.getString('user-language');
    const lng = savedDataJSON ? savedDataJSON : 'en';
    return lng;
  },
  init: () => {},
  cacheUserLanguage: (lng: string) => {
    storage.set('user-language', lng);
  },
};

const resources = {
  en: {
    translation: en,
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en', // Ngôn ngữ mặc định nếu không tìm thấy ngôn ngữ đã chọn
    supportedLngs: ['en'], // Liệt kê các ngôn ngữ được hỗ trợ
    interpolation: {
      escapeValue: false, // React đã xử lý việc chống tấn công XSS
    },
    resources,
  });

export default i18n;
