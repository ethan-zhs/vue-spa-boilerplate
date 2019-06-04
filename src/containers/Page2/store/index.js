import * as actions from './actions';
import * as getters from './getters';
import { mutations } from './mutations';

const state = {
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
};

export default {
    namespaced: true,
    actions,
    getters,
    state,
    mutations
};
