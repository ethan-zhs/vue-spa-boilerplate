import * as actions from './actions';
import * as getters from './getters';
import { mutations } from './mutations';

const state = {
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
};

export default {
    namespaced: true,
    actions,
    getters,
    state,
    mutations
};
