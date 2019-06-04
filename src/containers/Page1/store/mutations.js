export const mutations = {

    GET_BRANCH_CONFIG_REQUEST(state) {
        state.requesting = true;
    },

    GET_BRANCH_CONFIG_SUCCESS(state, res) {
        state.branchConfig = res || {};
        state.requesting = false;
    },

    GET_BRANCH_CONFIG_FAILURE(state, err) {
        state.requesting = false;
    }
};
