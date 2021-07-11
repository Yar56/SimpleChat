import React, { useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';

import axios from 'axios';
import imgReg from '../../assets/images/reg.png';
import useAuth from '../hooks/useAuth/index.js';
import signUpChema from './validateSignUp.js';
import routes from '../routes.js';

const SignUp = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const auth = useAuth();
  const inputRef = useRef();

  const redirectAuthorized = useCallback(
    () => {
      console.log(auth);
      if (auth.user) {
        history.replace('/');
      }
    },
    [auth.loggedIn, history],
  );

  useEffect(() => {
    redirectAuthorized();
    inputRef.current.focus();
  }, [redirectAuthorized]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ username, password }, { setFieldError, setSubmitting }) => {
      // history.replace('/');
      console.log(window.location.pathname);
      try {
        const res = await axios.post(routes.signUpPath(), { username, password });
        const { data } = res;
        console.log(window.location.pathname);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();

        console.log(window.location.pathname);
        history.push('/');
      } catch (err) {
        console.log(err);
        inputRef.current.select();
        if (err.response.status === 409) {
          setFieldError('username', ' ');
          setFieldError('password', ' ');
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
                    placeholder={t('signUpForm.errors.usernameLength')}
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
                    placeholder={t('signUpForm.errors.passwordLenght')}
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={!!formik.errors.password}
                  />
                  <Form.Label htmlFor="password">{t('signUpForm.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    placeholder={t('signUpForm.errors.anotherPassword')}
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
                <Button disabled={formik.isSubmitting} variant="outline-primary" type="submit" className="w-100">
                  {t('signUpForm.signUpButtom')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
