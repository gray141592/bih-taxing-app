import { SlogZaglavlja } from '@/models/pdv';
import { State } from '@/models/store';

const upisiZaglavlje = (state: State, payload: SlogZaglavlja) => {
  state.zaglavlje = payload;
};

export default upisiZaglavlje;
