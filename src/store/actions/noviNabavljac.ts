import fs from 'fs';
import path from 'path';

import config from '@/constants/config';
import { PdvObveznik, SlogIsporuka } from '@/models/pdv';

// eslint-disable-next-line
export default (context: any, nabavljac: PdvObveznik) => {
  const { commit, getters } = context;
  commit('upisiDobavljaca', nabavljac);
  const { dobavljaci, tsvIzvjestaj } = getters;
  const appPath = global.window.localStorage.getItem('appPath') || '';
  fs.writeFileSync(path.join(appPath, config.dobavljaciPath), JSON.stringify(dobavljaci));
  tsvIzvjestaj.forEach((izlaz: SlogIsporuka) => {
    commit('obradiIzlaz', {
      izlaz, getters,
    });
  });
};
