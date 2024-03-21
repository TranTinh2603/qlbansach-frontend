<template>
    <div class="container">
        <div class="image-book">
            <img :src="book.image" alt="">
            <div class="status-book">
                <button 
                    v-if="myBook" 
                    class="button-change-status-book" 
                    @click="openModal"
                >
                    <i class="fa-solid fa-pen"></i>
                    <span>{{ myBook.status }}</span>
                </button>
                <button 
                    v-else 
                    class="button-add-status-book" 
                    @click="openModal"
                >
                    <i class="fa-solid fa-pen"></i>
                    <span>Want to Read</span>
                </button>
            </div>
            <div class="modal" v-if="showModal">
                <div class="modal-content">
                    <div class="header-modal-content">
                        <h3>Choose a shelf for this book</h3>
                        <span class="close" @click="closeModal">&times;</span>
                    </div>
                    <div class="body-modal-content">
                        <button @click="setStatusBook('Want To Read')" class="button-body-modal-content"><i v-if="myBook.status === 'Want To Read'" class="fa-solid fa-check"></i>Want To Read</button>
                        <button @click="setStatusBook('Currently Reading')" class="button-body-modal-content"><i v-if="myBook.status === 'Currently Reading'" class="fa-solid fa-check"></i>Currently Reading</button>
                        <button @click="setStatusBook('Read')" class="button-body-modal-content"><i v-if="myBook.status === 'Read'" class="fa-solid fa-check"></i>Read</button>
                    </div>
                </div>
            </div>
            <div v-if="!review" class="rate-book">
                <div class="star-rate-book">
                    <i  v-for="star in 5" 
                        :key="star" 
                        :class="['fa', 'fa-star', { 'fa-solid': star <= currentRating, 'fa-regular': star > currentRating }]"
                        @mouseover="hoverRating(star)"
                        @mouseleave="resetRating()"
                        @click="setRating(star)"
                    ></i>
                </div>
                    <p>Rate this book</p>
                </div>
        </div>
        <div class="info-detail-book">
            <InfoDetailBook :id="this.id" :author="author"/>
        </div>
    </div>
</template>
<script>
import InfoDetailBook from "@/components/InfoDetailBook.vue";
import BookService from "../services/book.service";
import AuthorService from "../services/author.service";
import ReviewService from "../services/review.service";
import MyBookService from "../services/myBook.service";
export default {
    components: {
        InfoDetailBook,
    },
    props:{ 
        id: {type: String, required: true},
    },
    data(){
        return {
            book: {},
            myBook: {},
            author: {},
            currentRating: 0,
            maxRating: 5,
            review: null,
            showModal: false
        }
    },
    methods: {
        async getMyBookByUserIdAndBookId(){
            this.myBook = await MyBookService.getByUserIdAndBookId('U001',this.id)
            console.log(this.myBook);
        },
        async setStatusBook(status){
            const data = {
                userId: 'U001',
                bookId: this.id,
                status: status,
                bookshelves: ''
            }
            const updateStatusBook = await MyBookService.update(data.userId, data.bookId, data);
            alert(updateStatusBook.message);
            location.reload();
        },

        async getBook(){
            this.book = await BookService.getByBookId(this.id);
            await this.getAuthorByName(this.book.author);
        },
        async getAuthorByName(name){
            this.author = await AuthorService.getByName(name);
        },
        async getReview(){
            this.review = await ReviewService.getByUserIdAndBookId("U001", this.id);
        },
        hoverRating(rating) {
            this.currentRating = rating;
        },
        resetRating() {
            this.currentRating = 0;
        },
        async setRating(rating) {
            this.currentRating = rating;
            const data = {
                bookId: this.id,
                userId: "U001",
                rating: this.currentRating,
                review:"",
                createdAt: new Date,
            }
            const message = await ReviewService.create(data);
            alert(message.message);
            location.reload();
        },
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        }

    },
    created(){
      this.getBook();
      this.getReview();
      this.getMyBookByUserIdAndBookId();
    }

}
</script>
<style scoped>

.fa-star.fa-solid {
  color: gold;
}
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
.button-add-status-book{
    cursor: pointer;
    color: rgba(39, 28, 20, 0.88);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-radius: 20px;
    width: 200px;
    color: #ffffff;
    border: none;
    background-color: #3f8363;
}
.button-change-status-book:hover{
    background-color: rgba(0, 0, 0, 0.05);
}
.button-add-status-book:hover{
    background-color: #409970;
}

.button-add-status-book > i, .button-change-status-book > i {
    margin-right: 5px;
}
.modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 10px;
    width: 300px;
    transition: .3s ease-in-out;
}
.header-modal-content{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.body-modal-content{
    margin-top: 30px;
}
.button-body-modal-content{
    display: block;
    margin: 10px auto;
    width: 100%;
    padding: 10px 5px;
    border-radius: 30px;
    font-weight: 600;
    text-align: center;
    background-color: #ffffff;
    color: rgba(39, 28, 20, 0.88);
    text-decoration: none;
    cursor: pointer;
    border: 0 solid transparent;
    transition: .2s ease-in-out;
    border-style: solid;
    border-width: 2px;
    border-color: rgba(39, 28, 20, 0.56);
    
}

.button-body-modal-content:hover{
    background-color:  rgba(0, 0, 0, 0.05);
}

.button-body-modal-content i {
    margin-right: 5px;
}
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover, .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
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