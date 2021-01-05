import { PdvObveznik } from '@/models/pdv';
import { State } from '@/models/store';

const upisiDobavljaca = (state: State, payload: PdvObveznik) => {
  state.dobavljaci.push(payload);
};

export default upisiDobavljaca;
