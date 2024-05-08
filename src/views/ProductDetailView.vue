<template>
    <div class="container">
        <div class="product-detail">
            <div class="product-image">
                <img :src="product.image" :alt="product.name">
            </div>
            <div class="product-info">
                <div class="product-name">
                    <h2>{{ product.name }}</h2>
                    <p>Tác giả {{ product.author }}</p>
                    <div class="rating">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <p>4.5</p>
                        <div>
                            <p>2 ratings</p>
                            <div></div>
                            <p>2 reviews</p> 
                        </div>
                    </div>
                </div>
                <div class="price-quantity">
                    <p>{{ product.price }}đ</p>
                    <div class="quantity">
                        <p>Số lượng:</p>
                        <button @click="decreaseQuantity">-</button>
                        <input type="text" v-model="quantity">
                        <button @click="increaseQuantity">+</button>
                    </div>
                </div>
                <div class="description-detail-review">
                    <div class="header">
                        <button class="active">Description</button>
                        <button>Other information</button>
                        <button>Review</button>
                    </div>
                    <div class="content-description">
                        <p> {{ product.description }}</p>
                    </div>
                </div>
                <div class="add-to-cart">
                    <button @click="addToCart(product)">Add to Cart</button>
                </div>
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
    padding: 20px 100px;
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
    margin-left: 40px;
}
.product-info > h2 {
    margin-bottom: 10px;
}
.add-to-cart > button {
    padding: 10px 15px;
    color: #fff;
    background-color: #5cb85c;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.product-info > button:hover {
  background-color: #0056b3;
}
.product-name{
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e0e0;
}
.rating{
    display: flex;
    margin-top: 10px;
    font-size: 14px;
}
.rating > p {
    padding-left: 5px;
}
.rating > i {
    color: #e87400;
}
.rating > div {
    margin-left: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
}
.rating > div > div {
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background-color: black;
}
.price-quantity {
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e0e0;
}
.price-quantity > p {
    font-size: 22px;
    font-weight: bold;
}
.quantity {
    display: flex;
    margin: 10px 0;
    align-items: center;
}
.quantity > p {
    margin-right: 10px;
}
.quantity > input {
    width: 30px;
    height: 30px;
    text-align: center;
    margin: 0 5px;
    border: 1px solid #e5e0e0;
}

.quantity > button{
    width: 30px;
    height: 30px;
    cursor: pointer;
    background-color: #ffffff;
    border: 1px solid #e5e0e0;
    border-radius: 3px;
    font-size: 16px;
}
.quantity > button:hover{
    border-color: #999999;
}
.description-detail-review {
    margin-top: 20px;
    margin-bottom: 20px;
}
.description-detail-review > .header > button{
    padding: 10px 15px;
    border: none;
    font-family: 'Times New Roman', Times, serif;
    margin-right: 10px;
    border-radius: 3px;
    font-size: 14px;
    cursor: pointer;
    background-color: transparent;
}
.description-detail-review > .header > button:hover:not(.active){
    background-color: #eee;
}
.description-detail-review > .header > .active {
    background-color: #007bff;
    color: #ffffff;
}
.content-description{
    padding: 10px 0;
}
.content-description {
    line-height: 20px;
}
.add-to-cart {
    border-top: 1px solid #e5e0e0;
    padding: 10px 0;
    margin-bottom: 50px;
}
</style>
