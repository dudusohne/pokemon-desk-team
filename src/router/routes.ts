const routes = [
    { 
        path: '/',
        component: () => import('./pages/Home/Home.vue'),
        exact: true
    },
    {
        path: '/about',
        component: () => import('./pages/About/About.vue'),
        exact: true
    }
]