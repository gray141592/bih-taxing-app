import { SlogNabavke } from '@/models/pdv';
import { State } from '@/models/store/state';

const upisiUlaz = (state: State, payload: SlogNabavke) => {
  if (state.tsvIzvjestaj) {
    state.tsvIzvjestaj.push(payload);
  } else {
    state.tsvIzvjestaj = [payload];
  }
};

export default upisiUlaz;
