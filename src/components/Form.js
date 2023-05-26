import { useRef } from 'react';
import useInput from '../hooks/use-input';
import CargoGroup from './CargoGroup';
import DragDropFiles from './DragDropFiles';

function Form() {
  const isNotEmpty = (value) => value.trim() !== '';

  const {
    value: fromValue,
    valueIsValid: fromValueIsValid,
    inputHasError: inputFromHasError,
    changeValueHandler: changeFromHandler,
    touchInputHandler: touchFromInputHandler,
    reset: resetFromInput,
  } = useInput(isNotEmpty);
  const fromClasses = inputFromHasError
    ? 'form-control invalid'
    : 'form-control';

  const {
    value: whereValue,
    valueIsValid: whereValueIsValid,
    inputHasError: inputWhereHasError,
    changeValueHandler: changeWhereHandler,
    touchInputHandler: touchWhereInputHandler,
    reset: resetWhereInput,
  } = useInput(isNotEmpty);
  const whereClasses = inputWhereHasError
    ? 'form-control invalid'
    : 'form-control';

  const planeRef = useRef();

  function addCargoHandler() {}

  const formIsValid = fromValueIsValid && whereValueIsValid;

  function formSubmitHandler(event) {
    event.preventDefault();

    if (!formIsValid) return;

    const formData = {
      fromValue,
      whereValue,
      planeType: planeRef.current.value,
    };
    console.log(formData);

    resetFromInput();
    resetWhereInput();
  }

  return (
    <form className='form'>
      <div className='transport-group'>
        <div className={fromClasses}>
          <label htmlFor='from'>Transport z</label>
          <input
            type='text'
            id='from'
            onChange={changeFromHandler}
            onBlur={touchFromInputHandler}
            value={fromValue}
          ></input>
          {inputFromHasError && (
            <p className='error-text'>Musisz podać miejsce wylotu.</p>
          )}
        </div>
        <div className={whereClasses}>
          <label htmlFor='where'>Transport do</label>
          <input
            type='text'
            id='where'
            onChange={changeWhereHandler}
            onBlur={touchWhereInputHandler}
            value={whereValue}
          ></input>
          {inputWhereHasError && (
            <p className='error-text'>Musisz podać miejsce destynacji.</p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor='plane'>Typ samolotu</label>
          <select id='plane' ref={planeRef}>
            <option value='Airbus A380'>Airbus A380</option>
            <option value='Boeing 747'>Boeing 747</option>
          </select>
        </div>
        <div className='form-control'>
          <label htmlFor='date'>Data transportu</label>
          <input type='date' id='date'></input>
        </div>

        <div className='form-control'>
          <label htmlFor='files'>Dokumenty przewozowe</label>
          <DragDropFiles />
        </div>

        <button type='button' onClick={addCargoHandler}>
          Dodaj kolejny ładunek
        </button>
      </div>

      <CargoGroup />

      <button type='submit' disabled={!formIsValid} onClick={formSubmitHandler}>
        Zatwierdź tranport
      </button>
    </form>
  );
}

export default Form;
