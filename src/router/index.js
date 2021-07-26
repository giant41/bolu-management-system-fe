import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home.index',
        component: () => import("../views/Home.vue")
    },
    {
        path: '/dashboard',
        name: 'dashboard.index',
        component: () => import("../views/dashboard/Index.vue")
    },
    {
        path: '/login',
        name: 'auth.login',
        component: () => import("../views/auth/Login.vue")
    },
    {
        path: '/register',
        name: 'auth.register',
        component: () => import("../views/auth/Register.vue")
    },
    {
        path: '/satuan',
        name: 'satuan.index',
        component: () => import("../views/satuan/Index.vue")
    },
    {
        path: '/satuan/create',
        name: 'satuan.create',
        component: () => import("../views/satuan/Create.vue")
    },
    {
        path: '/satuan/edit/:id',
        name: 'satuan.edit',
        component: () => import("../views/satuan/Edit.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;