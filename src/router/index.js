import { createWebHistory, createRouter } from "vue-router";
import Product from "@/views/ProductView.vue";
// import ProductDetail from "@/views/ProductDetailView.vue";

const routes = [
    {
        path: "/",
        name: "product",
        component: Product,
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/LoginView.vue"),
    },
    {
        path: "/detail/:id",
        name: "product.detail",
        component: () => import("@/views/ProductDetailView.vue"),
        props: true
    },
    {
        path: "/cart-shopping",
        name: "product.cart",
        component: () => import("@/views/ProductCartView.vue")
    },
    {
        path: "/category/:categoryId",
        name: "product.category",
        component: () => import("@/views/ProductCategory.vue"),
        props: true
    },
    {
        path: "/customer/detail",
        name: "customer.detail",
        component: () => import("@/views/CustomerDetail.vue")
    },
    {
        path: "/customer/edit/:id",
        name: "customer.edit",
        component: () => import("@/views/CustomerEdit.vue"),
        props: true
    },
    {
        path: "/customer/order/",
        name: "customer.order",
        component: () => import("@/views/CustomerOrder.vue")
    },
        {
        path: "/customer/order/detail/:msdh",
        name: "customer.order.detail",
        component: () => import("@/views/OrderDetailView.vue"),
        props: true
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});
router.beforeEach((to, from ,next) => {
    window.scrollTo(0, 0);
    next();
});
export default router;