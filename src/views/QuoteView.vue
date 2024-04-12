<template>
    <div class="container">
        <div class="container-content-1">
            <div class="popular-quote-content">
                <h2>Popular quotes</h2>
                <div class="search-quote">
                    <input type="text" class="search-quote-text" placeholder="Find quotes by keywords, author">
                    <input type="submit" class="search-quote-submit" value="Search quote">
                </div>
                <div class="navigation-bar">
                    <button @click="navigationActive = 'popular'" :class="navigationActive === 'popular' ? 'navigation-item-active': ''">Popular</button>
                    <button @click="navigationActive = 'recent'" :class="navigationActive === 'recent' ? 'navigation-item-active': ''">Recent</button>
                    <button @click="navigationActive = 'new'" :class="navigationActive === 'new' ? 'navigation-item-active' : ''">New</button>
                    <button @click="navigationActive = 'friends'" :class="navigationActive === 'friends' ? 'navigation-item-active' : ''">Friends</button>
                    <button @click="navigationActive = 'author'" :class="navigationActive === 'author' ? 'navigation-item-active' : ''">Author</button>
                </div>
                <div class="popular-quotes-list">
                    <div  v-if="quotes.length > 0" v-for="(quote, index) in filterQuotes()" :key="index" class="popular-quote-item">
                        <div class="content-popular-quote-item">
                            <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1429114964i/9810._UX200_CR0,14,200,200_.jpg" alt="">
                            <div class="info-quote-item">
                                <span>“{{ quote.content }}”</span>
                                <span>― {{ quote.author + ', '+ quote.book }}</span>
                            </div>
                            <button v-if="checkLike(quote, user.userId) === false" @click="handleLike(quote, user.userId)" class="action-like">Like</button>
                            <button v-if="checkLike(quote, user.userId)" @click="handleLike(quote, user.userId)" class="action-like">Unlike</button>
                        </div>
                        <div class="tags-likes-quote">
                            <span>Tags: <router-link v-for="(tag, index) in quote.tags" :key="index" to="/">{{ tag }}{{ quote.tags.length === index+1 ? '' : ', ' }}</router-link></span>
                            <router-link to="/">{{ quote.likes.length }} likes</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-content-2">
            <div class="my-liked-add-quote-content">
                <router-link to="/community/quote/my-quote">My Quotes</router-link>
                <span> | </span>
                <router-link to="/community/quote/add">Add a Quote</router-link>
                <span> | </span>
                <router-link to="/community/quote/liked-quote">Liked Quotes</router-link>
            </div>
            <div class="browse-by-tag">
                <h3>BROWSE BY TAG</h3>
                <div class="search-tag">
                    <input type="text" class="search-tag-text" placeholder="Search for a tag">
                    <input type="submit" class="search-tag-submit" value="Search">
                </div>
                <div class="tags-recommend-list">
                    <span v-for="(tag, index) in tags" :key="index" class="tag-recommend-item"><router-link to="/">{{ tag.name }}</router-link> {{ countQuoteByTag(tag.name) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client';
const socket = io('http://localhost:8888');
import UserService from '../services/user.service';
import AuthService from '../services/AuthService';
import TagService from '../services/tag.service';
export default {
    data(){
        return {
            user: {},
            quotes: [],
            tags: [],
            navigationActive: 'popular',
        }
    },
    methods: {
        async getUser() {
            AuthService.checkAuthentication();
            const email = AuthService.user.Email;
            this.user = await UserService.getUserByEmail(email);
            socket.emit('setUserId', this.user.userId)
        },
    
        async getAllTags(){
            this.tags = await TagService.getAll();
        },

        handleLike(quote, userId){
            socket.emit('setLike', quote, userId);
        },
        checkLike(quote, userId){
            const isLike = quote.likes.includes(userId);
            return isLike
        },
        filterQuotes(){
            if(this.navigationActive === 'popular') {
                return this.quotes.sort((a, b) => b.likes.length - a.likes.length)
            } else if(this.navigationActive === 'recent') {
                return []
            } else if (this.navigationActive === 'new') {
                return this.quotes.sort((a, b) => b.createdAt - a.createdAt)
            } else if (this.navigationActive === 'friends') {
                return this.quotes.filter(quote => this.user.Friends.includes(quote.userId));
            } else if (this.navigationActive === 'author') {
                return []
            }
        },
        countQuoteByTag(tagName){
            const quotesByTag = this.quotes.filter(quote => quote.tags.includes(tagName))
            let count = quotesByTag.length
            if (count > 1000) {
                count = count / 1000
                return count + 'k'
            } else {
                return count
            }
        }

    },
    mounted(){
        this.getUser();
        socket.emit('getQuote')
        socket.on('getQuote', (data) => {
            this.quotes = data
        });
        this.getAllTags();
    }
}
</script>
<style scoped>
    a{
        color: #00635d;
        font-size: 14px;
    }
    a:hover {
        text-decoration: underline;
    }
    .container{
        margin: 20px 100px;
        display: flex;
    }
    .container-content-1{
        width: 700px;
        padding: 0 20px;
    }
    .search-quote{
        margin-top: 20px;
        margin-bottom: 20px;
        width: 100%;
        display: flex;
    }
    .search-quote-text{
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
    .search-quote-text:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .search-quote-submit{
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        font-size: 14px;
        cursor: pointer;
        color: #333333;
        background-color: #F4F1EA;
        padding: 8px 12px;
    }
    .search-quote-submit:hover{
        color: #333333;
        background-color: #ede6d6;
    }
    .navigation-bar {
        border-bottom: 1px solid #D8D8D8;
        margin-bottom: 20px;
    }
    .navigation-bar > button{
        border: none;
        background-color: transparent;
        padding: 10px 15px;
        margin: 0 5px;
        cursor: pointer;
    }
    .navigation-bar > button:hover{
        border-bottom: 2px solid black;
    }
    .navigation-bar > .navigation-item-active{
        border-bottom: 2px solid black;
    }
    .popular-quote-item{
        padding-bottom: 20px;
        border-bottom: 1px solid #d8d8d8;
        margin-bottom: 20px;
    }
    .content-popular-quote-item{
        display: flex;
    }
    .content-popular-quote-item > img{
        height: 56px;
        width: 56px;
        border-radius: 50%;
    }
    .info-quote-item{
        margin-left: 5px;
        width: 70%;
    }
    .info-quote-item > span{
        display: block;
    }
    .info-quote-item > span:last-child{
        font-weight: 600;
    }
    .action-like{
        cursor: pointer;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        font-size: 11px;
        padding: 4px 12px;
        margin-left: 10px;
        color: #333333;
        background-color: #F4F1EA;
        height: 20px;
    }
    .action-like:hover{
        color: #333333;
        background-color: #ede6d6;
    }
    .tags-likes-quote{
        font-size: 14px;
        margin-top: 5px;
    }
    .tags-likes-quote > span:first-child{
        display: block;
    }
    .tags-likes-quote > a:last-child{
        float: right;
        margin-right: 20px;
        font-size: 14px;
    }
    .container-content-2{
        width: 350px;
    }
    .my-liked-add-quote-content{
        margin-top: 20px;
        font-size: 14px;
        color: #00635d;
    }

    .browse-by-tag{
        margin-top: 20px;
    }
    .browse-by-tag > h3{
        padding: 10px 0;
        font-size: 14px;
        border-bottom: 1px solid #d8d8d8;
    }
    .search-tag{
        margin-top: 10px;
        display: flex;
        width: 100%;
    }
    .search-tag-text{
        padding: 2px 5px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        margin-right: 5px;
        width: 60%;
        font-size: 14px;
    }
    .search-tag-text:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px
    }
    .search-tag-submit{
        padding: 2px 5px;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        font-size: 14px;
        background-color: #F4F1EA;
        cursor: pointer;
    }
    .search-tag-submit:hover{
        color: #333333;
        background-color: #ede6d6;
    }
    .tags-recommend-list{
        display: grid;
        grid-template-columns: auto auto;
        margin-top: 20px;
    }
    .tag-recommend-item{
        font-size: 14px;
        color: #999999;
    }
</style>