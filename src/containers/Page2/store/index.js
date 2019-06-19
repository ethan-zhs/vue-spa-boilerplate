import * as actions from './actions';
import * as getters from './getters';
import { mutations, getInitialState } from './mutations';

export default {
    namespaced: true,
    actions,
    getters,
    state: getInitialState(),
    mutations
};
