import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

const Login = () => {
  const loginFormData = {
    name: 'login',
    title: 'Рады видеть!',
    buttonTitle: 'Войти',
    text: 'Ещё не зарегистрированы?',
    link: '/signup',
    linkText: 'Регистрация',
  };
  return <AuthForm formData={loginFormData} />;
};

export default Login;
