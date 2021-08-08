import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
      <h2 className="">{t('notFoundPage')}</h2>
    </div>
  );
};
export default NotFound;
