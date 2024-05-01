<template>
    <div class="home">
        <div class="categories">
            <h3>Danh mục sản phẩm</h3>
            <ul style="display: flex; margin-top: 10px;">
                <li @click="filterCategory = ''" style="padding: 5px 10px;">Tất cả</li>
                <li @click="filterCategory = category.categoryId" style="padding: 5px 10px;" v-for="category in categories" :key="category.id">
                    {{ category.name }}
                </li>
            </ul>
        </div>
        <div class="products">
            <h3>Danh sách sản phẩm</h3>
            <div class="products-list">
                <div class="product-item" v-for="product in filterProduct()" :key="product.id">
                    <img  :src="product.image" alt="">
                    <div>
                        <p @click="goToDetail(product.bookId)">{{ product.name }}</p>
                        <p>{{ product.author }}</p>
                        <p>{{ product.price }} đ</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from '../services/book.service';
import CategoryService from '../services/category.service'
export default {
    data() {
        return {
            categories: [],
            products: [],
            filterCategory: "",
        };
    },
    methods:{
        async getCategory(){
            try {
                this.categories = await CategoryService.getAll()
            } catch (error) {
                console.log(error);
            }
        },
        async getProduct(){
            try {
                this.products = await BookService.getALl()
            } catch (error) {
                console.log(error);
            }
        },
        filterProduct(){
            if (this.filterCategory === ""){
                return this.products
            } else {
                return this.products.filter(product => product.category === this.filterCategory)
            }
        },
        goToDetail(bookId){
            this.$router.push({ name: 'shop.product.detail', params: { bookId: bookId } });
        }
    },
    mounted(){
        this.getCategory();
        this.getProduct()
    }
};
</script>

<style scoped>
.home {
    margin: 20px 100px;
}

.categories{
    margin-bottom: 20px;
}
.products {
    flex: 1;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
    cursor: pointer;
}

li:hover{
    text-decoration: underline;
}

a {
    text-decoration: none;
    color: #333;
}

a:hover {
    text-decoration: underline;
}
.products-list {
    margin-top: 10px;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
}
.product-item {
    margin-top: 20px;
    width: 200px;
}
.product-item > img{
    width: 150px;
    height: 220px;
}
.product-item > div {
    width: 150px;
}
.product-item > div > p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
   
}
.product-item > div > p:first-child{
    font-weight: bold;
    cursor: pointer;
}
.product-item > div > p:first-child:hover{
    text-decoration: underline;
}
.product-item > div > p:not(:first-child){
    font-size: 14px;
    color: rgb(128, 128, 137);
}
</style>
