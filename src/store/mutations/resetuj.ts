import { State } from '@/models/store/state';

const resetuj = (state: State) => {
  state.tsvIzvjestaj = [];
  delete state.zaglavlje?.pdvBrojObveznika;
  delete state.zaglavlje?.vrstaSloga;
};

export default resetuj;
