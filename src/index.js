import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import VueQuillEditor from 'vue-quill-editor';

import store from './store';
import router from './routes.js';
import App from './App.vue';

import 'iview/dist/styles/iview.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import './statics/css/global.less';

Vue.use(VueRouter);
Vue.use(iView);

// 富文本编辑器
Vue.use(VueQuillEditor, {
    placeholder: '请输入您的协议内容'
});

/* eslint-disable no-new */
new Vue({
    store,
    router,
    el: '#app',
    template: '<App/>',
    components: { App },
});
