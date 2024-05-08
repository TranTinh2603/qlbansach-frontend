<template>
    <div class="container">
        <div class="header-content">
            <router-link :to="'/book/detail/' + book.bookId">{{ book.name }}</router-link>
            <i class="fa-solid fa-greater-than"></i>
            <p>Add Review</p>
        </div>
        <div class="book-content">
            <img :src="book.image" alt="">
            <div class="info-book">
                <router-link :to="'/book/detail/' + book.bookId">{{ book.name }}</router-link>
                <span>by <router-link :to="'/author/detail/' + book.author">{{ book.author }}</router-link></span>
            </div>
        </div>
        <div class="my-rating">
            <span>Rating:</span>
            <div>
                <i v-for="index in 5" :class="'fa-solid fa-star' + (rating >= index ? ' rated' : '')"
                    @mouseover="hoverRating(index)" @mouseleave="resetRating(review.rating)" @click="setRating(index)"></i>
            </div>
            <!-- <span @click="clearRating()">Clear</span> -->
        </div>
        <div class="my-review">
            <label for="review">What did you think?</label>
            <br>
            <textarea name="review" id="review" rows="15" v-model="review.review"></textarea>
        </div>
        <div class="submit">
            <button @click="addReview(user.userId)">Save</button>
            <!-- <p @click="deleteReview(reviewId, review.bookId)">Delete</p> -->
        </div>
    </div>
</template>
<script>
import AuthService from '../services/AuthService';
import UserService from '../services/user.service';
import BookService from '../services/book.service';
import ReviewService from '../services/review.service';
export default {
    props: {
        bookId: {type: String, default: ""}
    },
    data(){
        return {
            user: {},
            book: {},
            rating: 0,
            review: {
                review: '',
                rating: 0
            },
        }
    },
    methods: {
        async getUser(){
            AuthService.checkAuthentication()
            const email = AuthService.user.email
            this.user = await UserService.getUserByEmail(email)
        },
        async getBook(){
            this.book = await BookService.getByBookId(this.bookId)
        },
        hoverRating(rating){
            this.rating = rating
        },
        resetRating(rating){
            this.rating = rating
        },
        setRating(rating){
            this.review.rating = rating
        },
        async addReview(){
           try {
                const date = new Date();
                const timestamp = date.getTime();
                const randomString = Math.random().toString(36).substring(5);
                const result = randomString + '_' + timestamp;
                const data = {
                    userId: this.user.userId,
                    bookId: this.bookId,
                    reviewId: result,
                    review: this.review.review,
                    createdAt: timestamp,
                    rating: this.review.rating,
                    likes: [],
                    comments: []
                }
                const addReview = await ReviewService.create(data)
                if (addReview) {
                    alert('Create review successfully!')
                    this.$router.push({name: 'book.detail', params: {id: this.bookId}})
                }
           } catch (error) {
                console.log(error);
           }
        }
    },
    mounted() {
        this.getUser()
        this.getBook()
    }

}
</script>

<style scoped>
a {
    color: #00635d;
}

a:hover {
    text-decoration: underline;
}

.container {
    margin: 20px 100px;
    width: 700px;
}

.header-content {
    display: flex;
    align-items: center;
}

.header-content>a {
    font-size: 20px;
    font-weight: bold;
}

.header-content>i {
    margin: 0 5px;
    font-size: 14px;
}

.header-content>p {
    font-size: 20px;
    font-weight: bold;
}

.book-content {
    margin-top: 20px;
    display: flex;
    padding: 5px 0;
    border-bottom: 1px solid #eee;
}

.book-content>img {
    width: 48px;
    height: 75px;
    margin-right: 5px;
}

.info-book>a {
    display: block;
    font-size: 18px;
    font-weight: 600;
    color: #333333;
}

.info-book>span {
    color: #131313;
}

.info-book>span>a {
    color: #333333;
}

.my-rating {
    padding: 10px 0;
    display: flex;
    font-size: 14px;
    align-items: center;
    border-bottom: 1px solid #eee;
}

.my-rating>div {
    color: #d6d6d6;
    margin: 0 5px;
}

.my-rating>span:last-child {
    color: #999999;
    cursor: pointer;
}

.rated {
    color: #f5a623;
}

.my-review {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

.my-review>label {
    font-size: 14px;
}

.my-review>textarea {
    margin-top: 5px;
    width: 100%;
    padding: 5px 10px;
    font-size: 14px;
    font-family: 'Times New Roman', Times, serif;
    background: #FFFFFF;
    border-radius: 3px;
    border: #DCD6CC 1px solid;
    color: #333333;
}

.my-review>textarea:focus {
    box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
    border-color: #B9AD99;
    outline: 0px;
}

.submit {
    margin-top: 20px;
    display: flex;
    align-items: center;
}

.submit>button {
    font-size: 14px;
    border-radius: 3px;
    border: 1px solid #D6D0C4;
    font-family: 'Times New Roman', Times, serif;
    cursor: pointer;
    color: #333333;
    background-color: #F4F1EA;
    padding: 8px 12px;
    margin-right: 20px;
}

.submit>button:hover {
    color: #333333;
    background-color: #ede6d6;
}

.submit>p {
    color: #FF0000;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
}

.submit>p:hover {
    opacity: 0.5;
}

</style>