<template>
    <div class="row">
        <div class="col-8">
            <div id="carouselExampleIndicators" class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://cdn0.fahasa.com/media/magentothem/banner7/PopmartT1023_Banner_Slide_840x320_1.jpg"
                            class="d-block w-100 rounded-1" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="https://cdn0.fahasa.com/media/magentothem/banner7/FahasaSaleThu3T1123_W1_Banner_840x320.jpg"
                            class="d-block w-100 rounded-1" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="https://cdn0.fahasa.com/media/magentothem/banner7/NCCDinhTiT1131_Slide_840x320.jpg"
                            class="d-block w-100 rounded-1" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div class="col-4">
            <div class="banner-1 row">
                <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2023/392x156_sacombankT11.jpg"
                    class="image-banner rounded-1">
            </div>
            <div class="banner-1 row">
                <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2023/ZaloPay11_392x156_1.jpg"
                    class="image-banner rounded-1">
            </div>
        </div>
    </div>
    <div class="row bg-white rounded-1 mb-3">
        <h5 class="m-0 p-3">Danh mục sản phẩm</h5>
        <hr>
        <div>
            <ProductPortfolio :category="category" @categoryIndex="handleCategory" />
        </div>
    </div>
    <div class="row bg-white rounded-1">
        <h5 class="m-0 p-3">Tất cả sản phẩm</h5>
        <hr>
        <div class="container">
            <ProductList :products="products" :discount="25" />
        </div>
    </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import ProductService from '@/services/product.service';
import ProductPortfolio from '@/components/ProductPortfolio.vue';
import CategoryService from '../services/category.service';

export default {
    components: {
        ProductList,
        ProductPortfolio,
    },
    data() {
        return {
            products: [],
            category: [],
        };
    },
    methods: {
        async getCategory() {
            try {
                this.category = await CategoryService.getAll();
                console.log(this.category);
            } catch (error) {
                console.error(error);
            }
        },
        async getProduct() {
            try {
                this.products = await ProductService.getAll();
                console.log(this.products);
            } catch (error) {
                console.error(error);
            }
        },
        handleCategory(data) {
            this.$router.push({ name: 'product.category', params: { categoryId: data } });
        }
    },
    mounted() {
        this.getProduct();
        this.getCategory();
    },
}
</script>

<style scoped>
.banner-1 {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.image-banner {
    width: 100%;
}</style>
