function CargoInputs() {
  return (
    <div className='cargo-inputs'>
      <div className='form-field'>
        <label htmlFor='name'>Nazwa ładunku</label>
        <input type='text' id='name' required></input>
      </div>
      <div className='form-field'>
        <label htmlFor='weight'>Ciężar ładunku w kg</label>
        <input type='number' id='weight' required></input>
      </div>
      <div className='form-field'>
        <label htmlFor='cargo'>Typ ładunku</label>
        <select id='cargo' required>
          <option value='dangerous'>zwykły</option>
          <option value='normall'>niebezpieczny</option>
        </select>
      </div>
    </div>
  );
}

export default CargoInputs;
