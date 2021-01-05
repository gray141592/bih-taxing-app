import {
  PdvObveznik, RedUlaza, SlogZaglavlja,
} from '@/models/pdv';

function parsirajDatum(datum: string): Date {
  const [dan, mjesec, godina] = datum.split('.');
  const result: Date = new Date();
  result.setFullYear(parseInt(godina, 10), parseInt(mjesec, 10), parseInt(dan, 10));
  return result;
}

function parsirajRed(red: Array<string>): RedUlaza {
  return {
    brojFakture: red[0],
    datum: parsirajDatum(red[1]),
    dobavljac: red[2],
    jmbg: red[3],
    bezPdv: parseFloat(red[4]),
    ukupno: parseFloat(red[5]),
    pausal: parseFloat(red[6]),
    ulazPDV: parseFloat(red[7]),
    pdv: parseFloat(red[8]),
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
      const redUlaza: RedUlaza = parsirajRed(red.split('\t'));
      const dobavljac: PdvObveznik = getters.dobavljac(redUlaza.jmbg);
      commit('upisiUlaz', {
        vrstaSloga: 2,
        poreskiPeriod: `${payload.mjesec}${payload.godina}`,
        tipDokumenta: '01',
        brojFakture: redUlaza.brojFakture,
        datumFakture: redUlaza.datum,
        datumPrijema: redUlaza.datum,
        neispravan: !dobavljac,
        nazivDobavljaca: redUlaza.dobavljac,
        jmbgDobavljaca: redUlaza.jmbg,
        dobavljac,
        iznos: {
          bezPDV: redUlaza.bezPdv,
          saPDV: redUlaza.ukupno,
          pausalnaNaknada: 0,
          ulazniPDV: redUlaza.pdv,
          ulazniPDVo: redUlaza.pdv,
          ulazniPDVno: 0,
          ulazniPDVo32: redUlaza.pdv,
          ulazniPDVno33: 0,
          ulazniPDVno34: 0,
        },
      });
    }
  });
};
