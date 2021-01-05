import { State } from '@/models/store';
import { PdvObveznik } from '@/models/pdv';

// eslint-disable-next-line max-len
const dobavljac = (state: State) => (id: string): PdvObveznik | undefined => {
  const { dobavljaci } = state;
  const nasao = dobavljaci.find((obveznik) => [obveznik.jib, obveznik.pdvBroj].includes(id));
  return nasao;
};

export default dobavljac;
