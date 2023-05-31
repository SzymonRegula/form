import { useDispatch, useSelector } from 'react-redux';
import { changeValue, removeCargo, touch } from '../redux/formSlice';

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
        <div className='label-delete-wrapper'>
          <label htmlFor={'name' + id}>Nazwa ładunku</label>
          <svg
            onClick={() => dispatch(removeCargo(id))}
            className='remove-svg'
            clipRule='evenodd'
            fillRule='evenodd'
            strokeLinejoin='round'
            strokeMiterlimit='2'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z' />
          </svg>
        </div>
        <input
          type='text'
          id={'name' + id}
          value={cargoState.name.value}
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
          <label htmlFor={'weight' + id}>Masa w kg</label>
          <input
            type='number'
            id={'weight' + id}
            min={0}
            max={maxWeight}
            value={cargoState.weight.value}
            onChange={(e) =>
              dispatch(changeValue(['cargoWeight', e.target.value, id]))
            }
            onBlur={() => dispatch(touch(['cargoWeight', id]))}
          ></input>
          {weightHasError && (
            <p className='error-text'>
              Masa musi być dodatna, mniejsza od {maxWeight} kg.
            </p>
          )}
        </div>
        <div className='form-control'>
          <label htmlFor={'cargo' + id}>Typ ładunku</label>
          <select
            id={'cargo' + id}
            value={cargoState.type}
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
