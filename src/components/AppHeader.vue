<template>
    <!-- <div class="header">
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
                                <div class="text-center">
                                    <router-link :to="{ name: 'product' }" class="nav-link">
                                        Trang chủ
                                    </router-link>
                                </div>
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
    </div> -->


    <div class="header">
        <div class="container">
            <div>
                <h3>Book</h3>
                <p>Social Network</p>
            </div>
            <div class="navigation">
                    <router-link class="nav-link" to="/">
                        <i id="icon-nav" class="fa-solid fa-house"></i> 
                        <p>Home</p>
                    </router-link>
                    <router-link class="nav-link" to="/my-books">
                        <i id="icon-nav" class="fa-solid fa-book-open"></i>
                        <p>My Books</p>
                    </router-link>
                    <!-- <router-link class="nav-link" to="/shop">
                        <i id="icon-nav" class="fa-solid fa-shop"></i>
                        <p>Shop</p>
                    </router-link> -->
                
                <div class="dropdown" @click="toggleDropdown('categorys')">
                    <p class="dropdown-toggle">Categorys <i class="fa-solid fa-sort-down" id="icon-down"></i></p>
                    <ul v-if="activeDropdown === 'categorys'" class="dropdown-menu">
                        <li><router-link to="/categorys/children">Children</router-link></li>
                        <li><router-link to="/categorys/history">History</router-link></li>
                        <li><router-link to="/categorys/novel">Novel</router-link></li>
                        <li><router-link to="/categorys/short-story">Short Story</router-link></li>
                        <li><router-link to="/categorys/business">Business</router-link></li>
                        <li><router-link to="/categorys/science-fiction">Science Fiction</router-link></li>
                        <li><router-link to="/categorys/educational">Educational</router-link></li>
                    </ul>
                </div>
                <div class="dropdown" @click="toggleDropdown('community')">
                    <p class="dropdown-toggle">Community <i class="fa-solid fa-sort-down" id="icon-down"></i></p>
                    <ul v-if="activeDropdown === 'community'" class="dropdown-menu">
                        <li><router-link to="/community/group">Groups</router-link></li>
                        <!-- <li><router-link to="/community/discussions">Discussions</router-link></li> -->
                        <li><router-link to="/community/quote">Quotes</router-link></li>
                        <!-- <li><router-link to="/community/ask-the-author">Ask the Author</router-link></li>
                        <li><router-link to="/community/people">People</router-link></li> -->
                    </ul>
                </div>
            </div>
            <div class="search">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Tìm kiếm">
            </div>
            <div class="action">
                <div class="dropdown">
                    <div class="container-action-content" @click="toggleDropdown('notification')">
                        <i class="fa-solid fa-bell"></i>
                    </div>
                    <div v-if="activeDropdown === 'notification'" class="notification">
                            <h5>NOTIFICATIONS</h5>
                            <p>View all notifications</p>
                            <hr>
                            <div class="content">
                                <div class="avatar"></div>
                                <div class="text">
                                    <strong>Trần Tính</strong>
                                    <span> liked</span>
                                    <span> your review of Mắt Biếc</span>
                                </div>
                                <div class="status"></div>
                            </div>
                            <hr>
                            <div class="content">
                                <div class="avatar"></div>
                                <div class="text">
                                    <strong>Trần Tính</strong>
                                    <span> liked</span>
                                    <span> your review of Mắt Biếc</span>
                                </div>
                                <div class="status"></div>
                            </div>
                        </div>
                </div>
                <div class="container-action-content">
                    <i class="fa-solid fa-comments"></i>
                </div>
                <div class="dropdown">
                    <div class="container-action-content" @click="toggleDropdown('message')">
                        <i class="fa-solid fa-comment"></i>
                    </div>
                    <div v-if="activeDropdown === 'message'" class="message">
                        <div class="header-message">
                            <h5>MESSAGE</h5>
                            <router-link to="/user/messages"><i class="fa-solid fa-arrow-up-right-from-square"></i></router-link>
                        </div>
                        <div class="search-message">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="Tìm kiếm">
                        </div>
                        <hr>
                        <div class="content">
                            <div class="avatar"></div>
                            <div class="text">
                                <strong>Trần Tính</strong>
                                <span> liked</span>
                                <span> your review of Mắt Biếc</span>
                            </div>
                            <div class="status"></div>
                        </div>
                        <hr>
                        <div class="content">
                            <div class="avatar"></div>
                            <div class="text">
                                <strong>Trần Tính</strong>
                                <span> liked</span>
                                <span> your review of Mắt Biếc</span>
                            </div>
                            <div class="status"></div>
                        </div>
                    </div>
                </div>
                
                <router-link class="container-action-content" to="/friends">
                    <i class="fa-solid fa-users"></i>
                </router-link>
           
                <div class="dropdown">
                    <div class="container-action-content" @click="toggleDropdown('user')">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <ul v-if="activeDropdown === 'user'" class="dropdown-menu-user">
                        <h4>{{ user.Name }}</h4>
                        <li><router-link to="/user/profile">Profile</router-link></li>
                        <li><router-link to="/user/friends">Friends</router-link></li>
                        <li><router-link to="/user/groups">Groups</router-link></li>
                        <li><router-link to="/user/account-setting">Account Settings</router-link></li>
                        <li><router-link to="/user/help">Help</router-link></li>
                        <li><div>Sign out</div></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import InputSearch from "@/components/InputSearch.vue";
