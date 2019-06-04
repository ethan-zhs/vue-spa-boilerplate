import * as Api from '../../../services/api';


export const getPrize = ({ dispatch, commit }) => {
    commit('GET_PRIZE_REQUEST');

    Api.getPrize({}).then((res) => {
        commit('GET_PRIZE_SUCCESS', res);
    }).catch((err) => {
        commit('GET_PRIZE_FAILURE', err);
    });
};
