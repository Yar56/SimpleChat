import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';

import icon from '../../assets/images/login.png';
// const SignupSchema = Yup.object().shape({
//   username: Yup.string().required(),
//   password: Yup.string().required(),
// });

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
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
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();

        history.replace('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-10 col-lg-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={icon} alt="Войти" />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1>Войти</h1>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Ваш ник"
                    name="username"
                    id="username"
                    className="form-control"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
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
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    autoComplete="password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Label htmlFor="password">
                    Пароль
                  </Form.Label>
                  <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="w-100 mb-3" variant="outline-primary">Войти</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span className="m-2">Нет аккаунта?</span>
                <Link to="/signup">
                  Регистрация
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
