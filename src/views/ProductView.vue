<template>
    <div class="home">
        <div class="categories">
            <h3>Danh mục sản phẩm</h3>
            <ul style="display: flex; margin-top: 20px;">
                <li :class="'category-item' + (filterCategory === '' ? ' active': '')" @click="filterCategory = ''">Tất cả</li>
                <li :class="'category-item' + (filterCategory === category.categoryId ? ' active' : '')" @click="filterCategory = category.categoryId, active === category.categoryId" v-for="category in categories" :key="category.id">
                    {{ category.name }}
                </li>
            </ul>
        </div>
        <div class="products">
            <h3>Tất cả sản phẩm</h3>
            <div class="products-list">
                <div class="product-item" v-for="product in filterProduct()" :key="product.id">
                    <img :src="product.image" alt="">
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
import PayService from '../services/pay.service';
export default {
    data() {
        return {
            categories: [],
            products: [],
            filterCategory: "",
            active: ''
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
        },
        // async getUrl(){
        //     const data = {
        //         amount: 100000
        //     }
        //     const url = await PayService.getUrl(data)
        //     console.log(url);
        //     window.location.href = url.url
        // }
    },
    mounted(){
        this.getCategory();
        this.getProduct()
        // this.getUrl()
    }
};
</script>

<style scoped>
.home {
    padding: 20px 100px;
}

.categories{
    margin-bottom: 20px;
}
.category-item.active {
    color: #2f80ed;
    border: 1px solid #2f80ed;
}
.products {
    flex: 1;
}

.category-item{
    padding: 10px 30px;
    margin-right: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
}
.category-item:hover {
    color: #2f80ed ;
    border: 1px solid #2f80ed;
}   

ul {
    list-style: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
    cursor: pointer;
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
    background-color: #ffffff;
    margin-top: 20px;
    width: 200px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}
.product-item:hover {
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.1);
}
.product-item > img{
    width: 150px;
    height: 220px;
    display: block;
    margin: 0 auto;
}
.product-item > div {
    margin-top: 5px;
    width: 100%;
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
