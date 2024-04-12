<template>
    <div class="container">
        <div class="container-content-1">
            <div class="popular-quote-content">
                <div class="header-quote-content">
                    <router-link to="/community/quote">Quote</router-link>
                    <i class="fa-solid fa-greater-than"></i>
                    <h3>Liked Quotes</h3>
                </div>
                <div class="search-quote">
                    <input type="text" class="search-quote-text" placeholder="Find quotes by keywords, author">
                    <input type="submit" class="search-quote-submit" value="Search quote">
                </div>
                <div class="popular-quotes-list">
                    <div v-if="quotes.length > 0" v-for="(quote, index) in quotes" :key="index" class="popular-quote-item">
                        <div class="content-popular-quote-item">
                            <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1429114964i/9810._UX200_CR0,14,200,200_.jpg"
                                alt="">
                            <div class="info-quote-item">
                                <span>“{{ quote.content }}”</span>
                                <span>― {{ quote.author + ', ' + quote.book }}</span>
                            </div>
                            <div class="action-quote">
                                <button @click="handleLike(quote, user.userId)">Unlike</button>
                            </div>
                        </div>
                        <div class="tags-likes-quote">
                            <span>Tags: <router-link v-for="(tag, index) in quote.tags" :key="index" to="/">{{ tag }}{{
                                quote.tags.length === index + 1 ? '' : ', ' }}</router-link></span>
                            <router-link to="/">{{ quote.likes.length }} likes</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-content-2">
            <div class="browse-by-tag">
                <h3>TAGS FROM MY QUOTES</h3>
                <div class="search-tag">
                    <input type="text" class="search-tag-text" placeholder="Search for a tag">
                    <input type="submit" class="search-tag-submit" value="Search">
                </div>
                <div class="tags-recommend-list">
                    <!-- <span v-for="(tag, index) in filterTags(quotes)" :key="index" class="tag-recommend-item"><router-link
                            to="/">{{
                                tag }}</router-link> {{ }}</span> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client';
import AuthService from '../services/AuthService';
import UserService from '../services/user.service'
const socket = io('http://localhost:8888')

export default {
    data(){
        return{
            user: {},
            quotes: []
        }
    },
    methods: {
        async getUser(){
            AuthService.checkAuthentication();
            const email = AuthService.user.Email;
            this.user = await UserService.getUserByEmail(email);
            socket.emit('setUserId', this.user.userId);
            this.getQuotesLiked(this.user.userId)
        },
        async getQuotesLiked(userId){
            socket.emit('getQuoteLiked', userId);
            socket.on('getQuoteLiked', (data) => {
                this.quotes = data
            })
        },
        handleLike(quote, userId){
            socket.emit('setLike', quote, userId);
            socket.on('getQuoteLiked', (data) => {
                this.quotes = data
            })
        }
    },
    mounted(){
        this.getUser();
    }
}
</script>
<style scoped>
a {
    color: #00635d;
    font-size: 14px;
}

a:hover {
    text-decoration: underline;
}

.container {
    margin: 20px 100px;
    display: flex;
}

.container-content-1 {
    width: 700px;
    padding: 0 20px;
}
.header-quote-content{
    display: flex;
    align-items: center;
}
.header-quote-content > a{
    font-size: 20px;
    font-weight: 600;
}
.header-quote-content > i {
    margin: 0 5px;
}
.search-quote {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    display: flex;
}

.search-quote-text {
    width: 70%;
    background: #FFFFFF;
    border-radius: 3px;
    border: #DCD6CC 1px solid;
    color: #333333;
    font-size: 14px;
    padding: 5px;
    height: 33px;
    margin-right: 5px;
}

.search-quote-text:focus {
    box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
    border-color: #B9AD99;
    outline: 0px;
}

.search-quote-submit {
    border-radius: 3px;
    border: 1px solid #D6D0C4;
    font-size: 14px;
    cursor: pointer;
    color: #333333;
    background-color: #F4F1EA;
    padding: 8px 12px;
}

.search-quote-submit:hover {
    color: #333333;
    background-color: #ede6d6;
}

.popular-quote-item {
    padding-bottom: 20px;
    border-bottom: 1px solid #d8d8d8;
    margin-bottom: 20px;
}

.content-popular-quote-item {
    display: flex;
}

.content-popular-quote-item>img {
    height: 56px;
    width: 56px;
    border-radius: 50%;
}

.info-quote-item {
    margin-left: 5px;
    width: 70%;
}

.info-quote-item>span {
    display: block;
}

.info-quote-item>span:last-child {
    font-weight: 600;
}
.action-quote {
    margin-left: 10px;
}
.action-quote > button{
    padding: 2px 5px;
    border-radius: 3px;
    border: #DCD6CC 1px solid;
    color: #333333;
    background-color: #F4F1EA;
    cursor: pointer;
    font-size: 12px;
    margin-bottom: 5px;
}

.action-quote > button:hover{
    color: #333333;
    background-color: #ede6d6;
}


.tags-likes-quote {
    font-size: 14px;
    margin-top: 5px;
}

.tags-likes-quote>span:first-child {
    display: block;
}

.tags-likes-quote>a:last-child {
    float: right;
    margin-right: 20px;
    font-size: 14px;
}

.container-content-2 {
    width: 350px;
}

.browse-by-tag {
    margin-top: 20px;
}

.browse-by-tag>h3 {
    padding: 10px 0;
    font-size: 14px;
    border-bottom: 1px solid #d8d8d8;
}

.search-tag {
    margin-top: 10px;
    display: flex;
    width: 100%;
}

.search-tag-text {
    padding: 2px 5px;
    background: #FFFFFF;
    border-radius: 3px;
    border: #DCD6CC 1px solid;
    color: #333333;
    margin-right: 5px;
    width: 60%;
    font-size: 14px;
}

.search-tag-text:focus {
    box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
    border-color: #B9AD99;
    outline: 0px
}

.search-tag-submit {
    padding: 2px 5px;
    border-radius: 3px;
    border: #DCD6CC 1px solid;
    color: #333333;
    font-size: 14px;
    background-color: #F4F1EA;
    cursor: pointer;
}

.search-tag-submit:hover {
    color: #333333;
    background-color: #ede6d6;
}

.tags-recommend-list {
    display: grid;
    grid-template-columns: auto auto;
    margin-top: 20px;
}

.tag-recommend-item {
    font-size: 14px;
    color: #999999;
}
</style>
