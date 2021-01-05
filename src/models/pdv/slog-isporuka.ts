import { PdvObveznik } from './pdv-obveznik';

export interface SlogIsporuka {
    vrstaSloga: number;
    poreskiPeriod: string;
    redniBroj: string;
    tipDokumenta: string;
    brojFakture: string;
    datumFakture: Date;
    kupac: PdvObveznik;
    iznos: {
        ukupno: number;
        internaFaktura: number;
        izvoznaIsporuka: number;
        ostaleIsporukeOslobodjeno: number;
        osnovicaZaPDVObvezniku: number;
        izlazniPDVObvezniku: number;
        osnovicaNeObvavezniku: number;
        izlazniPDVNeObavezniku: number;
        izlazniPDVo32: number;
        izlazniPDVno33: number;
        izlazniPDVno34: number;
    };
}
