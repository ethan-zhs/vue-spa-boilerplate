import * as Api from '../services/api';


export const commonAction = ({ dispatch, commit }, params) => {
    commit('COMMON_ACTION_REQUEST');

    return Api.getCommonData(params).then((res) => {
        commit('COMMON_ACTION_SUCCESS', res);
    }).catch((err) => {
        commit('COMMON_ACTION_FAILURE', err);
    });
};
