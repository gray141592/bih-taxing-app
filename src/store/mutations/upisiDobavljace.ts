import { PdvObveznik } from '@/models/pdv';
import { State } from '@/models/store/state';

const upisiDobavljace = (state: State, payload: Array<PdvObveznik>) => {
  state.dobavljaci = payload;
};

export default upisiDobavljace;
