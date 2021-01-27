import {
  PdvObveznik, SlogZaglavlja, SlogIsporuka, SlogNabavke,
} from '../pdv';

export interface State {
    dobavljaci: Array<PdvObveznik>;

    zaglavlje?: SlogZaglavlja;

    tsvIzvjestaj: Array<SlogNabavke | SlogIsporuka>;
}
