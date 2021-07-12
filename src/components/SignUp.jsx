import React, {
  useRef, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  Card, Form, Button, Container, Row, Col,
} from 'react-bootstrap';
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
  const [signUpError, setSignUpError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ username, password }, { setSubmitting }) => {
      setSubmitting(true);
      const url = routes.signUpPath();
      try {
        const { data } = await axios.post(url, { username, password }, { timeout: 10000, timeoutErrorMessage: 'Network Error' });
        auth.logIn(data);
        history.replace('/');
      } catch (err) {
        console.log(err.response);
        inputRef.current.select();
        if (err.isAxiosError && err.response && err.response.status === 409) {
          setSignUpError('userExists');
          inputRef.current.select();
        } else if (err.isAxiosError && err.message === 'Network Error') {
          setSignUpError('networkError');
        } else {
          setSignUpError('unknown');
          console.error(err);
        }
        setSubmitting(false);
      }
    },
    validationSchema: () => {
      setSignUpError(null);

      return signUpChema();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div className="">
                <img src={imgReg} alt={t('signUpForm.signUp')} />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signUpForm.signUp')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    ref={inputRef}
                    placeholder={t('signUpForm.errors.usernameLength')}
                    name="username"
                    autoComplete="username"
                    required
                    id="username"
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.username || signUpError}
                    value={formik.values.username}
                    readOnly={formik.isSubmitting}
                  />
                  <Form.Label htmlFor="username">{t('signUpForm.username')}</Form.Label>
                  {formik.errors.username
                    && <Form.Control.Feedback type="invalid" tooltip>{t(formik.errors.username)}</Form.Control.Feedback>}
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
                    isInvalid={formik.errors.password || signUpError}
                    readOnly={formik.isSubmitting}
                  />
                  <Form.Label htmlFor="password">{t('signUpForm.password')}</Form.Label>
                  {formik.errors.password
                    && <Form.Control.Feedback type="invalid" tooltip>{t(formik.errors.password)}</Form.Control.Feedback>}
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
                    isInvalid={formik.errors.confirmPassword || signUpError}
                    readOnly={formik.isSubmitting}
                  />
                  <Form.Label htmlFor="confirmPassword">{t('signUpForm.confirmPassword')}</Form.Label>
                  {formik.errors.confirmPassword
                    && <Form.Control.Feedback type="invalid" tooltip>{t(formik.errors.confirmPassword)}</Form.Control.Feedback>}
                  {signUpError
                    && <Form.Control.Feedback type="invalid">{t(`signUpForm.errors.${signUpError}`)}</Form.Control.Feedback>}
                </Form.Group>
                <Button disabled={formik.isSubmitting} variant="outline-primary" type="submit" className="w-100">
                  {t('signUpForm.signUpButtom')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default SignUp;
