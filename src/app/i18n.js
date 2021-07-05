import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from '../locales/ru.js';

const i18nInstance = i18next.createInstance();
const defaultLanguage = 'ru';

i18nInstance.use(initReactI18next)
  .init({
    debug: true,
    lng: defaultLanguage,
    resources: {
      ru,
    },
  });

export default i18nInstance;
