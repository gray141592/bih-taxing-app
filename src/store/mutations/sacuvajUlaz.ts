import { SlogNabavke } from '@/models/pdv';
import { State } from '@/models/store/state';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sacuvajUlaz = (state: State, payload: any) => {
  const index = state.tsvIzvjestaj?.findIndex((red) => red.brojFakture === payload.brojFakture);

  if (index !== 0 && !index) {
    return;
  }

  const redIzvjestaja: SlogNabavke = {
    ...payload,
    iznos: {
      bezPDV: parseFloat(payload.iznos.bezPDV),
      saPDV: parseFloat(payload.iznos.saPDV),
      pausalnaNaknada: parseFloat(payload.iznos.pausalnaNaknada),
      ulazniPDV: parseFloat(payload.iznos.ulazniPDV),
      ulazniPDVo: parseFloat(payload.iznos.ulazniPDVo),
      ulazniPDVno: parseFloat(payload.iznos.ulazniPDVno),
      ulazniPDVo32: parseFloat(payload.iznos.ulazniPDVo32),
      ulazniPDVno33: parseFloat(payload.iznos.ulazniPDVno33),
      ulazniPDVno34: parseFloat(payload.iznos.ulazniPDVno34),
    },
  };
  // eslint-disable-next-line consistent-return
  return state.tsvIzvjestaj?.splice(index, 1, redIzvjestaja);
};

export default sacuvajUlaz;
