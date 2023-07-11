import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

const Login = ({ onLogin, isErrorResponse, isloggedIn, isSending }) => {
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
      isSending={isSending}
    />
  );
};

export default Login;
