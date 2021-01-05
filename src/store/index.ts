import Vue from 'vue';
import Vuex from 'vuex';

import State from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: new State(),
  getters,
  mutations,
  actions,
});
