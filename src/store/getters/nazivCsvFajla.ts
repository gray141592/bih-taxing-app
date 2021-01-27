import { State } from '@/models/store/state';

const nazivCsvFajla = (state: State) => (tipDatoteke: string) => {
  const poljaNazivaFajla: Array<string> = [];
  poljaNazivaFajla.push(state.zaglavlje?.pdvBrojObveznika || '');
  poljaNazivaFajla.push(state.zaglavlje?.poreskiPeriod || '');
  poljaNazivaFajla.push(tipDatoteke);
  poljaNazivaFajla.push(`0${state.zaglavlje?.redniBrojDatoteke || ''}`);
  return `${poljaNazivaFajla.join('_')}.csv`;
};

export default nazivCsvFajla;
