import CargoInputs from './CargoInputs';

function Form() {
  function addCargoHandler() {}

  return (
    <form className='form'>
      <div className='transport-inputs'>
        <div className='form-field'>
          <label htmlFor='from'>Transport z</label>
          <input type='text' id='from' required></input>
        </div>
        <div className='form-field'>
          <label htmlFor='where'>Transport do</label>
          <input type='text' id='where' required></input>
        </div>
        <div className='form-field'>
          <label htmlFor='plane'>Typ samolotu</label>
          <select id='plane' required>
            <option value='Airbus A380'>Airbus A380</option>
            <option value='Boeing 747'>Boeing 747</option>
          </select>
        </div>
        <div className='form-field'>
          <label htmlFor='documents'>Dokumenty przewozowe</label>
          <input type='file' id='documents' required></input>
        </div>
        <div className='form-field'>
          <label htmlFor='date'>Data transportu</label>
          <input type='date' id='date' required></input>
        </div>
        <button type='button' onClick={addCargoHandler}>
          Dodaj kolejny ładunek
        </button>
      </div>

      <CargoInputs />
    </form>
  );
}

export default Form;
