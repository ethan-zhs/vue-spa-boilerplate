import VueRouter from 'vue-router';

const routes = [{
    path: '/',
    redirect: '/login'
}, 
{
    path: '/login',
    component: () => import('./containers/LoginPage/index.vue')
},
{
    path: '/layout',
    component: () => import('./containers/Layout/Layout.vue'),
    children: [     
        {
            path: '/page1',
            component: () => import('./containers/Page1/index.vue'),
            meta: {
                auth: true,
                type: 'first'
            }
        },
        {
            path: '/page2',
            component: () => import('./containers/Page2/index.vue'),
            meta: {
                auth: true,
                type: 'first'
            }
        }
    ]
}];

export default new VueRouter({
    mode: 'history', 
    routes
});
