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
    // {
    //     path: '/satuan/create',
    //     name: 'satuan.create',
    //     component: () => import("../views/satuan/Create.vue")
    // },
    // {
    //     path: '/satuan/edit/:id',
    //     name: 'satuan.edit',
    //     component: () => import("../views/satuan/Edit.vue")
    // }
    {
        path: '/suplayer',
        name: 'suplayer.index',
        component: () => import("../views/suplayer/Index.vue")
    },    
    {
        path: '/aset',
        name: 'aset.index',
        component: () => import("../views/aset/Index.vue")
    },    
    {
        path: '/bahan-baku',
        name: 'bahanBaku.index',
        component: () => import("../views/bahan_baku/Index.vue")
    },
    {
        path: '/bahan-baku/:id',
        name: 'bahanBaku.detail',
        component: () => import("../views/bahan_baku/Detail.vue")
    },
    {
        path: '/pemesanan-bahan-baku',
        name: 'bahanBaku.order',
        component: () => import("../views/bahan_baku/Order.vue")
    },
    {
        path: '/list-pemesanan-bahan-baku',
        name: 'bahanBaku.listOrder',
        component: () => import("../views/bahan_baku/ListOrder.vue")
    },
    {
        path: '/pemesanan-bahan-baku-detail/:id',
        // path: '/pemesanan-bahan-baku-detail',
        name: 'bahanBaku.orderDetail',
        component: () => import("../views/bahan_baku/DetailOrder.vue")
    },
    {
        path: '/resep',
        name: 'resep.index',
        component: () => import("../views/resep/Index.vue")
    },
    {
        path: '/resep-detail/:id',
        name: 'resep.detail',
        component: () => import("../views/resep/Detail.vue")
    },
    {
        path: '/produk',
        name: 'produk.index',
        component: () => import("../views/produk/Index.vue")
    },
    {
        path: '/harga-produk/:id',
        name: 'produk.harga',
        component: () => import("../views/produk/HargaProduk.vue")
    },
    {
        path: '/produksi',
        name: 'produksi.index',
        component: () => import("../views/produksi/Index.vue")
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;