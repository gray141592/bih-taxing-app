import { SlogZaglavlja } from '@/models/pdv';
import { State } from '@/models/store/state';

const upisiZaglavlje = (state: State, payload: SlogZaglavlja) => {
  state.zaglavlje = payload;
};

export default upisiZaglavlje;
