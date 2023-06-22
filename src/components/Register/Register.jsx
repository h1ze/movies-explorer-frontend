import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import './Register.css';

const Register = () => {
  const registerFormData = {
    name: 'register',
    title: 'Добро пожаловать!',
    buttonTitle: 'Зарегистрироваться',
  };
  return <AuthForm formData={registerFormData} />;
};

export default Register;
