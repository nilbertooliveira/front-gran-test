import {createRouter, createWebHistory} from 'vue-router';
import Login from '../Components/Login.vue';
import Product from "../Pages/Product.vue";
import Category from "../Pages/Category.vue";
import Home from "../Pages/Home.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/category',
        name: 'category',
        component: Category,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/product',
        name: 'product',
        component: Product,
        meta: {
            requiresAuth: true
        },
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = await localStorage.getItem('token');
        if (token) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;