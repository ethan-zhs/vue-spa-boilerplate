import * as Api from '../../../services/api';


export const getPlatform = ({ dispatch, commit }, params) => {
    commit('GET_BRANCH_CONFIG_REQUEST');

    return Api.getPlatform(params).then((res) => {
        commit('GET_BRANCH_CONFIG_SUCCESS', res);
    }).catch((err) => {
        commit('GET_BRANCH_CONFIG_FAILURE', err);
    });
};

export const addPlatform = ({ dispatch, commit }, params) => {
    commit('ADD_PLATFORM_REQUEST');

    return Api.addPlatform(params).then((res) => {
        commit('ADD_PLATFORM_SUCCESS', res);
    }).catch((err) => {
        commit('ADD_PLATFORM_FAILURE', err);
    });
};

export const updatePlatform = ({ dispatch, commit }, params) => {
    commit('UPDATE_PLATFORM_REQUEST');

    return Api.updatePlatform(params).then((res) => {
        commit('UPDATE_PLATFORM_SUCCESS', res);
    }).catch((err) => {
        commit('UPDATE_PLATFORM_FAILURE', err);
    });
};

export const deletePlatform = ({ dispatch, commit }, params) => {
    commit('DELETE_PLATFORM_REQUEST');
    console.log(params);

    return Api.deletePlatform(params).then((res) => {
        commit('DELETE_PLATFORM_SUCCESS', res);
    }).catch((err) => {
        commit('DELETE_PLATFORM_FAILURE', err);
    });
};

export const clearPage = ({ dispatch, commit }, params) => {
    commit('CLEAR_PAGE');
};
