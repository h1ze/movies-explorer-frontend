import React, { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';

const Login = ({ onLogin, isErrorResponse, isloggedIn }) => {
  const loginFormData = {
    name: 'login',
    title: 'Рады видеть!',
    buttonTitle: 'Войти',
    text: 'Ещё не зарегистрированы?',
    link: '/signup',
    linkText: 'Регистрация',
  };
  return (
    <AuthForm
      formData={loginFormData}
      onSubmit={onLogin}
      isErrorResponse={isErrorResponse}
      isloggedIn={isloggedIn}
    />
  );
};

export default Login;
