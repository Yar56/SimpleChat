import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import imgReg from '../../assets/images/reg.png';

const schema = yup.object().shape({
  username: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
  password: yup.string().min(6, 'Не менее 6 символов').required('Обязательное поле'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
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
                <img src={imgReg} alt="Регистрация" />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    placeholder="От 3 до 20 символов"
                    type="text"
                    name="username"
                    autocomplete="username"
                    required
                    id="username"
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.username}
                    value={formik.values.username}
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    placeholder="Не менее 6 символов"
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="new-password"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={!!formik.errors.password}
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    placeholder="Пароли должны совпадать"
                    type="password"
                    name="confirmPassword"
                    required
                    autocomplete="new-password"
                    id="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    isInvalid={!!formik.errors.confirmPassword}
                  />
                  <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>
                <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
