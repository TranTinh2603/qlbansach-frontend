<template>
    <div class="container">
        <div class="image-book">
            <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630482892i/11378463.jpg" alt="">
            <div class="status-book">
                <button class="button-change-status-book">
                    <i class="fa-solid fa-pen"></i>
                    <span>Want to Read</span>
                </button>
            </div>
            <div class="rate-book">
                <div class="star-rate-book">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <p>Rate this book</p>
            </div>
        </div>
        <div class="info-detail-book">
            <InfoDetailBook />
        </div>
    </div>
</template>
<script>
import InfoDetailBook from "../components/InfoDetailBook.vue";
export default {
    components: {
        InfoDetailBook,
    }
}
</script>
<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    margin: 20px 100px;
}

.image-book {
    width: 300px;
    margin-right: 20px;
}

.image-book > img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    height: 300px;
}
.info-detail-book{
    width: 700px;
}

.status-book {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.button-change-status-book{
    cursor: pointer;
    color: rgba(39, 28, 20, 0.88);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-radius: 20px;
    width: 200px;
    border: 2px solid rgba(39, 28, 20, 0.56);
    background-color: transparent;
}
.button-change-status-book:hover{
    background-color: rgba(0, 0, 0, 0.05);
}

.button-change-status-book > i {
    margin-right: 5px;
}
.rate-book{
    margin-top: 10px;
}

.star-rate-book{
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
}

.star-rate-book > i {
    margin-left: 10px;
}

.rate-book > p {
    text-align: center;
}
</style>