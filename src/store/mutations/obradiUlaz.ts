import { State } from '@/models/store';

const obradiUlaz = (state: State, payload: any) => {
  const { ulaz, getters } = payload;
  const dobavljac = getters.dobavljac(ulaz.jmbgDobavljaca);

  if (!dobavljac) {
    return;
  }
  const index = state.tsvIzvjestaj?.findIndex((red) => red === ulaz);

  if (index !== 0 && !index) {
    return;
  }
  delete ulaz.neispravan;
  delete ulaz.nazivDobavljaca;
  delete ulaz.jmbgDobavljaca;
  ulaz.dobavljac = dobavljac;
  // eslint-disable-next-line consistent-return
  return state.tsvIzvjestaj?.splice(index, 1, ulaz);
};

export default obradiUlaz;
