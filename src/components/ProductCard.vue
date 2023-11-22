<script>
export default {
    props: {
        product: { type: Object , default: {}},
    },
    data(){
        return {
           cart: JSON.parse(localStorage.getItem('cart')) || [],
           quantity: 1,
        }
    }, 
    methods: {
        addToCart(product, quantity) {
            try {
                const cartItem = this.cart.find(item => item.product._id === product._id);
                if (cartItem) {
                    cartItem.quantity = parseInt(cartItem.quantity) + parseInt(quantity);
                } else {
                    this.cart.push({ product, quantity });
                }
                this.saveCartToLocalStorage();
                alert('Thêm sản phẩm vào giỏ hàng thành công!');
            } catch (error) {
                console.log(error);
            };
        },
        saveCartToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart, this.quantity));
        },
        updateQuantity(e){
            this.quantity = e.target.value;
            console.log(this.quantity);
        },
        increaseQuantity(){
            this.quantity++;
        },

        reduceQuantity(){
            this.quantity--;
        },

    }
};
</script>
<template>
    <div class="row bg-white rounded-2 p-3">
        <div class="col-5">
            <img src="https://cdn0.fahasa.com/media/catalog/product/8/9/8934974178637.jpg" alt="Mắt Biếc" class="w-100">
        </div>
        <div class="col-7">
            <h4> {{ this.product.TenHH }} </h4>
            <p>Mô tả: <strong>{{ this.product.MoTaHH }}</strong></p>
            <p>Ghi Chú: <strong>{{ this.product.GhiChu }}</strong></p>
            <p>Giá: <strong class="text-danger">{{ this.product.Gia }}đ</strong></p>
            <div class="d-flex">
                <p class="m-0 pe-2 py-1">Số lượng:</p>
                <button class="btn btn-sm btn-light" v-on:click="reduceQuantity()"><i class="fa-solid fa-minus"></i></button>
                <input class="quantity text-center mx-2" :value="this.quantity" @input="updateQuantity">
                <button class="btn btn-sm btn-light" v-on:click="increaseQuantity()"><i class="fa-solid fa-plus"></i></button>
            </div>
             <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-outline-success me-4" v-on:click="addToCart(this.product, this.quantity)">Thêm vào giỏ hàng <i class="fa-solid fa-cart-shopping"></i></button>
                <button class="btn btn-success w-25">Mua ngay</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .quantity{
        width: 40px;
    }
</style>