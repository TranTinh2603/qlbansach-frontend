<template>
    <div class="row">
        <DetailCustomer @edit="gotoEdit" :customer="customer"/>
    </div>
    
</template>
<script>
import CustomerService from "../services/customer.service"
import DetailCustomer from "../components/DetailCustomer.vue";
export default {
    components: {
        DetailCustomer,
    },
    data(){
        return {
            customer: {},
        }
    },
    methods: {
        async getUser(){
            const getEmail = localStorage.getItem('authState');
            if (getEmail) {
                const result = getEmail ? JSON.parse(getEmail) : {};
                this.customer = await CustomerService.getByEmail(result.user);
                console.log(this.customer);
            }
        },
        gotoEdit(data){
            this.$router.push({name: 'customer.edit', params: {id: data}})
        }
    },
    mounted(){
        this.getUser();
    }
}
</script>