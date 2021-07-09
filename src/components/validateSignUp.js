import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();
  return yup.object().shape({
    username: yup.string()
      .min(3, t('signUpForm.errors.usernameLength'))
      .max(20, t('signUpForm.errors.usernameLength'))
      .required(t('signUpForm.errors.required')),

    password: yup.string()
      .min(6, t('signUpForm.errors.passwordLenght'))
      .required(t('signUpForm.errors.required')),

    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], t('signUpForm.errors.anotherPassword')),
  });
};
