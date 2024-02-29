<template>
    <h3>Chi tiết sản phẩm</h3>
    <ProductCard :product="product"/>
</template>

<script>
    import ProductCard from "@/components/ProductCard.vue";
    import ProductService from "@/services/product.service";
    export default {
        components: {
            ProductCard,
        },

        props: { 
            id: { type: String, required: true}
        },
        data(){
            return{ 
                product: {},
            };
        },
        methods: {
            async getProductId(id){
                try {
                    this.product = await ProductService.get(id);
                    console.log(this.product);
                } catch (error) {
                    console.log(error);
                }
            },
        },
        mounted() {
            this.getProductId(this.id);
        }
    } 
</script>

<style scoped>
</style>