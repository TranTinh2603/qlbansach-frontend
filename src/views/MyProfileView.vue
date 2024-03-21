<template>
    <div class="container-my-profile">
        <div class="content-1">
            <div class="content-profile">
                <div class="image-profile">
                    <img src="https://s.gr-assets.com/assets/nophoto/user/u_225x300-c928cbb998d4ac6dd1f0f66f31f74b81.png" alt="">
                    <div class="info-ratings-reviews">
                        <router-link to="/a">2 ratings (5.0 avg)</router-link>
                        <br>    
                        <router-link to="/a">0 reviews</router-link>    
                    </div>
                </div>
                <div class="name-profile">
                    <h2>{{ user.Name }} <router-link to="/user/profile/edit">(edit profile)</router-link></h2>
                    <div class="info-user">
                        <div class="title-profile">
                            Address
                        </div>
                        <div class="value-profile">
                           {{ user.Address }}
                        </div>
                        <div class="title-profile">
                            Birthday   
                        </div>
                        <div class="value-profile">
                           {{ user.Birthday }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-bookshelves">
                <div class="header-content-bookshelves">
                    <h2>TRẦN'S BOOKSHELVES</h2>
                </div>
                <div class="body-content-bookshelves">
                    <router-link to="/">currently reading (0)</router-link>
                    <router-link to="/">currently reading (0)</router-link>
                    <router-link to="/">currently reading (0)</router-link>
                    <router-link to="/">currently reading (0)</router-link>
                </div>
                <div class="more-content-bookshelves"><router-link to="/">More...</router-link></div>
            </div>
            <div class="content-currently-reading">
                <div class="header-content-currently-reading">
                    <h2>Currently Reading</h2>
                </div>
                <div v-for="(book, index) in books" :key="index" class="body-content-currently-reading">
                    <div class="book-currently-reading">
                        <div class="image-book-currently-reading">
                            <img :src=book.image alt="">
                        </div>
                        <div class="info-book-currently-reading">
                            <span><router-link to="/">Trần Tính</router-link> is currently reading</span>
                            <h2>{{ book.name }}</h2>
                            <span>by <router-link to="/">{{ book.author }}</router-link></span>
                            <br>
                            <span>bookshelves: <router-link to="/">{{ getBookShelves(book.bookId).status }}{{ getBookShelves(book.bookId) && getBookShelves(book.bookId).bookshelves ? ', ' + getBookShelves(book.bookId).bookshelves : '' }}</router-link></span>
                        </div>
                    </div>
                    <div class="status-rate">
                        <div class="button-change-status-book">
                            <div class="status-book">Currently Reading</div>
                            <div class="change-status-book">
                                <i class="fa-solid fa-caret-down"></i>
                            </div>
                        </div>
                        <div class="rate-book">
                            <span>Rate this book</span>
                            <div class="star-rate-book">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-recent-update">
                <div class="header-content-recent-update">
                    <h2>TRẦN’S RECENT UPDATES</h2>
                </div>
                <div class="body-content-recent-update">
                    <Posts />
                </div>
            </div>
        </div>
        <div class="content-2">
            <div class="content-friends">
                <div class="header-content-friends">
                    <h2>Trần Is Friends</h2>
                </div>
                <div class="body-content-friends">
                    <div class="info-friends">
                        <div class="image-info-friends">
                            <img src="https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png" alt="">
                        </div>
                        <div class="name-info-friends">
                            <router-link to="/">Trần Tính</router-link>
                            <br>
                            <span>14 books | 1 friends</span>
                        </div>
                    </div>
                    <div class="info-friends">
                        <div class="image-info-friends">
                            <img src="https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png" alt="">
                        </div>
                        <div class="name-info-friends">
                            <router-link to="/">Trần Tính</router-link>
                            <br>
                            <span>14 books | 1 friends</span>
                        </div>
                    </div>
                    <div class="info-friends">
                        <div class="image-info-friends">
                            <img src="https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png" alt="">
                        </div>
                        <div class="name-info-friends">
                            <router-link to="/">Trần Tính</router-link>
                            <br>
                            <span>14 books | 1 friends</span>
                        </div>
                    </div>
                    <div class="more-friends">
                        <router-link to="/">More friends...</router-link>
                    </div>
                </div>
            </div>
            <div class="content-following">
                <div class="header-content-following">
                    <h2>People Trần Is Following</h2>
                </div>
                <div class="body-content-following">
                    <div class="image-people-following">
                        <img src="https://images.gr-assets.com/authors/1305183182p5/4634532.jpg" alt="">
                    </div>
                    <div class="image-people-following">
                        <img src="https://images.gr-assets.com/authors/1305183182p5/4634532.jpg" alt="">
                    </div>
                    <div class="image-people-following">
                        <img src="https://images.gr-assets.com/authors/1305183182p5/4634532.jpg" alt="">
                    </div> 
                </div>
                <div class="more-follower">
                    <router-link to="/">More follower...</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Posts from "@/components/Posts.vue";
import AuthService from "../services/AuthService";
import UserService from "../services/user.service";
import MyBookService from "../services/myBook.service";
import BookService from "../services/book.service";
export default {
    components: {
        Posts,
    },
    data(){
        return {
            user: {},
            bookCurrentlyReading: [],
            books: []
        }
    },
    methods: {
        async getUser(){
            AuthService.checkAuthentication();
            const email = AuthService.user.Email;
            this.user = await UserService.getUserByEmail(email);
            this.getBookByStatus(this.user.userId)
        },
        async getBookByStatus(userId){
            const data = {
                userId: userId,
                status: "Currently Reading"
            }
            this.bookCurrentlyReading = await MyBookService.getByStatus(data);
            for (const book of this.bookCurrentlyReading){
                this.getBook(book.bookId);
            }
        },
        async getBook(bookId){
            this.books.push(await BookService.getByBookId(bookId));
            console.log(this.books);
        },
        getBookShelves(bookId){
            const book = this.bookCurrentlyReading.find(book => book.bookId == bookId);
            return book
        }
    },
    mounted(){
        this.getUser();
    }
}
</script>
<style scoped>
a{
    color: #00635d;
}
a:hover{
    text-decoration: underline;
}
.container-my-profile{
    margin: 20px 150px;
    display: flex;
    justify-content: space-between;
}
.content-1{
    width: 650px;

}
.content-2{
    width: 300px;
}
.content-profile{
    display: flex;
    justify-content: space-between;
}
.image-profile{
    width: 175px;
}
.image-profile > img {
    display: block;
    margin: 0 auto;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
}
.info-ratings-reviews{
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
}
.name-profile {
    width: 450px;
    margin-left: 20px;
}
.name-profile > h2{
    font-size: 20px;
    line-height: 1.3;
    margin: 0;
    margin-bottom: 10px;
    padding: 4px 0 4px 0;
    display: block;
    margin: 0 auto;
    border-bottom: 1px solid #d8d8d8;
}
.name-profile h2 a{
    font-size: 13px;
    line-height: 14px;
}
.info-user{
        font-size: 14px;
        margin-top: 10px;
}
.title-profile{
    width: 20%;
    float: left;
    font-weight: bold;
    margin-bottom: 4px;

}
.value-profile{
    width: 75%;
    float: right;
    margin-bottom: 4px;

}
.content-bookshelves{
    margin-top: 10px;
}
.header-content-bookshelves{
    margin-bottom: 10px;
    width: 100%;
    border-bottom: 1px solid #D8D8D8;
}
.header-content-bookshelves > h2 {
    display: block;
    padding: 2px 0;
    width: auto;
    height: 24px;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 13px;
    text-transform: uppercase;
}
.body-content-bookshelves{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    font-size: 14px;
}
.more-content-bookshelves{
    float: right;
    font-size: 14px;
}
.content-currently-reading{
    margin-top: 20px
}
.header-content-currently-reading{
    margin-bottom: 10px;
    width: 100%;
    border-bottom: 1px solid #D8D8D8;
}
.header-content-currently-reading h2{
    display: block;
    padding: 2px 0;
    width: auto;
    height: 24px;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 13px;
    text-transform: uppercase;
}
.body-content-currently-reading{
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #D8D8D8;
}
.book-currently-reading{
    display: flex;
}
.image-book-currently-reading{
    margin-right: 10px;
}
.image-book-currently-reading > img {
    width: 65px;
    height: 105px;
}
.info-book-currently-reading{
    font-size: 14px;
}
.status-rate{
    font-size: 14px;
}
.button-change-status-book{
    display: flex;
    align-items: center;
}
.status-book{
    border-width: 1px;
    padding: 5px 8px 5px 8px;
    text-overflow: ellipsis;
    background: #f2f2f2;
    border-color: #dddddd;
    color: #181818;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    border-style: solid;
    font-weight: bold;
    overflow: hidden;
    word-wrap: normal;
    white-space: nowrap;
}
.change-status-book{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 27px;
    padding: 5px;
    cursor: pointer;
    background-color: #409d69;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #38883d;
    color: #ffffff;
}
.rate-book{
    font-size: 12px;
    margin-top: 5px;
    text-align: center;
    color: #d6d6d6;
}
.star-rate-book > i{
    margin-right: 2px;
}
.content-recent-update{
    margin-top: 20px;
}
.header-content-recent-update{
    margin-bottom: 10px;
    width: 100%;
    border-bottom: 1px solid #D8D8D8;
}
.header-content-recent-update > h2{
    display: block;
    padding: 2px 0;
    width: auto;
    height: 24px;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 13px;
    text-transform: uppercase;
}
.body-content-recent-update{
    margin-top: 10px;
    font-size: 14px;

}
.content-friends{
    margin-top: 10px;
}
.header-content-friends{
    margin-bottom: 10px;
    width: 100%;
    border-bottom: 1px solid #D8D8D8;
}
.header-content-friends > h2{
    display: block;
    padding: 2px 0;
    width: auto;
    height: 24px;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 13px;
    text-transform: uppercase;
}
.body-content-friends{
    font-size: 14px;
}
.info-friends{
    display: flex;
    padding-bottom: 5px;
}
.image-info-friends{
    margin-right: 5px;
}
.image-info-friends > img {
    width: 50px;
    height: 66px;
}
.more-friends{
   display: flex;
   justify-content: end;
   margin-right: 10px;
}
.content-following{
    margin-top: 10px;
}
.header-content-following{
    margin-bottom: 10px;
    width: 100%;
    border-bottom: 1px solid #D8D8D8;
}
.header-content-following > h2 {
    display: block;
    padding: 2px 0;
    width: auto;
    height: 24px;
    margin-bottom: 0;
    font-weight: bold;
    font-size: 13px;
    text-transform: uppercase;
}
.body-content-following{
    margin-top: 5px;
    display: flex;
}
.image-people-following{
    margin-right: 2px;
}
.image-people-following > img {
    width: 25px;
    height: 33px;
}
.more-follower{
    font-size: 14px;
    display: flex;
    justify-content: end;
    margin-right: 10px;
}
</style>