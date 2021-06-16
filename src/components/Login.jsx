import React from 'react';

const Navigation = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-10 col-lg-6 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src="https://img.icons8.com/cute-clipart/200/000000/chat.png" className="rounded-circle" alt="Войти" />
            </div>
            <form className="col-12 col-md-6 mt-3 mt-mb-0">
              <h1>Войти</h1>
              <div className="form-floating mb-3 form-group">
                <label htmlFor="username" className="w-100">
                  <input type="text" name="username" autoComplete="username" required placeholder="Ваш ник" id="username" className="form-control" value="" />
                </label>
              </div>
              <div className="form-floating mb-3 form-group">
                <label className="form-label w-100" htmlFor="password">
                  <input name="password" autoComplete="current-password" required placeholder="Пароль" type="password" id="password" className="form-control" value="" />
                </label>
              </div>
              <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
            </form>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span className="mr-2">Нет аккаунта?</span>
              <a href="/signup">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Navigation;
