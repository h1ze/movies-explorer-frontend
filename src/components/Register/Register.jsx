import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

const Register = ({ onRegister, isErrorResponse }) => {
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
    />
  );
};

export default Register;
