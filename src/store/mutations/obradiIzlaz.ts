import { State } from '@/models/store/state';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const obradiIzlaz = (state: State, payload: any) => {
  const { izlaz, getters } = payload;
  const nabavljac = getters.dobavljac(izlaz.jmbgDobavljaca);

  if (!nabavljac) {
    return;
  }
  const index = state.tsvIzvjestaj?.findIndex((red) => red === izlaz);

  if (index !== 0 && !index) {
    return;
  }
  delete izlaz.neispravan;
  delete izlaz.nazivDobavljaca;
  delete izlaz.jmbgDobavljaca;
  izlaz.nabavljac = nabavljac;
  // eslint-disable-next-line consistent-return
  return state.tsvIzvjestaj?.splice(index, 1, izlaz);
};

export default obradiIzlaz;
