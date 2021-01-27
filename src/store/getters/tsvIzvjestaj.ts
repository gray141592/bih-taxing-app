import { State } from '@/models/store/state';
import { SlogNabavke, SlogIsporuka } from '@/models/pdv';

const tsvIzvjestaj = (state: State): Array<SlogNabavke | SlogIsporuka> => state.tsvIzvjestaj || [];

export default tsvIzvjestaj;
