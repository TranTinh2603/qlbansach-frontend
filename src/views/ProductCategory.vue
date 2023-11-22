<template>
     <div class="row bg-white rounded-1">
            <h5 class="m-0 p-3">{{ category.TenTheLoai }}</h5>
            <hr>
            <div>
                <ProductList :products="products" />
            </div>
        </div>
</template>
<script>
import ProductList from "@/components/ProductList.vue";
import CategoryService from "@/services/category.service.js";
export default {
    components: {
        ProductList
    },
    props: {
        categoryId: {type: String, required: true}
    },
    data(){
        return {
            products: [],
            category: {},
        }
    },
    methods: {
        async getProductByMaTheLoai(categoryId){
            try {
                this.products = await CategoryService.getByMa(categoryId);
                console.log(this.products);
            } catch (error) {
                console.log(error);
            }
        },
        async getTenTheLoai(categoryId){
            try {
                this.category = await CategoryService.getTenByMa(categoryId);
                console.log(this.category);
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted(){
        this.getProductByMaTheLoai(this.categoryId);
        this.getTenTheLoai(this.categoryId);
    }
}
</script>