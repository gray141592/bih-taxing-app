import { existsSync, readFileSync } from 'fs';
import path from 'path';

import config from '@/constants/config';

// eslint-disable-next-line
export default (context: any) => {
  try {
    const { commit } = context;
    const appPath = global.window.localStorage.getItem('appPath') || '';
    if (existsSync(path.join(appPath, config.dobavljaciPath))) {
      const dobavljaci = JSON.parse(readFileSync(path.join(appPath, config.dobavljaciPath), 'utf8'));
      commit('upisiDobavljace', dobavljaci);
    }
  } catch (error) {
    console.error(error);
  }
};
