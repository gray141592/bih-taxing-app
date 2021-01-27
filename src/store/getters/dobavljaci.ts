import { State } from '@/models/store/state';
import { PdvObveznik } from '@/models/pdv';

const dobavljaci = (state: State): Array<PdvObveznik> => state.dobavljaci;

export default dobavljaci;
