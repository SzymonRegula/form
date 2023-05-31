import DragDropFiles from './DragDropFiles';
import CargoGroup from './CargoGroup';
import { useDispatch, useSelector } from 'react-redux';
import { addCargo, changeValue, reset, touch } from '../redux/formSlice';
import { useState } from 'react';

function Form() {
  const [key, setKey] = useState(0);
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const fromHasError = form.from.isTouched && !form.from.isValid;
  const whereHasError = form.where.isTouched && !form.where.isValid;
  const dateHasError = form.date.isTouched && !form.date.isValid;

  const fromClasses = fromHasError ? 'form-control invalid' : 'form-control';
  const whereClasses = whereHasError ? 'form-control invalid' : 'form-control';
  const dateClasses = dateHasError ? 'form-control invalid' : 'form-control';

  const formIsValid =
    form.from.isValid &&
    form.where.isValid &&
    form.date.isValid &&
    form.cargoes.every((cargo) => cargo.name.isValid && cargo.weight.isValid);

  function formSubmitHandler(event) {
    event.preventDefault();

    if (!formIsValid) return;

    const cargoes = form.cargoes.map((cargo) => ({
      name: cargo.name.value,
      weight: cargo.weight.value,
      type: cargo.type,
    }));

    const formData = {
      from: form.from.value,
      where: form.where.value,
      plane: form.plane,
      date: form.date.value,
      files: form.files,
      cargoes,
    };
    console.log(formData);

    dispatch(reset());
    setKey((prevKey) => prevKey + 1);
  }

  return (
    <form
      key={key}
      className='form'
      action=''
      method='POST'
      encType='multipart/form-data'
    >
      <div className='transport-group'>
        <div className={fromClasses}>
          <label htmlFor='from'>Transport z</label>
          <input
            type='text'
            id='from'
            onChange={(e) => dispatch(changeValue(['from', e.target.value]))}
            onBlur={() => dispatch(touch(['from']))}
          ></input>
          {fromHasError && (
            <p className='error-text'>Musisz podać miejsce wylotu.</p>
          )}
        </div>

        <div className={whereClasses}>
          <label htmlFor='where'>Transport do</label>
          <input
            type='text'
            id='where'
            onChange={(e) => dispatch(changeValue(['where', e.target.value]))}
            onBlur={() => dispatch(touch(['where']))}
            value={form.where.value}
          ></input>
          {whereHasError && (
            <p className='error-text'>Musisz podać miejsce destynacji.</p>
          )}
        </div>

        <div className='horizontally'>
          <div className='form-control'>
            <label htmlFor='plane'>Typ samolotu</label>
            <select
              id='plane'
              onChange={(e) => dispatch(changeValue(['plane', e.target.value]))}
            >
              <option value='Airbus A380'>Airbus A380</option>
              <option value='Boeing 747'>Boeing 747</option>
            </select>
          </div>
          <div className={dateClasses}>
            <label htmlFor='date'>Data transportu</label>
            <input
              type='date'
              id='date'
              onChange={(e) => dispatch(changeValue(['date', e.target.value]))}
              onBlur={() => dispatch(touch(['date']))}
            ></input>
            {dateHasError && (
              <p className='error-text'>
                Podaj datę od poniedziałku do piatku.
              </p>
            )}
          </div>
        </div>

        <div className='form-control'>
          <label htmlFor='files'>Dokumenty przewozowe</label>
          <DragDropFiles />
        </div>
      </div>

      <ul className='cargoes-list'>
        {form.cargoes.map((cargo) => (
          <CargoGroup key={cargo.id} id={cargo.id} />
        ))}
      </ul>

      <button
        className='add-cargo-btn'
        type='button'
        onClick={() => dispatch(addCargo())}
      >
        Dodaj kolejny ładunek
      </button>

      <button
        className='confirm-btn'
        type='submit'
        disabled={!formIsValid}
        onClick={formSubmitHandler}
      >
        Zatwierdź tranport
      </button>
    </form>
  );
}

export default Form;
