import { createWebHistory, createRouter } from "vue-router";
import Product from "@/views/ProductView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/HomeView.vue"),
    },
    {
        path: "/book/detail/:id",
        name: "book.detail",
        component: () => import("@/views/BookDetailView.vue"),
        props: true
    },
    {
        path: "/author/detail/:name",
        name: "author.detail",
        component: () => import("@/views/AuthorDetailView.vue"),
        props: true
    },
    {
        path: "/my-books",
        name: "book.my-books",
        component: () => import("@/views/MyBooksView.vue"),
    },
    {
        path: "/friends",
        name: "friend",
        component: () => import("@/views/MyFriendsView.vue"),
    },
    {
        path: "/friends/find/:searchText",
        name: "friend.find",
        component: () => import("@/views/FindFriendView.vue"),
        props: true
    },
    {
        path: "/user/profile",
        name: "user.profile",
        component: () => import("@/views/MyProfileView.vue"),
    },
    {
        path: "/user/messages",
        name: "user.messages",
        component: () => import("@/views/MessageView.vue"),
    },
    {
        path: "/user/profile/edit",
        name: "user.profile.edit",
        component: () => import("@/views/EditProfileView.vue"),
    },
    {
        path: "/shop",
        name: "shop",
        component: Product,
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/LoginView.vue"),
    },
    {
        path: "/detail-shop/:id",
        name: "product.detail-shop",
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
router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    next();
});
export default router;