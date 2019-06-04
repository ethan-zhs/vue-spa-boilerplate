import * as actions from './actions';
import * as getters from './getters';
import { mutations } from './mutations';

const state = {
    requesting: false,
    ruleValidate: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
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
