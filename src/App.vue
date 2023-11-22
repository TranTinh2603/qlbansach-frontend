<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
// import AuthService from '../src/services/AuthService.js';
export default {
  components: {
    AppHeader,
    AppFooter
  },
//  data() {
//     return {
//       isAuthenticated: AuthService.isAuthenticated,
//     };
//   },
//   watch: {
//     '$route': 'checkAuthentication',
//   },
//   methods: {
//     checkAuthentication() {
//       AuthService.checkAuthentication();
//       this.isAuthenticated = AuthService.isAuthenticated;

//       if (!this.isAuthenticated) {
//         this.$router.push({ path: '/login' });
//       }
//     },
//   },
//   mounted() {
//     this.checkAuthentication();
//   }
};
</script>
<template>
  <div id="app">
    <AppHeader />
    <div class="container mt-3 p-3">
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>
<style>
  .page {
    max-width: 400px;
    margin: auto;
  }
</style>