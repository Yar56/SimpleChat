import React from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const Navigation = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-10 col-lg-6 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src="https://img.icons8.com/cute-clipart/200/000000/chat.png" className="rounded-circle" alt="Войти" />
            </div>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={SignupSchema}
              onSubmit={async (values) => {
                console.log(values);
              }}
            >
              {({
                errors,
                handleSubmit,
                values,
                handleChange,
              }) => (
                <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                  <h1>Войти</h1>
                  <div className="form-floating mb-3 form-group">
                    <Field name="username" onChange={handleChange} value={values.username} required placeholder="Ваш ник" id="username" className="form-control" autoComplete="username" />
                  </div>
                  <div className="form-floating mb-3 form-group">
                    <Field name="password" onChange={handleChange} value={values.password} required placeholder="Пароль" id="password" className="form-control" autoComplete="password" />
                    {errors.username && errors.password ? (<div>{errors.username}</div>) : null}
                  </div>
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                </form>
              )}
            </Formik>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span className="mr-2">Нет аккаунта?</span>
              <NavLink to="/signup">
                Регистрация
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Navigation;
