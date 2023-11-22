<template>
    <div class="header">
        <div class="banner-header">
            <router-link to="/">
                <img class="image-banner" src="https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2023/NCCDinhTiT1131_Header_1263x60.jpg" alt="">
            </router-link>
        </div>
        <div class="nav-header">
            <div class="nav-logo">
                <a href="/">Ứng dụng Quản lý bán sách</a>
            </div>
            <div class="col-sm-10">
                <div class="row">
                    <div class="dropdown col-1 d-flex align-items-center">
                            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-bars me-2"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li class="text-center">
                                    <router-link :to="{ name: 'product' }" class="nav-link">
                                        Trang chủ
                                    </router-link>
                                </li>
                                <hr class="m-2">
                                <li class="text-center">
                                    <router-link :to="{ name: 'product' }" class="nav-link">
                                        Giới thiệu
                                    </router-link>
                                </li>
                                <hr class="m-2">
                                <li class="text-center">
                                    <router-link :to="{ name: 'customer.detail' }" class="nav-link">
                                        Thông tin tài khoản
                                    </router-link>
                                </li>
                                <hr class="m-2">
                                <li class="text-center">
                                    <router-link :to="{ name: 'customer.order' }" class="nav-link">
                                        Thông tin đơn hàng
                                    </router-link>
                                </li>
                            </ul>
                        </div> 
                    <div class="col-7 d-flex align-items-center search">
                        <InputSearch v-model="searchText" @submit="search"/>
                        <ul v-if="searchResults.length > 0" class="list-group mt-2">
                            <li 
                                v-for="(result, index) in searchResults"
                                :key="index"
                                class="list-group-item"
                                @click="gotoDetail(result._id)"
                            >
                                {{ result.TenHH
                                 }}
                            </li>
                        </ul>
                    </div>
                    <div class="col-4">
                        <div class="d-flex justify-content-center">
                            <div class="me-3">
                                <button v-on:click="notifycation()">
                                    <i class="fa-regular fa-bell"></i>
                                    <p class="m-0">Thông báo</p>
                                </button>
                            </div>
                            <div class="me-3">
                                <button v-on:click="shoppingCart()">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    <p class="m-0">Giỏ hàng</p>
                                </button>
                            </div>
                            <div class="me-3">
                                <button v-on:click="login()">
                                    <i class="fa-regular fa-user"></i>
                                    <p class="m-0">{{ isAuthenticated ?  'Đăng xuất' : 'Đăng nhập' }}</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import InputSearch from "@/components/InputSearch.vue";
import ProductService from "../services/product.service";
import AuthService from '../services/AuthService';
export default {
    components: {
        InputSearch,
    },

    data() {
        return {
            searchText: "",
            searchResults: [],
            isAuthenticated: AuthService.isAuthenticated,
        };
    },

    watch: {
        async searchText(newText) {
            this.searchResults = await this.getByName(newText);
            console.log(this.searchResults);
        },
        isAuthenticated(){
            this.checkAuthentication();
        }
    },

    methods: {
        checkAuthentication() {
            AuthService.checkAuthentication();
            this.isAuthenticated = AuthService.isAuthenticated;
        },
        async search() {
            try {
                this.searchResults = await ProductService.getByName(this.searchText);
            } catch (error) {
                console.log(error);
            }
        },

        shoppingCart() {
            this.$router.push({ name: "product.cart" });
        },

       login() {
            AuthService.clearAuthentication();
            this.checkAuthentication();
            this.$router.push({ name: "login" });
        },

        notifycation() {
            alert('Hiện tại không có thông báo nào!');
        },
        async getByName(searchText) {
            try {
                const result = await ProductService.getByName(searchText);
                return result;
            } catch (error) {
                console.log(error);
                return [];
            }
        },
        gotoDetail(id) {
            this.$router.push({ name: "product.detail", params: { id: id } });
            this.searchText = "";
        }, 

    },
    created() {
        this.checkAuthentication();
    },

};
</script>

<style scoped>
    a{
        text-decoration: none;
        color: black;
    }
    button{
        background-color: white;
        border: none;
    }
    .header {
        background-color: white;
    }
    .image-banner{
        width: 100%;
    }
    .nav-header{
        display: flex;
    }

    .nav-logo{
        display: flex;
        align-items: center;
    }
    .list-group {
        position: absolute;
        width: 80%;
        z-index: 1000;
        top: 40px;
        background-color: white;
        border: 1px solid #ccc;
    }

    .list-group-item {
        cursor: pointer;
    }
    .search {
        position: relative;
    }
</style>