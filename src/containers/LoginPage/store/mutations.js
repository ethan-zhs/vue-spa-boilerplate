export const mutations = {

    GET_PRIZE_REQUEST(state) {
        state.requesting = true;
    },

    GET_PRIZE_SUCCESS(state, res) {
        state.requesting = false;
    },

    GET_PRIZE_FAILURE(state, err) {
        state.requesting = false;
    }
};
