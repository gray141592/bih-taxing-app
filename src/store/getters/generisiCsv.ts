/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';

import { State } from '@/models/store/state';

function sumirajKolone(kolone: Array<number>) {
  return kolone.reduce((result: number, add: number) => {
    const parsed = parseInt(add.toFixed(2).replace('.', ''), 10);
    return result + parsed;
  }, 0) / 100;
}

function obradiUlaz(red: any, index: number, zaglavlje: any) {
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
  return kolone;
}

function obradiIzlaz(red: any, index: number, zaglavlje: any) {
  const kolone: Array<string> = [];
  kolone.push('2');
  kolone.push(zaglavlje?.poreskiPeriod || '');
  kolone.push((index + 1).toString());
  kolone.push(red.tipDokumenta);
  kolone.push(red.brojFakture);
  kolone.push(moment(red.datumFakture).format('YYYY-MM-DD'));
  kolone.push(red.nabavljac.naziv);
  kolone.push(red.nabavljac.sjediste);
  kolone.push(red.nabavljac.pdvBroj || '');
  kolone.push(red.nabavljac.jib || '');
  kolone.push(red.iznos.ukupno.toFixed(2));
  kolone.push(red.iznos.internaFaktura.toFixed(2));
  kolone.push(red.iznos.izvoznaIsporuka.toFixed(2));
  kolone.push(red.iznos.ostaleIsporukeOslobodjeno.toFixed(2));
  kolone.push(red.iznos.osnovicaZaPDVObvezniku.toFixed(2));
  kolone.push(red.iznos.izlazniPDVObvezniku.toFixed(2));
  kolone.push(red.iznos.osnovicaNeObvavezniku.toFixed(2));
  kolone.push(red.iznos.izlazniPDVNeObavezniku.toFixed(2));
  kolone.push(red.iznos.izlazniPDVo32.toFixed(2));
  kolone.push(red.iznos.izlazniPDVno33.toFixed(2));
  kolone.push(red.iznos.izlazniPDVno34.toFixed(2));
  return kolone;
}

function generisiPrateciSlog(state: State, tipDatoteke: string) {
  if (tipDatoteke === '2') {
    return [
      '3',
      sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ukupno || 0)).toFixed(2),
      sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.internaFaktura || 0)).toFixed(2),
      sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.izvoznaIsporuka || 0)).toFixed(2),
      sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ostaleIsporukeOslobodjeno || 0)).toFixed(2),
      sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.osnovicaZaPDVObvezniku || 0)).toFixed(2),
      sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.izlazniPDVObvezniku || 0)).toFixed(2),
      sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.osnovicaNeObvavezniku || 0)).toFixed(2),
      sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.izlazniPDVNeObavezniku || 0)).toFixed(2),
      sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.izlazniPDVo32 || 0)).toFixed(2),
      sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.izlazniPDVno33 || 0)).toFixed(2),
      sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.izlazniPDVno34 || 0)).toFixed(2),
      state.tsvIzvjestaj.length.toString(),
    ];
  }
  return [
    '3',
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.bezPDV || 0)).toFixed(2),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.saPDV || 0)).toFixed(2),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.pausalnaNaknada || 0)).toFixed(2),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ulazniPDV || 0)).toFixed(2),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ulazniPDVo || 0)).toFixed(2),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ulazniPDVno || 0)).toFixed(2),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ulazniPDVo32 || 0)).toFixed(2),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ulazniPDVno33 || 0)).toFixed(2),
    sumirajKolone(state.tsvIzvjestaj.map((red: any) => red.iznos.ulazniPDVno34 || 0)).toFixed(2),
    state.tsvIzvjestaj.length.toString(),
  ];
}
const generisiCsv = (state: State): string|undefined => {
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
    `0${zaglavlje?.redniBrojDatoteke}` || '',
    moment().format('YYYY-MM-DD'),
    moment().format('hh:mm:ss'),
  ];
  csvRedovi.push(slogZaglavlja.join(';'));
  state.tsvIzvjestaj.forEach((red: any, index: number) => {
    const kolone: Array<string> = zaglavlje?.tipDatoteke === '1' ? obradiUlaz(red, index, zaglavlje) : obradiIzlaz(red, index, zaglavlje);
    csvRedovi.push(kolone.join(';'));
  });

  const prateciSlog: Array<string> = generisiPrateciSlog(state, zaglavlje?.tipDatoteke || '1');

  csvRedovi.push(prateciSlog.join(';'));

  // eslint-disable-next-line consistent-return
  return csvRedovi.join('\n');
};

export default generisiCsv;
