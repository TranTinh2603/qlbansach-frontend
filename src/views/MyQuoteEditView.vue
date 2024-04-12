<template>
    <div class="container">
        <div class="content-container-1">
            <div class="header-add-quote">
                <router-link to="/community/quote/">Quote</router-link>
                <i class="fa-solid fa-greater-than"></i>
                <router-link to="/community/quote/my-quote">My Quotes</router-link>
                <i class="fa-solid fa-greater-than"></i>
                <h3>Edit Quote</h3>
            </div>
            <div class="edit-quote-content">
                <span>
                    Before editing a new quote please first do a search and make sure it doesn't already exist in the database.
                </span>
                <form @submit.prevent="editQuote()" class="edit-quote-form">
                        <div class="field-quote">
                            <label class="lable" for="quote">Quote&nbsp;<span>(No need for quotation marks)</span></label>
                            <br>
                            <textarea :class="this.message.quote ? 'error input' : 'input'" ref="quote" name="qoute" id="qoute" cols="50" rows="7" v-model="quote.content"></textarea>
                            <p v-if="this.message.quote" class="message-error">{{ this.message.quote }}</p>
                        </div>
                        <div class="field-author">
                            <label  class="lable" for="author">Author&nbsp;<span>(Start typing for auto-complete. Only put the name please)</span></label>
                            <br>
                            <input @input="getAuthor" :class="this.message.author ? 'error input' : 'input'" ref="author" type="text" id="author" autocomplete="off" v-model="quote.author">
                            <div v-if="authors.length > 0" class="container-recomment">
                                <p v-for="(author, index) in authors" :key="index" @click="handleAuthor(author)" class="recommend-ỉtem" >{{ author.name }}</p>
                            </div>
                            <p v-if="this.message.author" class="message-error">{{ this.message.author }}</p>
                        </div>
                        <div class="field-book">
                            <label  class="lable" for="book">Book&nbsp;<span>(Start typing for auto-completion. Please only enter book titles written by the author)</span></label>
                            <br>
                            <input @input="filterBook" class="input" ref="book" type="text" id="book" v-model="quote.book" autocomplete="off">
                            <div v-if="filteredBooks.length > 0" class="container-recomment">
                                <p v-for="(book, index) in filteredBooks" :key="index" @click="handleBook(book)" class="recommend-ỉtem" >{{ book.name }}</p>
                            </div>
                        </div>
                        <div class="field-tags">
                            <label class="lable" for="tags">Tags&nbsp;<span>(Comma separated: inspirational, science, humor, etc. Limit 10)</span></label>
                            <br>
                            <input class="input" ref="tags" type="text" id="tags" v-model="quote.tags">
                        </div>
                        <div class="field-submit">
                            <input type="submit" value="Save">
                        </div>
                    </form>
            </div>
        </div>
        <div class="content-container-2">
            <div class="quote-uidelines-contnet">
                <h3>Quote Guidelines</h3>
                <ul class="quote-uidelines-list">
                    <li>
                        Only enter quotes from notable people. Generally, a person is notable if they have been the subject of published secondary source material which is reliable, intellectually independent, and independent of the subject.
                    </li>
                    <li>
                        Quotes can be from any source (books, spoken words, news articles, etc) as long as they pass the above criteria.
                    </li>
                    <li>
                        Only enter the author's name in the author field (not their birthdate or which book the quote is from).
                    </li>
                    <li>
                        When entering author names with initials (H.G. Wells, J.K. Rowling), don't put spaces between the initials.
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client';
import AuthService from "../services/AuthService";
import UserService from "../services/user.service";
import QuoteService from "../services/quote.service";
import AuthorService from "../services/author.service";
import BookService from "../services/book.service";
const socket = io('http://localhost:8888')
export default {
    props: {
        quoteId: {type: String, default: ""}
    },
    data(){
        return {
            quote: {},
            user: {},
            message: {},
            authors: [],
            books: [],
            authorTimeoutId: null,
            filteredBooks: []
        }
    },
    methods: {
        async getUser(){
            AuthService.checkAuthentication();
            const email = AuthService.user.Email;
            this.user = await UserService.getUserByEmail(email)
            socket.emit('setUserId', this.user.userId)
        },
        async getQuote(){
            this.quote = await QuoteService.getByQuoteId(this.quoteId);
        },
        async getAuthor(e) {
            clearTimeout(this.authorTimeoutId);
            if (e.target.value) {
                this.authors = await AuthorService.getByNameRecommend(e.target.value);
                this.authorTimeoutId = setTimeout(() => {
                    this.authors = [];
                }, 2000);
            } else {
                this.authors = []
            }
        },
        async editQuote(){
            const date = new Date();
            const timestamp = date.getTime();
            const dataQuote = {
                quoteId: this.quote.quoteId,
                userId: this.quote.userId,
                content: this.quote.content,
                author: this.quote.author,
                book: this.quote.book,
                tags: this.quote.tags,
                likes: this.quote.likes,
                createdAt: timestamp
            };
            if (!this.quote.content) {
                this.message.quote = 'Please enter quote!';
                this.$refs.quote.focus();
            } else if (!this.quote.author) {
                this.message.author = 'Please enter author!';
                this.$refs.author.focus();
            }
            socket.emit('editQuote', dataQuote)
            socket.once('editQuote', (dataQuote) => {
                alert(dataQuote.message)
                this.$router.push({ name: 'community.quote.my-quote' });
            })
        },
        handleAuthor(author) {
            this.quote.author = author.name
            // this.quote.image = author.image
            this.authors = [];
        },
        async getBook() {
            this.books = await BookService.getALl();
        },
        filterBook(e) {
            if (e.target.value) {
                if (this.quote.author) {
                    this.filteredBooks = this.books.filter(book => book.author === this.quote.author && book.name.toLowerCase().includes(e.target.value.toLowerCase()));
                    this.authorTimeoutId = setTimeout(() => {
                        this.filteredBooks = [];
                    }, 2000);
                } else {
                    this.filteredBooks = this.books.filter(book => book.name.toLowerCase().includes(e.target.value.toLowerCase()));
                    this.authorTimeoutId = setTimeout(() => {
                        this.filteredBooks = [];
                    }, 2000);
                }
            } else {
                this.filteredBooks = []
            }
        },
        handleBook(book) {
            this.quote.book = book.name
            this.filteredBooks = [];
        },
    },
    mounted(){
        this.getUser();
        this.getQuote();
        this.getBook()
    }
}
</script>
<style scoped>
    a{
        color: #00635d;
    }
    a:hover {
        text-decoration: underline;
    }
    .container{
        margin: 20px 100px;
        display: flex;
    }
    .content-container-1{
        width: 700px;
    }
    .header-add-quote{
     display: flex;
     align-items: center;
   }
    .header-add-quote > a {
        font-size: 20px;
        font-weight: 600;
   }
   .header-add-quote > i {
        margin: 0 5px;
   }
   .edit-quote-content{
        padding: 10px;
    }
    .edit-quote-form {
        margin-top: 20px;
    }
    .lable{
        font-size: 14px;
    }
    .lable > span {
        font-size: 12px;
        color: #999999;
    }
    .input{
        font-size: 14px;
        padding: 4px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        margin-top: 5px;
        font-family: "Times New Roman", sans-serif;
    }
    .input:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .input.error:focus {
        border-color: red;
    }
    .message-error{
        font-size: 14px;
        color: red;
    }
    .field-quote{
        margin-bottom: 20px
    }
    .field-author{
        position: relative;
        margin-bottom: 20px;
    }
    .container-recomment{
        position: absolute;
        width: 185px;
        background-color: #ffffff;
        border:1px solid #B9AD99;
        border-bottom: none ;
    }
    .recommend-ỉtem{
        padding: 5px;
        cursor: pointer;
        border-bottom: 1px solid #B9AD99;
        font-size: 14px;
    }
    .recommend-ỉtem:hover{
        background-color: #ffb;
    }
    .field-book{
        margin-bottom: 20px;
    }
    .field-tags{
        margin-bottom: 20px;
    }
    .field-submit{
        font-size: 14px;
    }
    .field-submit > input {
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        font-family: "Times New Roman", sans-serif;
        font-size: 14px;
        cursor: pointer;
        color: #333333;     
        background-color: #F4F1EA;
        line-height: 1;
        padding: 8px 12px;
    }
    .field-submit > input:hover {
        color: #333333;
        background-color: #ede6d6;
    }
    .content-container-2{
        margin-left: 20px;
        width: 350px;
    }
    .quote-uidelines-contnet > h3{
        font-size: 16px;
    }
    .quote-uidelines-list{
        padding: 20px;
        font-size: 14px;
    }
</style>