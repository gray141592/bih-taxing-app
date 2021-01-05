import { State } from '@/models/store';

const resetuj = (state: State) => {
  state.tsvIzvjestaj = [];
  delete state.zaglavlje?.pdvBrojObveznika;
  delete state.zaglavlje?.vrstaSloga;
};

export default resetuj;
