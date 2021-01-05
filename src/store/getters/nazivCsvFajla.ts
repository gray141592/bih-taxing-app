import { State } from '@/models/store';

const nazivCsvFajla = (state: State): string => `${state.zaglavlje?.pdvBrojObveznika}_${state.zaglavlje?.poreskiPeriod}_${state.zaglavlje?.tipDatoteke}_${state.zaglavlje?.redniBrojDatoteke}.csv`;

export default nazivCsvFajla;
