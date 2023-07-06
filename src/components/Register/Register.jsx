import React from 'react';

import AuthForm from '../AuthForm/AuthForm';

const Register = ({ onRegister, isErrorResponse, isloggedIn }) => {
  const registerFormData = {
    name: 'register',
    title: 'Добро пожаловать!',
    buttonTitle: 'Зарегистрироваться',
    text: 'Уже зарегистрированы?',
    link: '/signin',
    linkText: 'Войти',
  };

  return (
    <AuthForm
      formData={registerFormData}
      onSubmit={onRegister}
      isErrorResponse={isErrorResponse}
      isloggedIn={isloggedIn}
    />
  );
};

export default Register;
