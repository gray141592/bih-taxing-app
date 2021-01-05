import fs from 'fs';
import path from 'path';

import config from '@/constants/config';
import { PdvObveznik, SlogNabavke } from '@/models/pdv';

// eslint-disable-next-line
export default (context: any, dobavljac: PdvObveznik) => {
  const { commit, getters } = context;
  commit('upisiDobavljaca', dobavljac);
  const { dobavljaci, tsvIzvjestaj } = getters;
  const appPath = global.window.localStorage.getItem('appPath') || '';
  fs.writeFileSync(path.join(appPath, config.dobavljaciPath), JSON.stringify(dobavljaci));
  tsvIzvjestaj.forEach((ulaz: SlogNabavke) => {
    commit('obradiUlaz', {
      ulaz, getters,
    });
  });
};
