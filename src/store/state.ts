import {
  PdvObveznik, SlogZaglavlja, SlogNabavke, SlogIsporuka,
} from '@/models/pdv';

export default class State {
    dobavljaci: Array<PdvObveznik> = [];

    zaglavlje!: SlogZaglavlja;

    tsvIzvjestaj: Array<SlogNabavke | SlogIsporuka> = [];
}
