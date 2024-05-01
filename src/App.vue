<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AuthService from '../src/services/AuthService.js';
import AppHeaderShop from "./components/AppHeaderShop.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
    AppHeaderShop,

  },
 data() {
    return {
      isAuthenticated: AuthService.isAuthenticated,
      checkShop: false
    };
  },
  watch: {
    '$route': ['checkAuthentication', 'checkRouteShop'],
  },
  methods: {
    checkAuthentication() {
      AuthService.checkAuthentication();
      this.isAuthenticated = AuthService.isAuthenticated;
        if (this.$route.path !== '/login') {
          AuthService.checkAuthentication();
          this.isAuthenticated = AuthService.isAuthenticated;
          if (!this.isAuthenticated) {
            this.$router.push({ path: '/login' });
            alert("Bạn chưa đăng nhập. Vui lòng đăng nhập!");
          }
        }
    },
    checkRouteShop(){
      this.checkShop = this.$route.path.includes('/shop');
    }
  },
  mounted() {
    this.checkAuthentication();
    this.checkRouteShop()
  }
};
</script>
<template>
  <div id="app">
      <AppHeader v-if="isAuthenticated && checkShop === false"/>
      <AppHeaderShop v-if="checkShop === true" />
    <div style="margin-top: 70px;">
      <router-view />
    </div>
    <!-- <AppFooter v-if="isAuthenticated" /> -->
  </div>
</template>
<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
    color: black;
  }

/* .jetbrains-mono-<uniquifier> {
  
  font-optical-sizing: auto;
  font-weight: <weight>;
  
} */
</style>