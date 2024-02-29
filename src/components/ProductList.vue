<script>
export default {
    props: {
        products: { type: Array, default: [] },
        discount: { type: Number, default: 0 },
    },
    emits: ["update:activeId"],
    methods: {
        productDetail(id){
            this.$emit("update:activeId", id);
        },
        calculateDiscountedPrice(price) {
            price = parseFloat(price);
            const discountedPrice = price - (price * this.discount) / 100;
            return discountedPrice.toFixed(2);
        },
    }
};
</script>

<template>
    <div class="row row-cols-5">
        <div 
            class="mb-5 shadow-sm p-3 mb-5 bg-body-tertiary" 
            v-for="(product) in products"
        > 
        <router-link
                        :to="{
                            name: 'product.detail',
                            params: { id: product._id },
                        }"
                    >  
        <button class="text-start border-0 bg-white">
            <div class="position-relative text-center">
                    <img :src="product.HinhHH" alt="">
                    <label v-if="this.discount" class="label-pro-sale position-absolute ">{{ this.discount }}%</label>
            </div>
                <p>{{ product.TenHH }}</p>
                <p class="fw-light ">{{ product.MoTaHH }}</p>
                <p class="text-danger fw-bold">{{ calculateDiscountedPrice(product.Gia) }}đ</p>
                <p class="text-decoration-line-through text-secondary">{{ product.Gia }}đ</p>    
        </button>
           </router-link>  
        </div>
    </div>
</template>
<style scoped>

    img{
        height: 200px;
        width: 200px;
    }
    p{
        margin: 0;
        overflow: hidden;
        width: 150px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .label-pro-sale {
        top: 0;
        left: 160px;
        background-color: red; 
        color: white; 
        padding: 4px 8px;
        border-radius: 4px;
        font-weight: bold;
    }
</style>