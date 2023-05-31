import DragDropFiles from './DragDropFiles';
import CargoGroup from './CargoGroup';
import { useDispatch, useSelector } from 'react-redux';
import { addCargo, changeValue, reset, touch } from '../redux/formSlice';
import { useState } from 'react';

function Form() {
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

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
      files,
      cargoes,
    };
    console.log(formData);

    dispatch(reset());
  }

  function filesChangeHandler(files) {
    setFiles(files);
  }

  return (
    <form className='form' onSubmit={formSubmitHandler}>
      <div className='transport-group'>
        <div className={fromClasses}>
          <label htmlFor='from'>Transport z</label>
          <input
            type='text'
            id='from'
            value={form.from.value}
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
            value={form.where.value}
            onChange={(e) => dispatch(changeValue(['where', e.target.value]))}
            onBlur={() => dispatch(touch(['where']))}
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
              value={form.plane}
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
              value={form.date.value}
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
          <DragDropFiles onChangeFiles={filesChangeHandler} />
        </div>
      </div>

      {form.cargoes.length > 0 && (
        <ul className='cargoes-list'>
          {form.cargoes.map((cargo) => (
            <CargoGroup key={cargo.id} id={cargo.id} />
          ))}
        </ul>
      )}

      <button
        className='add-cargo-btn'
        type='button'
        onClick={() => dispatch(addCargo())}
      >
        Dodaj ładunek
      </button>

      <button className='confirm-btn' type='submit' disabled={!formIsValid}>
        Zatwierdź tranport
      </button>
    </form>
  );
}

export default Form;
