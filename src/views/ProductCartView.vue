<template>
    <div class="cart">
        <h2>Giỏ hàng ({{ cartItems.length }} sản phẩm)</h2>
        <div class="container">
            <div class="product-content">
                <div v-if="cartItems.length === 0">
                    <p>Giỏ hàng của bạn đang trống.</p>
                </div>
                <div v-else>
                    <div class="cart-item-header">
                        <div>
                            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
                            <p>Chọn tất cả ({{ cartItems.length }} sản phẩm)</p>
                        </div>
                        <p>Số lượng</p>
                        <p>Thành tiền</p>
                    </div>
                    <div v-for="item in cartItems" :key="item.id" class="cart-item">
                        <div class="item-info">
                            <input type="checkbox" v-model="item.selected" @change="handler()">
                            <img :src="item.product.image" :alt="item.product.name">
                            <div>
                                <h3>{{ item.product.name }}</h3>
                                <p style="font-weight: bold;">{{ item.product.price }}đ</p>
                            </div>
                        </div>
                        <div class="quantity">
                            <button @click="decreaseQuantity(item)">-</button>
                            <input type="text" v-model="item.quantity">
                            <button @click="increaseQuantity(item)">+</button>
                        </div>
                        <div>
                            <p style="font-weight: bold; color: #C92127;">{{ totalUnitPrice(item.product.price, item.quantity) }}đ</p>
                        </div>
                        <div class="delete">
                            <i style="color: #646464;" class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="into-money">
                <div class="header">
                    <p>Thành tiền</p>
                </div>
                <div class="total">
                    <div>
                        <p>Tổng số lượng: </p>
                        <p>{{ totalQuantity }}</p>
                    </div>
                    <div>
                        <p>Tổng tiền: </p>
                        <p style="color: #C92127;">{{ totalPrice }}đ</p>
                    </div>
                </div>
                <button @click="checkout">Thanh toán</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cartItems: [],
            selectAll: false
        };
    },
    computed: {
        totalQuantity() {
            return this.cartItems.reduce((total, item) => total + (item.selected ? item.quantity : 0), 0);
        },
        totalPrice() {
            return this.cartItems.reduce((total, item) => total + (item.selected ? item.product.price * item.quantity : 0), 0).toFixed(3);
        }
    },
    methods: {
        removeFromCart(item) {
            const index = this.cartItems.indexOf(item);
            if (index !== -1) {
                this.cartItems.splice(index, 1);
                this.saveCartToLocalStorage();
            }
        },
        loadCartFromLocalStorage() {
            const savedCart = localStorage.getItem('cart');
            this.cartItems = savedCart ? JSON.parse(savedCart) : [];
        },
        saveCartToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cartItems));
        },
        saveOrderToLocalStorage(cartItems) {
            localStorage.setItem('order', JSON.stringify(cartItems));
        },
        checkout() {
            // Thực hiện thanh toán cho các sản phẩm đã chọn
            const selectedItems = this.cartItems.filter(item => item.selected);
            this.saveOrderToLocalStorage(selectedItems)
            this.$router.push({name: 'shop.pay'})
            // Redirect hoặc thực hiện các bước thanh toán khác
        },
        totalUnitPrice(price, quantity) {
            return (quantity * price).toFixed(3);
        },
        toggleSelectAll() {
            this.cartItems.forEach(item => {
                item.selected = this.selectAll;
            });
        },
        handler() {
            this.selectAll = this.cartItems.every(item => item.selected);
        },
        increaseQuantity(item) {
            item.quantity++;
            this.saveCartToLocalStorage();
        },
        decreaseQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--;
                this.saveCartToLocalStorage();
            }
        },
    },
    mounted() {
        this.loadCartFromLocalStorage();
    }
};
</script>


<style scoped>
.cart {
    margin: 20px 100px;
}

.cart h2 {
    margin-bottom: 20px;
}
.container{
    display: grid;
    grid-template-columns: 750px 300px;
    gap: 20px;
}
.cart-item-header{
    padding: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: 450px 120px 120px auto;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 10px;
    font-weight: bold;
}
.cart-item-header > div {
    display: flex;
    gap: 5px;
}
.cart-item {
    display: grid;
    margin-bottom: 10px;
    align-items: center;
    grid-template-columns: 450px 120px 120px auto;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 5px;
}
.cart-item > .item-info{
    display: flex;
}

.item-info > input {
    margin-right: 10px;
}
.item-info > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.cart-item > div > img {
    max-width: 100px;
    margin-right: 20px;
}
.quantity{
    display: flex;
    align-items: center;
}

.quantity > input {
    width: 20px;
    height: 20px;
    text-align: center;
    margin: 0 5px;
    border: 1px solid #e5e0e0;
    border-radius: 3px;
}
.quantity > button {
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: #ffffff;
    border: 1px solid #e5e0e0;
    border-radius: 3px;
    font-size: 16px;
}
/* .item-info > button {
    padding: 5px 10px;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
} */
.delete{
    cursor: pointer;
}
.item-info > button:hover {
    background-color: #c82333;
}
.into-money{
    height: 170px;
    padding: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); 
    border-radius: 5px;
}
.pay{
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.header{
    padding-bottom: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #ededed;
    border-bottom-style: solid;
}
.header > p {
    font-size: 18px;
    font-weight: bold;
}
.total{
    margin-top: 10px;
}
.total > div {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}
.into-money > button {
    width: 100%;
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    background-color: #007bff;
    color: #ffffff;
    font-weight: bold;
}
</style>

