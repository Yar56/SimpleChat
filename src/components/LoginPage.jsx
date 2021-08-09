import React, {
  useRef, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Button, Form, Container, Row, Col, Card,
} from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

import imgLogin from '../../assets/images/login.png';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  const inputRef = useRef();
  const history = useHistory();
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        auth.logIn(data);
        history.replace('/');
      } catch (err) {
        if (err.isAxiosError && err.response?.status === 401) {
          setLoginError('wrongData');
          inputRef.current.select();
        } else if (err.isAxiosError) {
          setLoginError('networkError');
        } else {
          setLoginError('unknown');
          console.error(err);
        }

        setSubmitting(false);
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
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
                    readOnly={formik.isSubmitting}
                    isInvalid={!!loginError}
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
                    readOnly={formik.isSubmitting}
                    isInvalid={!!loginError}
                    required
                  />
                  <Form.Label htmlFor="password">
                    Пароль
                  </Form.Label>
                  {loginError && <Form.Control.Feedback type="invalid">{t(`loginForm.errors.${loginError}`)}</Form.Control.Feedback>}
                </Form.Group>
                <Button disabled={!!formik.isSubmitting} type="submit" className="w-100 mb-3" variant="outline-primary">{t('loginForm.signIn')}</Button>
              </Form>
            </Card.Body>
            <div className="card-footer p-4">
              <div className="text-center">
                <span className="m-2">{t('loginForm.hasAccount')}</span>
                <Link to="/signup">
                  {t('loginForm.linkToSignUp')}
                </Link>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
