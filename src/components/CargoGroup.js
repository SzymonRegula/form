function CargoGroup() {
  return (
    <div className='cargo-form-group'>
      <div className='form-control'>
        <label htmlFor='name'>Nazwa ładunku</label>
        <input type='text' id='name'></input>
      </div>
      <div className='form-control'>
        <label htmlFor='weight'>Ciężar ładunku w kg</label>
        <input type='number' id='weight'></input>
      </div>
      <div className='form-control'>
        <label htmlFor='cargo'>Typ ładunku</label>
        <select id='cargo'>
          <option value='dangerous'>zwykły</option>
          <option value='normall'>niebezpieczny</option>
        </select>
      </div>
    </div>
  );
}

export default CargoGroup;
