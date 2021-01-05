/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';

import { State } from '@/models/store';

function sumirajKolone(kolone: Array<number>) {
  return kolone.reduce((result: number, add: number) => {
    const parsed = parseInt(add.toFixed(2).replace('.', ''), 10);
    return result + parsed;
  }, 0) / 100;
}

const dobavljaci = (state: State): string|undefined => {
  const csvRedovi: Array<string> = [];
  const { zaglavlje } = state;
  if (!state.tsvIzvjestaj) {
    return;
  }
  const slogZaglavlja = [
    '1',
    zaglavlje?.pdvBrojObveznika,
    zaglavlje?.poreskiPeriod,
    zaglavlje?.tipDatoteke,
    zaglavlje?.redniBrojDatoteke,
    moment().format('YYYY-MM-DD'),
    moment().format('hh:mm:ss'),
  ];
  csvRedovi.push(slogZaglavlja.map((slog) => `"${slog}"`).join(','));
  state.tsvIzvjestaj.forEach((red: any, index: number) => {
    const kolone: Array<string> = [];
    kolone.push('2');
    kolone.push(zaglavlje?.poreskiPeriod || '');
    kolone.push((index + 1).toString());
    kolone.push(red.tipDokumenta);
    kolone.push(red.brojFakture);
    kolone.push(moment(red.datumFakture).format('YYYY-MM-DD'));
    kolone.push(red.datumPrijema ? moment(red.datumPrijema).format('YYYY-MM-DD') : '');
    kolone.push(red.dobavljac.naziv);
    kolone.push(red.dobavljac.sjediste);
    kolone.push(red.dobavljac.pdvBroj || '');
    kolone.push(red.dobavljac.jib || '');
    kolone.push(red.iznos.bezPDV.toFixed(2));
    kolone.push(red.iznos.saPDV.toFixed(2));
    kolone.push(red.iznos.pausalnaNaknada.toFixed(2));
    kolone.push(red.iznos.ulazniPDV.toFixed(2));
    kolone.push(red.iznos.ulazniPDVo.toFixed(2));
    kolone.push(red.iznos.ulazniPDVno.toFixed(2));
    kolone.push(red.iznos.ulazniPDVo32.toFixed(2));
    kolone.push(red.iznos.ulazniPDVno33.toFixed(2));
    kolone.push(red.iznos.ulazniPDVno34.toFixed(2));

    csvRedovi.push(kolone.map((kolona) => `"${kolona}"`).join(','));
  });

  const prateciSlog: Array<string> = [
    '3',
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.bezPDV || 0)).toString(),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.saPDV || 0)).toString(),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.pausalnaNaknada || 0)).toString(),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ulazniPDV || 0)).toString(),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ulazniPDVo || 0)).toString(),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ulazniPDVno || 0)).toString(),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ulazniPDVo32 || 0)).toString(),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ulazniPDVno33 || 0)).toString(),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ulazniPDVno34 || 0)).toString(),
    state.tsvIzvjestaj.length.toString(),
  ];

  csvRedovi.push(prateciSlog.map((slog: string) => `"${slog}"`).join(','));

  // eslint-disable-next-line consistent-return
  return csvRedovi.join('\n');
};

export default dobavljaci;
