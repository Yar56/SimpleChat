import React from 'react';

const SignUp = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img src="https://img.icons8.com/officel/200/000000/edit-user-male.png" className="" alt="Регистрация" />
            </div>
            <form className="w-50">
              <h1 className="text-center mb-4">Регистрация</h1>
              <div className="form-floating mb-3 form-group">
                <label className="form-label w-100" htmlFor="username">
                  Имя пользователя
                  <input placeholder="От 3 до 20 символов" name="username" autoComplete="username" required id="username" className="form-control" value="" />
                </label>
                <div className="invalid-tooltip">{}</div>
              </div>
              <div className="form-floating mb-3 form-group">
                <label className="form-label w-100" htmlFor="password">
                  Пароль
                  <input placeholder="Не менее 6 символов" name="password" aria-describedby="passwordHelpBlock" required autoComplete="new-password" type="password" id="password" className="form-control" value="" />
                </label>
                <div className="invalid-tooltip">{}</div>
              </div>
              <div className="form-floating mb-4 form-group">
                <label className="form-label w-100" htmlFor="confirmPassword">
                  Подтвердите пароль
                  <input placeholder="Пароли должны совпадать" name="confirmPassword" required autoComplete="new-password" type="password" id="confirmPassword" className="form-control" value="" />
                </label>
                <div className="invalid-tooltip">{}</div>
              </div>
              <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default SignUp;
