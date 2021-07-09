import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
// import { useHistory } from 'react-router-dom';
import { Card, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

import axios from 'axios';
import imgReg from '../../assets/images/reg.png';
import useAuth from '../hooks/useAuth/index.js';
import signUpChema from './validateSignUp.js';
import routes from '../routes.js';

const SignUp = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      username: '',
      signUpPassword: '',
      confirmPassword: '',
    },
    onSubmit: async ({ username, signUpPassword }, { setSubmitting, setFieldError }) => {
      try {
        const res = await axios.post(routes.signUpPath(), { username, password: signUpPassword });
        const { data } = res;

        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        setSubmitting(false);
      } catch (err) {
        inputRef.current.select();
        if (err.response.status === 409) {
          setFieldError('username', ' ');
          setFieldError('signUpPassword', ' ');
          setFieldError('confirmPassword', t('signUpForm.errors.userIsExists'));
        }
        setSubmitting(false);
      }
    },
    validationSchema: signUpChema(),
    validateOnChange: true,
    validateOnBlur: true,
  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div className="pe-4">
                <img src={imgReg} alt={t('signUpForm.signUp')} />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signUpForm.signUp')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    ref={inputRef}
                    placeholder="От 3 до 20 символов"
                    type="text"
                    name="username"
                    autoComplete="username"
                    required
                    id="username"
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.username}
                    value={formik.values.username}
                  />
                  <Form.Label htmlFor="username">{t('signUpForm.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    placeholder="Не менее 6 символов"
                    type="password"
                    name="signUpPassword"
                    id="signUpPassword"
                    autoComplete="new-password"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.signUpPassword}
                    isInvalid={!!formik.errors.signUpPassword}
                  />
                  <Form.Label htmlFor="signUpPassword">{t('signUpForm.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.signUpPassword}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    placeholder="Пароли должны совпадать"
                    type="password"
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                    id="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    isInvalid={!!formik.errors.confirmPassword}
                  />
                  <Form.Label htmlFor="confirmPassword">{t('signUpForm.confirmPassword')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>
                <button disabled={!!formik.isSubmitting} type="submit" className="w-100 btn btn-outline-primary">{t('signUpForm.signUpButtom')}</button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
