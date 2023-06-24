import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

const Register = () => {
  const registerFormData = {
    name: 'register',
    title: 'Добро пожаловать!',
    buttonTitle: 'Зарегистрироваться',
    text: 'Уже зарегистрированы?',
    link: '/signin',
    linkText: 'Войти',
  };
  return <AuthForm formData={registerFormData} />;
};

export default Register;
