import rimraf from 'rimraf';

import { cnf } from '../cnf';

export function clean(cb) {
  return rimraf(cnf.dist, cb);
}

export default { clean };
