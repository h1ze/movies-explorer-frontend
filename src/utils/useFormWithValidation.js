import React, { useCallback } from 'react';
import isEmail from 'validator/lib/isEmail';

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });

    if (name === 'email' && !isEmail(value)) {
      setErrors({
        ...errors,
        email: 'Поле email должно соответствовать шаблону электронной почты',
      });
    } else if (target.validity.patternMismatch) {
      setErrors({
        ...errors,
        name: 'Поле name должно содержать только латиницу, кириллицу, пробел или дефис.',
      });
    } else {
      setErrors({
        ...errors,
        [name]: target.validationMessage,
      });
    }

    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, resetForm };
}
