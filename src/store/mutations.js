export const mutations = {

    COMMON_ACTION_REQUEST(state) {
        state.requesting = true;
    },

    COMMON_ACTION_SUCCESS(state, res) {
        state.commonData = res || {};
        state.requesting = false;
    },

    COMMON_ACTION_FAILURE(state, err) {
        state.requesting = false;
    }
};
