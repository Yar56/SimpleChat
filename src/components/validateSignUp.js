import * as yup from 'yup';

export default () => yup.object().shape({
  username: yup.string()
    .min(3, 'signUpForm.errors.usernameLength')
    .max(20, 'signUpForm.errors.usernameLength')
    .required('signUpForm.errors.required'),

  password: yup.string()
    .min(6, 'signUpForm.errors.passwordLenght')
    .required('signUpForm.errors.required'),

  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'signUpForm.errors.anotherPassword'),
});
