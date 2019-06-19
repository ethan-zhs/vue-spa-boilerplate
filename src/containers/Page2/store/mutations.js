export const getInitialState = () => ({
    requesting: false,
    branchConfig: {},
    ruleValidate: {
        description: [
            { required: true, message: '请输入应用 / 县名', trigger: 'blur' }
        ],
        type: [
            { required: true, message: '请选择类型', trigger: 'blur' }
        ]
    }
});

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
    },

    CLEAR_PAGE(state) {
        state = Object.assign(state, getInitialState());
    }
};
