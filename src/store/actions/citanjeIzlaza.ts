import moment from 'moment';

import {
  PdvObveznik, RedIzlaza, SlogZaglavlja,
} from '@/models/pdv';

function parsirajRed(red: Array<string>): RedIzlaza {
  return {
    brojFakture: red[0],
    datum: moment(red[1], 'DD.MM.YYYY').toDate(),
    dobavljac: red[2],
    jmbg: red[3],
    ukupno: parseFloat(red[4]),
    bezPdv: parseFloat(red[5]),
    pdv: parseFloat(red[6]),
  };
}
// eslint-disable-next-line
export default (context: any, payload: any) => {
  const { commit, getters } = context;
  const zaglavlje: SlogZaglavlja = {
    vrstaSloga: 1,
    pdvBrojObveznika: payload.pdvBrojObveznika,
    poreskiPeriod: `${payload.godina}${payload.mjesec}`,
    tipDatoteke: '2',
    redniBrojDatoteke: payload.redniBrojDatoteke,
    datumKreiranja: new Date(),
  };
  commit('upisiZaglavlje', zaglavlje);
  const tsvRedovi: Array<string> = payload.tsv.split('\n');
  tsvRedovi.forEach((red) => {
    if (red) {
      const redIzlaza: RedIzlaza = parsirajRed(red.split('\t'));
      const dobavljac: PdvObveznik = getters.dobavljac(redIzlaza.jmbg);
      commit('upisiIzlaz', {
        vrstaSloga: 2,
        poreskiPeriod: `${payload.mjesec}${payload.godina}`,
        tipDokumenta: '01',
        brojFakture: redIzlaza.brojFakture,
        datumFakture: redIzlaza.datum,
        datumPrijema: redIzlaza.datum,
        neispravan: !dobavljac,
        nazivNabavljaca: redIzlaza.dobavljac,
        jmbgNabavljaca: redIzlaza.jmbg,
        nabavljac: dobavljac,
        iznos: {
          ukupno: redIzlaza.ukupno,
          internaFaktura: 0,
          izvoznaIsporuka: 0,
          ostaleIsporukeOslobodjeno: 0,
          osnovicaZaPDVObvezniku: redIzlaza.bezPdv,
          izlazniPDVObvezniku: redIzlaza.pdv,
          osnovicaNeObvavezniku: 0,
          izlazniPDVNeObavezniku: 0,
          izlazniPDVo32: 0,
          izlazniPDVno33: 0,
          izlazniPDVno34: 0,
        },
      });
    }
  });
};
