import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import { mutations } from './mutations';

import LoginPage from '../containers/LoginPage/store';
import Page1 from '../containers/Page1/store';
import Page2 from '../containers/Page2/store';

Vue.use(Vuex);

const state = {
    requesting: false,
    commonData: {}
};

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,

    modules: {
        LoginPage,
        Page1,
        Page2
    }
});