import ProductService from "../services/product.service";
import AuthService from '../services/AuthService';
import UserService from '../services/user.service';
export default {
    components: {
        InputSearch,
    },

    data() {
        return {
            activeDropdown: null,
            searchText: "",
            searchResults: [],
            isAuthenticated: AuthService.isAuthenticated,
            user: {}
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
        async getUser(){
            AuthService.checkAuthentication();
            const email = AuthService.user.Email;
            this.user = await UserService.getUserByEmail(email)
        },

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
        toggleDropdown(dropdownName) {
            if (this.activeDropdown === dropdownName) {
                this.activeDropdown = null;
            } else {
                this.activeDropdown = dropdownName;
            }
        },
        hideDropdown() {
            this.activeDropdown = null;
        }

    },
    mounted() {
        this.getUser();
        this.checkAuthentication();
        // document.body.addEventListener('click', this.hideDropdown);
    },
    // beforeDestroy() {
    //     document.body.removeEventListener('click', this.hideDropdown);
    // },

};
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    li{
        list-style: none;
        cursor: pointer;
    }

    .header{
        background-color: #f4f1ea;
        box-shadow: 0 1px 2px rgba(0,0,0,0.15);
    }
    .container{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .navigation{
        display: flex;
    }

    .navigation > div{
        display: flex;
        cursor: pointer;
        margin: 5px;
        padding: 10px;
        border-radius: 5px;
    }
    .navigation > div:hover{
        background-color: #382110;
        color: #ffffff;
    }
    .nav-link{
        display: flex;
        align-items: center;
        margin: 5px;
        padding: 10px;
        border-radius: 5px;
    }
    .nav-link:hover{
        background-color: #382110;
        color: #ffffff;
    }
    #icon-nav{
        margin-right: 5px;
    }
    #icon-down{
        margin-left: 5px;
        line-height: 75%;
    }
    .dropdown {
        position: relative;
    }

.dropdown-toggle {
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 150px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 5px 0;
}

/* .dropdown-menu li {
  list-style-type: none;
} */

.dropdown-menu li a {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
}

.dropdown-menu li a:hover {
  background-color: #f0f0f0;
}
/* .dropdown-menu .show {
  display: block;
} */
.search{
    /* border: 1px solid #333 ; */
    background-color: #ffffff;
    color:#65676b;
    border-radius: 20px;
    padding: 5px 10px;
}
.search > input{
    margin-left: 5px;
    border: none;
    background-color: transparent;
    outline: none;
    height: 20px;
    width: 200px;
}

.action{
    display: flex;
}
.container-action-content{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin: 10px;
    border-radius: 50%;
    background-color: #ffffff;
    cursor: pointer;
}

.container-action-content:hover{
    background-color: #382110;
    color: #ffffff;
}

.notification{
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
    min-width: 300px;
    background-color: #fff;
    color: #333;
    border: 1px solid #ccc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 5px;
}

.content{
    display: flex;
    align-items: center;
    padding: 10px 5px;
}

.content:hover{
    background-color: #f0f0f0;
}
.avatar {
    margin-right: 5px;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: black;
}

.text{
    width: 250px;
}

.status {
    margin-left: 5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #0866ff;
}

.message {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
    min-width: 300px;
    background-color: #fff;
    color: #333;
    border: 1px solid #ccc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 5px;
}

.header-message{
    display: flex;
    justify-content: space-between;
    margin: 5px;
}

.header-message > i {
    line-height: 13px;
}

.search-message {

}

.search-message > input {
    border: none;
}

.dropdown-menu-user{
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
    min-width: 150px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 5px 0;
}
.dropdown-menu-user li a, .dropdown-menu-user h4 ,.dropdown-menu-user li div{
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
}
.dropdown-menu-user li a:hover, .dropdown-menu-user li div:hover {
  background-color: #f0f0f0;
}


</style>