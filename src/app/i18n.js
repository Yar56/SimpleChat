import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from '../locales/ru.js';

export default async () => {
  const i18nInstance = i18next.createInstance();
  const defaultLanguage = 'ru';

  await i18nInstance.use(initReactI18next)
    .init({
      debug: false,
      lng: defaultLanguage,
      resources: {
        ru,
      },
    });
  return i18nInstance;
};
