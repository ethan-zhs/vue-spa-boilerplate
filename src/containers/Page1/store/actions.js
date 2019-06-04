import * as Api from '../../../services/api';


export const getBranchConfig = ({ dispatch, commit }, params) => {
    commit('GET_BRANCH_CONFIG_REQUEST');

    return Api.getBranchConfig(params).then((res) => {
        commit('GET_BRANCH_CONFIG_SUCCESS', res);
    }).catch((err) => {
        commit('GET_BRANCH_CONFIG_FAILURE', err);
    });
};

export const addBranchConfig = ({ dispatch, commit }, params) => {
    commit('ADD_BRANCH_CONFIG_REQUEST');

    return Api.addBranchConfig(params).then((res) => {
        commit('ADD_BRANCH_CONFIG_SUCCESS', res);
    }).catch((err) => {
        commit('ADD_BRANCH_CONFIG_FAILURE', err);
    });
};

export const updateBranchConfig = ({ dispatch, commit }, params) => {
    commit('UPDATE_BRANCH_CONFIG_REQUEST');

    return Api.updateBranchConfig(params).then((res) => {
        commit('UPDATE_BRANCH_CONFIG_SUCCESS', res);
    }).catch((err) => {
        commit('UPDATE_BRANCH_CONFIG_FAILURE', err);
    });
};

export const deleteBranchConfig = ({ dispatch, commit }, params) => {
    commit('DELETE_BRANCH_CONFIG_REQUEST');
    console.log(params);

    return Api.deleteBranchConfig(params).then((res) => {
        commit('DELETE_BRANCH_CONFIG_SUCCESS', res);
    }).catch((err) => {
        commit('DELETE_BRANCH_CONFIG_FAILURE', err);
    });
};
