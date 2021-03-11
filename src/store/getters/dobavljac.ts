import { State } from '@/models/store/state';
import { PdvObveznik } from '@/models/pdv';

// eslint-disable-next-line max-len
const dobavljac = (state: State) => (id: string): PdvObveznik | undefined => {
  const { dobavljaci } = state;
  if (!id) {
    return;
  }
  // eslint-disable-next-line consistent-return
  return dobavljaci.find((obveznik) => [obveznik.jib, obveznik.pdvBroj].includes(id));
};

export default dobavljac;
