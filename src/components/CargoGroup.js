import { useDispatch, useSelector } from 'react-redux';
import { changeValue, touch } from '../redux/formSlice';

function CargoGroup({ id }) {
  const dispatch = useDispatch();
  const plane = useSelector((state) => state.form.plane);
  const cargoState = useSelector((state) =>
    state.form.cargoes.find((cargo) => cargo.id === id)
  );

  const nameHasError = cargoState.name.isTouched && !cargoState.name.isValid;
  const weightHasError =
    cargoState.weight.isTouched && !cargoState.weight.isValid;

  const cargoNameClasses = nameHasError
    ? 'form-control invalid'
    : 'form-control';

  const cargoWeightClasses = weightHasError
    ? 'form-control invalid'
    : 'form-control';

  let maxWeight;
  if (plane === 'Airbus A380') maxWeight = 35000;
  else if (plane === 'Boeing 747') maxWeight = 38000;

  return (
    <li className='cargo-group'>
      <div className={cargoNameClasses}>
        <label htmlFor={'name' + id}>Nazwa ładunku</label>
        <input
          type='text'
          id={'name' + id}
          onChange={(e) =>
            dispatch(changeValue(['cargoName', e.target.value, id]))
          }
          onBlur={() => dispatch(touch(['cargoName', id]))}
        ></input>
        {nameHasError && (
          <p className='error-text'>Musisz podać nazwę ładunku.</p>
        )}
      </div>

      <div className='horizontally'>
        <div className={cargoWeightClasses}>
          <label htmlFor={'weight' + id}>Ciężar ładunku w kg</label>
          <input
            type='number'
            id={'weight' + id}
            min={0}
            max={maxWeight}
            onChange={(e) =>
              dispatch(changeValue(['cargoWeight', e.target.value, id]))
            }
            onBlur={() => dispatch(touch(['cargoWeight', id]))}
          ></input>
          {weightHasError && (
            <p className='error-text'>
              Masa musi być dodatnia i niewiększa niż {maxWeight} kg.
            </p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor={'cargo' + id}>Typ ładunku</label>
          <select
            id={'cargo' + id}
            onChange={(e) =>
              dispatch(changeValue(['cargoType', e.target.value, id]))
            }
          >
            <option value='normall'>zwykły</option>
            <option value='dangerous'>niebezpieczny</option>
          </select>
        </div>
      </div>
    </li>
  );
}

export default CargoGroup;
