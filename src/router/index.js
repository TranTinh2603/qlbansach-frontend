import { createWebHistory, createRouter } from "vue-router";
import Product from "@/views/ProductView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/HomeView.vue"),
    },
    {
        path: "/notifications",
        name: "notifications",
        component: () => import("@/views/NotificationView.vue"),
    },
    {
        path: "/book/detail/:id",
        name: "book.detail",
        component: () => import("@/views/BookDetailView.vue"),
        props: true
    },
    {
        path: "/book/review/edit/:reviewId",
        name: "book.review.edit",
        component: () => import("@/views/BookReviewEditView.vue"),
        props: true
    },
    {
        path: "/book/review/add/:bookId",
        name: "book.review.add",
        component: () => import("@/views/BookReviewAddView.vue"),
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
        path: "/shop/product/detail/:bookId",
        name: "shop.product.detail",
        component: () => import("@/views/ProductDetailView.vue"),
        props: true
    },
    {
        path: "/shop/cart",
        name: "shop.cart",
        component: () => import("@/views/ProductCartView.vue")
    },
    // {
    //     path: "/category/:categoryId",
    //     name: "product.category",
    //     component: () => import("@/views/ProductCategory.vue"),
    //     props: true
    // },
    // {
    //     path: "/customer/detail",
    //     name: "customer.detail",
    //     component: () => import("@/views/CustomerDetail.vue")
    // },
    // {
    //     path: "/customer/edit/:id",
    //     name: "customer.edit",
    //     component: () => import("@/views/CustomerEdit.vue"),
    //     props: true
    // },
    // {
    //     path: "/customer/order/",
    //     name: "customer.order",
    //     component: () => import("@/views/CustomerOrder.vue")
    // },
    // {
    //     path: "/customer/order/detail/:msdh",
    //     name: "customer.order.detail",
    //     component: () => import("@/views/OrderDetailView.vue"),
    //     props: true
    // },
    {
        path: "/community/group/",
        name: "community.group",
        component: () => import("@/views/GroupView.vue"),
    },
    {
        path: "/community/group/add",
        name: "community.group.add",
        component: () => import("@/views/GroupAddView.vue"),
    },
    {
        path: "/community/group/detail/:groupId",
        name: "community.group.detail",
        component: () => import("@/views/GroupDetailView.vue"),
        props: true
    },
    {
        path: "/community/group/bookshelf/:groupId",
        name: "community.group.bookshelf",
        component: () => import("@/views/GroupBookshelfView.vue"),
        props: true
    },
    {
        path: "/community/group/discussion/:groupId",
        name: "community.group.discussion",
        component: () => import("@/views/GroupDiscussionView.vue"),
        props: true
    },
    {
        path: "/community/group/discussion/folder/add/:groupId",
        name: "community.group.discussion.folder.add",
        component: () => import("@/views/GroupDiscussionFolderAddView.vue"),
        props: true
    },
    {
        path: "/community/group/discussion/folder/topic/:groupId&:folderId",
        name: "community.group.discussion.folder.topic",
        component: () => import("@/views/GroupDiscussionTopicView.vue"),
        props: true
    },
    {
        path: "/community/group/discussion/folder/topic/add/:groupId&:folderId",
        name: "community.group.discussion.folder.topic.add",
        component: () => import("@/views/GroupDiscussionTopicAddView.vue"),
        props: true
    },
    {
        path: "/community/group/discussion/folder/topic/detail/:groupId&:folderId&:topicId",
        name: "community.group.discussion.folder.topic.detail",
        component: () => import("@/views/GroupDiscussionTopicDetailView.vue"),
        props: true
    },
    {
        path: "/community/group/member/:groupId",
        name: "community.group.member",
        component: () => import("@/views/GroupMemberView.vue"),
        props: true
    },
    {
        path: "/community/group/send-invite/:groupId",
        name: "community.group.send-invite",
        component: () => import("@/views/GroupSendInviteView.vue"),
        props: true
    },
    {
        path: "/community/group/setting/:groupId",
        name: "community.group.setting",
        component: () => import("@/views/GroupSettingView.vue"),
        props: true
    },
    {
        path: "/community/quote/",
        name: "community.quote",
        component: () => import("@/views/QuoteView.vue"),
    },
    {
        path: "/community/quote/add",
        name: "community.quote.add",
        component: () => import("@/views/QuoteAddView.vue"),
    },
    {
        path: "/community/quote/my-quote",
        name: "community.quote.my-quote",
        component: () => import("@/views/MyQuoteView.vue"),
    },
    {
        path: "/community/quote/liked-quote",
        name: "community.quote.liked-quote",
        component: () => import("@/views/LikedQuoteView.vue"),
    },
    {
        path: "/community/quote/my-quote/edit/:quoteId",
        name: "community.quote.my-quote.edit",
        component: () => import("@/views/MyQuoteEditView.vue"),
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