export default {
  translation: {
    notFoundPage: 'Страница не найдена. К сожалению, страница, которую вы ищете, не найдена.',
    loginForm: {
      signIn: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      hasAccount: 'Нет аккаунта?',
      linkToSignUp: 'Регистрация',
      errors: {
        wrongData: 'Неверные имя пользователя или пароль',
        networkError: 'Нет соединения',
        unknown: 'Что-то пошло не так, попробуйте снова',
      },
    },
    signUpForm: {
      signUp: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      signUpButtom: 'Зарегистрироваться',
      errors: {
        required: 'Обязательное поле',
        usernameLength: 'От 3 до 20 символов',
        passwordLenght: 'Не менее 6 символов',
        anotherPassword: 'Пароли должны совпадать',
        userExists: 'Такой пользователь уже существует',
        networkError: 'Нет соединения',
        unknown: 'Что-то пошло не так, попробуйте снова',
      },
    },
    modals: {
      buttons: {
        send: 'Отправить',
        cancel: 'Отменить',
        remove: 'Удалить',
      },
      errors: {
        channeNamelLength: 'От 3 до 20 символов',
        uniqChannelName: 'Должно быть уникальным',
      },
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      removeChannel: {
        remove: 'Удалить канал',
        isSure: 'Уверены?',
      },
    },
    messages: {
      count_0: '{{count}} сообщение',
      count_1: '{{count}} сообщения',
      count_2: '{{count}} сообщений',
    },
  },
};
