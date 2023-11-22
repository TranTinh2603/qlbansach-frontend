<template>
    <div class="row">
        <EditCustomer  @edit="handleEdit" :customer="customer"/>
    </div>
    
</template>

<script>
import EditCustomer from "../components/EditCustomer.vue"
import CustomerService from "../services/customer.service"
export default {
    components: {
        EditCustomer,
    },
    props: {
        id: {type: String, default: ""}
    },
    data(){
        return{
            customer: {},
        }
    },
    methods: {
        async getCustomer(id){
            try {
                this.customer = await CustomerService.get(id);
                console.log(this.customer);
            } catch (error) {
                console.log(error);
            }
            

        },
        async handleEdit(data){
            try {
                this.customer = await CustomerService.update(this.id, data)
                alert('Cập nhật thông tin thành công');
            } catch (error) {
                
            }
        }

    },
    mounted(){
        this.getCustomer(this.id);
    }
}
</script>