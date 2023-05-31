import { createSlice } from '@reduxjs/toolkit';

let id = 0;
const initialCargo = (id) => ({
  id,
  name: { value: '', isValid: false, isTouched: false },
  weight: { value: 0, isValid: false, isTouched: false },
  type: 'normall',
});

const initialState = {
  from: { value: '', isValid: false, isTouched: false },
  where: { value: '', isValid: false, isTouched: false },
  plane: 'Airbus A380',
  date: { value: '', isValid: false, isTouched: false },
  files: [],
  cargoes: [initialCargo(id)],
};

function isNotEmpty(value) {
  return value.trim() !== '';
}
function isNotWeekend(value) {
  if (!value) return false;
  const date = new Date(value);
  const dayOfWeek = date.getDay();
  return !(dayOfWeek === 6 || dayOfWeek === 0);
}
function isGoodWeight(value, plane) {
  if (plane === 'Airbus A380') return value > 0 && value <= 35000;
  else if (plane === 'Boeing 747') return value > 0 && value <= 38000;
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    changeValue: (state, action) => {
      const [what, value, id] = action.payload;

      let cargo;
      if (id !== undefined) {
        cargo = state.cargoes.find((cargo) => cargo.id === id);
      }

      switch (what) {
        case 'from':
          state.from.value = value;
          isNotEmpty(value)
            ? (state.from.isValid = true)
            : (state.from.isValid = false);
          break;
        case 'where':
          state.where.value = value;
          isNotEmpty(value)
            ? (state.where.isValid = true)
            : (state.where.isValid = false);
          break;
        case 'plane':
          state.plane = value;
          state.cargoes.map((cargo) =>
            isGoodWeight(cargo.weight.value, value)
              ? (cargo.weight.isValid = true)
              : (cargo.weight.isValid = false)
          );

          break;
        case 'date':
          state.date.value = value;
          state.date.isTouched = true;
          isNotWeekend(value)
            ? (state.date.isValid = true)
            : (state.date.isValid = false);
          break;
        case 'files':
          state.files = value;
          break;
        case 'cargoName':
          cargo.name.value = value;
          isNotEmpty(value)
            ? (cargo.name.isValid = true)
            : (cargo.name.isValid = false);
          break;
        case 'cargoWeight':
          cargo.weight.value = value;
          cargo.weight.isTouched = true;
          isGoodWeight(value, state.plane)
            ? (cargo.weight.isValid = true)
            : (cargo.weight.isValid = false);
          break;
        case 'cargoType':
          cargo.type = value;
          break;
        default:
          console.log('Wrong parameter!');
      }
    },

    touch: (state, action) => {
      const [what, id] = action.payload;

      let cargo;
      if (id !== undefined) {
        cargo = state.cargoes.find((cargo) => cargo.id === id);
      }

      switch (what) {
        case 'from':
          state.from.isTouched = true;
          break;
        case 'where':
          state.where.isTouched = true;
          break;
        case 'date':
          state.date.isTouched = true;
          break;
        case 'cargoName':
          cargo.name.isTouched = true;
          break;
        case 'cargoWeight':
          cargo.weight.isTouched = true;
          break;
        default:
          console.log('Wrong parameter!');
      }
    },

    addCargo: (state) => {
      state.cargoes = [...state.cargoes, initialCargo(++id)];
    },

    reset: () => initialState,
  },
});

export const { changeValue, touch, addCargo, reset } = formSlice.actions;

export default formSlice.reducer;
