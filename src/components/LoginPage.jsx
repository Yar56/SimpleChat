import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Button, Form, Container, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../hooks/useAuth/index.js';
import routes from '../routes.js';

import imgLogin from '../../assets/images/login.png';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const inputRef = useRef();
  const history = useHistory();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        history.replace('/');
        // setSubmitting(false);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          formik.errors.password = t('loginForm.errors.wrongData');
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-10 col-lg-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={imgLogin} alt={t('loginForm.signIn')} />
              </Col>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1>{t('loginForm.signIn')}</h1>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={t('loginForm.username')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    required
                    isInvalid={!!formik.errors.username}
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">
                    Ваш ник
                  </Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder={t('loginForm.password')}
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="password"
                    isInvalid={!!formik.errors.password}
                    required
                  />
                  <Form.Label htmlFor="password">
                    Пароль
                  </Form.Label>
                  {!!formik.errors.password && <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>}
                </Form.Group>
                <Button disabled={!!formik.isSubmitting} type="submit" className="w-100 mb-3" variant="outline-primary">{t('loginForm.signIn')}</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span className="m-2">{t('loginForm.hasAccount')}</span>
                <Link to="/signup">
                  {t('loginForm.linkToSignUp')}
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
