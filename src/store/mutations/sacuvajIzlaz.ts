import { SlogIsporuka } from '@/models/pdv';
import { State } from '@/models/store/state';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sacuvajIzlaz = (state: State, payload: any) => {
  const index = state.tsvIzvjestaj?.findIndex((red) => red.brojFakture === payload.brojFakture);

  if (index !== 0 && !index) {
    return;
  }

  const redIzvjestaja: SlogIsporuka = {
    ...payload,
    iznos: {
      ukupno: parseFloat(payload.iznos.ukupno),
      internaFaktura: parseFloat(payload.iznos.internaFaktura),
      izvoznaIsporuka: parseFloat(payload.iznos.izvoznaIsporuka),
      ostaleIsporukeOslobodjeno: parseFloat(payload.iznos.ostaleIsporukeOslobodjeno),
      osnovicaZaPDVObvezniku: parseFloat(payload.iznos.osnovicaZaPDVObvezniku),
      izlazniPDVObvezniku: parseFloat(payload.iznos.izlazniPDVObvezniku),
      osnovicaNeObvavezniku: parseFloat(payload.iznos.osnovicaNeObvavezniku),
      izlazniPDVNeObavezniku: parseFloat(payload.iznos.izlazniPDVNeObavezniku),
      izlazniPDVo32: parseFloat(payload.iznos.izlazniPDVo32),
      izlazniPDVno33: parseFloat(payload.iznos.izlazniPDVno33),
      izlazniPDVno34: parseFloat(payload.iznos.izlazniPDVno34),
    },
  };
  // eslint-disable-next-line consistent-return
  return state.tsvIzvjestaj?.splice(index, 1, redIzvjestaja);
};

export default sacuvajIzlaz;
