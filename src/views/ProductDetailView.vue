


<template>
    <div class="container">
        <div class="product-detail">
            <div class="product-image">
                <img :src="product.image" :alt="product.name">
            </div>
            <div class="product-info">
                <h2>{{ product.name }}</h2>
                <p><strong>Tác giả:</strong> {{ product.author }}</p>
                <p><strong>Giá:</strong> {{ product.price }}</p>
                <p><strong>Mô tả:</strong> {{ product.description }}</p>
                <div class="quantity">
                    <button @click="decreaseQuantity">-</button>
                    <input type="text" v-model="quantity">
                    <button @click="increaseQuantity">+</button>
                </div>
                <button @click="addToCart(product)">Add to Cart</button>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from '../services/book.service';

export default {
    props: {
        bookId: {type: String, default: ""}
    },
    data() {
        return {
            product: {},
            quantity: 1,
            cart: JSON.parse(localStorage.getItem('cart')) || [],
        };
    },
    methods: {
        async getProductById() {
            try {
                this.product = await BookService.getByBookId(this.bookId);
                console.log(this.product);
            } catch (error) {
                console.error(error);
            }
        },
        addToCart(product) {
            try {
                const quantity = parseInt(this.quantity)
                const cartItem = this.cart.find(item => item.product.bookId === product.bookId);
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
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        increaseQuantity() {
            this.quantity++;
        }
    },
    mounted() {
        this.getProductById();
    }
};
</script>

<style scoped>
.container{
    margin: 20px 100px;
}
.product-detail {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.product-image img {
    width: 300px;
    height: 450px;
}

.product-info {
    flex: 1;
    margin-left: 20px;
}
.product-info > button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.product-info > button:hover {
  background-color: #0056b3;
}
.quantity {
    display: flex;
    margin: 10px 0;
}
.quantity > input {
    width: 20px;
    height: 20px;
    text-align: center;
    margin: 0 5px;
}

.quantity > button{
    width: 20px;
    cursor: pointer;
}
</style>
