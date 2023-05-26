import { useState } from 'react';

function useInput(validationFn) {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validationFn(value);
  const inputHasError = isTouched && !valueIsValid;

  function changeValueHandler(event) {
    setValue(event.target.value);
  }

  function touchInputHandler() {
    setIsTouched(true);
  }

  function reset() {
    setValue('');
    setIsTouched(false);
  }

  return {
    value,
    valueIsValid,
    inputHasError,
    changeValueHandler,
    touchInputHandler,
    reset,
  };
}

export default useInput;
