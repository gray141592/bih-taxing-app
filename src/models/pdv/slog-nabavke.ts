import { PdvObveznik } from './pdv-obveznik';

export interface SlogNabavke {
    vrstaSloga: number;
    poreskiPeriod: string;
    tipDokumenta: string;
    brojFakture: string;
    datumFakture: Date;
    datumPrijema: Date;
    dobavljac: PdvObveznik;
    iznos: {
        bezPDV: number;
        saPDV: number;
        pausalnaNaknada: number;
        ulazniPDV: number;
        ulazniPDVo: number;
        ulazniPDVno: number;
        ulazniPDVo32: number;
        ulazniPDVno33: number;
        ulazniPDVno34: number;
    };
}
