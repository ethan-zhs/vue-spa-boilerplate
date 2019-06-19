export const getInitialState = () => ({
    requesting: false,
    branchConfig: {},
    ruleValidate: {
        remark: [
            { required: true, message: '请输入应用 / 县名', trigger: 'blur' }
        ],
        emailPrefix: [
            { required: true, message: '请输入邮件前缀', trigger: 'blur' }
        ],
        enableUserPoint: [
            { required: true, message: '请选择是否用户积分', trigger: 'blur' }
        ],
        showWeather: [
            { required: true, message: '请选择是否支持天气', trigger: 'blur' }
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
