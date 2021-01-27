import { SlogIsporuka } from '@/models/pdv';
import { State } from '@/models/store/state';

const upisiIzlaz = (state: State, payload: SlogIsporuka) => {
  if (state.tsvIzvjestaj) {
    state.tsvIzvjestaj.push(payload);
  } else {
    state.tsvIzvjestaj = [payload];
  }
};

export default upisiIzlaz;
