<template>
    <div class="container">
        <div class="header">
            <h4>UPDATES</h4>
            <div class="customize">
                <i class="fa-solid fa-gear"></i>
                <p>Customize</p>
            </div>
        </div>
        <div v-for="(post, index) in sortPost()" :key="index" class="posts">
            <div class="info-posts">
                <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1495635816i/32521178._UX96_CR0,22,96,96_.jpg" alt="">
                <div class="detail-info-posts">
                    <router-link class="user-posts" to="/a">{{ getInFoUserPost(post.userId) ? getInFoUserPost(post.userId).firstName + ' ' +  getInFoUserPost(post.userId).lastName : ''}}</router-link>
                    <span style="text-transform: lowercase;">{{' ' + post.content }}</span>
                    <p class="time-posts">{{ getDifference(post.createdAt) }}</p>
                </div>
            </div>
            <div class="content-post">
                <img :src="getBookByBookId(post.bookId) ? getBookByBookId(post.bookId).image : ''" alt="">
                <div class="info-book">
                    <router-link :to="'/book/detail/' + post.bookId" class="name-book">{{ getBookByBookId(post.bookId) ? getBookByBookId(post.bookId).name : ''}}</router-link>
                    <div class="author-book">
                        <span >by </span>
                        <router-link class="author-name" :to="getBookByBookId(post.bookId) && getBookByBookId(post.bookId).author ? '/author/detail/' + getBookByBookId(post.bookId).author : ''">{{ getBookByBookId(post.bookId) ? getBookByBookId(post.bookId).author : '' }}</router-link>
                    </div>
                    <div :class="'status-book'  + (checkStatusBook(post.bookId) ? '' : ' status-none')">
                        <div class="status-name">
                            <i v-if="checkStatusBook(post.bookId)" class="fa-solid fa-check"></i>
                            <p @click="checkStatusBook(post.bookId) ?  '' : handleAddMyBook(post.bookId, user.userId)">{{ checkStatusBook(post.bookId) ? checkStatusBook(post.bookId).status : "Want To Read" }}</p>
                        </div>
                        <div class="status-change" @click="toggleDropdown(index)">
                            <i class="fa-solid fa-caret-down"></i>
                            <div v-show="dropdownMenu === index" class="dropdown-menu">
                                <div @click="handleUpdateMyBook(user.userId, post.bookId, 'Want To Read')" class="dropdown-item">
                                    <i v-if="checkStatusBook(post.bookId) && checkStatusBook(post.bookId).status && checkStatusBook(post.bookId).status === 'Want To Read'" class="fa-solid fa-check"></i>
                                    <span>Want To Read</span>
                                </div>
                                <div @click="handleUpdateMyBook(user.userId, post.bookId, 'Currently Reading')" class="dropdown-item">
                                    <i  v-if="checkStatusBook(post.bookId) && checkStatusBook(post.bookId).status && checkStatusBook(post.bookId).status === 'Currently Reading'" class="fa-solid fa-check"></i>
                                    <span>Currently Reading</span>
                                </div>
                                <div @click="handleUpdateMyBook(user.userId, post.bookId, 'Read')" class="dropdown-item">
                                    <i  v-if="checkStatusBook(post.bookId) && checkStatusBook(post.bookId).status && checkStatusBook(post.bookId).status === 'Read'" class="fa-solid fa-check"></i>
                                    <span>Read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="description">
                        <p>
                        {{ getBookByBookId(post.bookId) ? getBookByBookId(post.bookId).description : '' }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="interact">
                <div class="interact-number">
                    <div class="number-like">
                        <i class="fa-solid fa-heart"></i>
                        <p>{{ post.likes.length }}</p>
                    </div>
                    <div class="number-comment">
                        <i class="fa-solid fa-comment"></i>
                        <p>{{ post.comments.length }}</p>
                    </div>
                </div>
                <div class="interact-way">
                    <div class="interact-way-like" @click="handleLikePost(post, user.userId) ">
                        <i :class="(checkLikePost(post, user.userId) ? 'fa-solid' :'fa-regular') + ' fa-heart'"></i>
                        <p>Like</p>
                    </div>
                    <div @click="showModal(index)" class="interact-way-comment">
                        <i class="fa-regular fa-comment"></i>
                        <p>Bình luận</p>
                    </div>
                </div>
                <p @click="showModal(index)" v-if="post.comments.length > 0" class="view-more-comment">Xem thêm bình luận</p>
                <div v-if="post.comments.length > 0" class="comment">
                    <div v-for="(comment, index) in post.comments" :key="index">
                        <div class="content-detail-comment">
                            <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545314990i/10433999._SY180_.jpg" alt="">
                            <div class="detail-comment">
                                <div class="info-user-comment">
                                    <p class="name-user">{{  findUserCommetByUserId(comment.userId, userComments) ?  findUserCommetByUserId(comment.userId, userComments).fristName + ' ' + findUserCommetByUserId(comment.userId, userComments).lastName : ''}}</p>
                                    <p>{{ comment.content }}</p>
                                </div>
                                <div class="interact-comment">
                                    <p>{{ getDifference(comment.createdAt) }}</p>
                                    <p @click="updateLikeComment(user.userId, comment.commentId, post)">{{ comment.likes.length }} Thích</p>
                                    <p @click="showFormReply(index)" >{{ comment.replys.length }} Phản hồi</p>
                                    <div @click="handleShowCommentOption(comment.commentId)" class="option-comment">
                                        <div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <div v-if="showCommentOption === comment.commentId" class="menu-option-comment">
                                            <p v-if="post.userId === user.userId || comment.userId === user.userId" @click="deleteComment(post._id, comment.commentId)">Xóa bình luận</p>
                                            <p>Báo cáo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content-write-reply-comment" v-show="formReply === index">
                            <img style="width: 20px; height: 20px; margin-top: 3px; margin-right: 5px;" src="../../arrow-turn-down-right-svgrepo-com.svg" alt="">
                            <form @submit.prevent="addReplyComment(post, comment, user.userId, replyCommentText)" class="form-write-reply-comment">
                                <input type="text" placeholder="Viết bình luận" v-model="replyCommentText">
                                <button>
                                    <i class="fa-solid fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                        <div v-for="(reply, index) in comment.replys" class="content-detail-comment-reply" :key="index">
                            <img style="width: 20px; height: 20px; margin-top: 3px; margin-right: 5px;" src="../../arrow-turn-down-right-svgrepo-com.svg" alt="">
                            <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545314990i/10433999._SY180_.jpg" alt="">
                            <div class="detail-comment-reply">
                                <div class="info-user-comment-reply">
                                    <p class="name-user">{{ findUserCommetByUserId(comment.userId, userComments) ? findUserCommetByUserId(reply.userId, userComments).fristName + ' ' + findUserCommetByUserId(reply.userId, userComments).lastName : '' }}</p>
                                    <p>{{ reply.content }}</p>
                                </div>
                                <div class="interact-comment-reply">
                                    <p>{{ getDifference(reply.createdAt) }}</p>
                                    <div @click="handleShowCommentOption(reply.replyId)" class="option-comment-reply">
                                        <div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <div v-if="showCommentOption === reply.replyId" class="menu-option-comment">
                                            <p v-if="post.userId === user.userId || comment.userId === user.userId || reply.userId === user.userId" @click="deleteReplyComment(post._id, comment.commentId, reply.replyId)">Xóa bình luận</p>
                                            <p>Báo cáo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div v-if="show === index" class="modal">
                        <div class="modal-content">
                            <div class="header-modal">
                                <strong>Post By {{ getInFoUserPost(post.userId) ? getInFoUserPost(post.userId).firstName + ' ' + getInFoUserPost(post.userId).lastName : '' }}</strong>
                                <span class="close" @click="showModal(null)" ><i class="fa-solid fa-xmark"></i></span>
                            </div>
                            <div class="body-modal">
                                <div class="info-posts">
                                    <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1495635816i/32521178._UX96_CR0,22,96,96_.jpg" alt="">
                                    <div class="detail-info-posts">
                                        <router-link class="user-posts" to="/a">{{ getInFoUserPost(post.userId) ? getInFoUserPost(post.userId).firstName + ' ' + getInFoUserPost(post.userId).lastName : '' }}</router-link>
                                        <span style="text-transform: lowercase;">{{ ' ' + post.content }}</span>
                                        <p class="time-posts">{{ getDifference(post.createdAt) }}</p>
                                    </div>
                                </div>
                                <div class="content-post">
                                    <img :src="getBookByBookId(post.bookId) ? getBookByBookId(post.bookId).image : ''" alt="">
                                    <div class="info-book">
                                        <router-link :to="'/book/detail/' + post.bookId" class="name-book">{{ getBookByBookId(post.bookId) ? getBookByBookId(post.bookId).name : '' }}</router-link>
                                        <div class="author-book">
                                            <span >by </span>
                                            <router-link class="author-name" :to="getBookByBookId(post.bookId) && getBookByBookId(post.bookId).author ? '/author/detail/' + getBookByBookId(post.bookId).author : ''">{{ getBookByBookId(post.bookId) ? getBookByBookId(post.bookId).author : '' }}</router-link>
                                        </div>
                                        <div :class="'status-book' + (checkStatusBook(post.bookId) ? '' : ' status-none')">
                                            <div class="status-name">
                                                <i v-if="checkStatusBook(post.bookId)" class="fa-solid fa-check"></i>
                                                <p @click="checkStatusBook(post.bookId) ? '' : handleAddMyBook(post.bookId, user.userId)">{{ checkStatusBook(post.bookId) ? checkStatusBook(post.bookId).status : "Want To Read" }}</p>
                                            </div>
                                            <div class="status-change" @click="toggleDropdown(index)">
                                                <i class="fa-solid fa-caret-down"></i>
                                                <div v-show="dropdownMenu === index" class="dropdown-menu">
                                                    <div @click="handleUpdateMyBook(user.userId, post.bookId, 'Want To Read')" class="dropdown-item">
                                                        <i v-if="checkStatusBook(post.bookId) && checkStatusBook(post.bookId).status && checkStatusBook(post.bookId).status === 'Want To Read'" class="fa-solid fa-check"></i>
                                                        <span>Want To Read</span>
                                                    </div>
                                                    <div @click="handleUpdateMyBook(user.userId, post.bookId, 'Currently Reading')" class="dropdown-item">
                                                        <i  v-if="checkStatusBook(post.bookId) && checkStatusBook(post.bookId).status && checkStatusBook(post.bookId).status === 'Currently Reading'" class="fa-solid fa-check"></i>
                                                        <span>Currently Reading</span>
                                                    </div>
                                                    <div @click="handleUpdateMyBook(user.userId, post.bookId, 'Read')" class="dropdown-item">
                                                        <i  v-if="checkStatusBook(post.bookId) && checkStatusBook(post.bookId).status && checkStatusBook(post.bookId).status === 'Read'" class="fa-solid fa-check"></i>
                                                        <span>Read</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="description">
                                            <p>
                                            {{ getBookByBookId(post.bookId) ? getBookByBookId(post.bookId).description : '' }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="interact-number">
                                    <div class="number-like">
                                        <i class="fa-solid fa-heart"></i>
                                        <p>{{ post.likes.length }}</p>
                                    </div>
                                    <div class="number-comment">
                                        <i class="fa-solid fa-comment"></i>
                                        <p>{{ post.comments.length }}</p>
                                    </div>
                                </div>
                                <div class="interact-way">
                                    <div class="interact-way-like" @click="handleLikePost(post, user.userId)">
                                        <i :class="(checkLikePost(post, user.userId) ? 'fa-solid' : 'fa-regular') + ' fa-heart'"></i>
                                        <p>Like</p>
                                    </div>
                                    <div class="interact-way-comment">
                                        <i class="fa-regular fa-comment"></i>
                                        <p>Bình luận</p>
                                    </div>
                                </div>
                                <div v-if="post.comments.length > 0" class="modal-comment">
                                    <div v-for="(comment, index) in post.comments" :key="index">
                                        <div class="content-detail-comment">
                                            <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545314990i/10433999._SY180_.jpg" alt="">
                                            <div class="detail-comment">
                                                <div class="info-user-comment">
                                                    <p class="name-user">{{ findUserCommetByUserId(comment.userId, userComments).fristName + ' ' + findUserCommetByUserId(comment.userId, userComments).lastName }}</p>
                                                    <p>{{ comment.content }}</p>
                                                </div>
                                                <div class="interact-comment">
                                                    <p>{{ getDifference(comment.createdAt) }}</p>
                                                    <p @click="updateLikeComment(user.userId, comment.commentId, post)">{{ comment.likes.length }} Thích</p>
                                                    <p @click="showFormReply(index)" >{{ comment.replys.length }} Phản hồi</p>
                                                    <div @click="handleShowCommentOption(comment.commentId)" class="option-comment">
                                                        <div>
                                                            <div></div>
                                                            <div></div>
                                                            <div></div>
                                                        </div>
                                                        <div v-if="showCommentOption === comment.commentId" class="menu-option-comment">
                                                            <p v-if="post.userId === user.userId || comment.userId === user.userId" @click="deleteComment(post._id, comment.commentId)">Xóa bình luận</p>
                                                            <p>Báo cáo</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content-write-reply-comment" v-show="formReply === index">
                                            <img style="width: 20px; height: 20px; margin-top: 3px; margin-right: 5px;" src="../../arrow-turn-down-right-svgrepo-com.svg" alt="">
                                            <form @submit.prevent="addReplyComment(post, comment, user.userId, replyCommentText)" class="form-write-reply-comment">
                                                <input type="text" placeholder="Viết bình luận" v-model="replyCommentText">
                                                <button>
                                                    <i class="fa-solid fa-paper-plane"></i>
                                                </button>
                                            </form>
                                        </div>
                                        <div v-for="(reply, index) in comment.replys" class="content-detail-comment-reply" :key="index">
                                            <img style="width: 20px; height: 20px; margin-top: 3px; margin-right: 5px;" src="../../arrow-turn-down-right-svgrepo-com.svg" alt="">
                                            <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545314990i/10433999._SY180_.jpg" alt="">
                                            <div class="detail-comment-reply">
                                                <div class="info-user-comment-reply">
                                                    <p class="name-user">{{ findUserCommetByUserId(reply.userId, userComments).fristName + ' ' + findUserCommetByUserId(reply.userId, userComments).lastName }}</p>
                                                    <p>{{ reply.content }}</p>
                                                </div>
                                                <div class="interact-comment-reply">
                                                    <p>{{ getDifference(reply.createdAt) }}</p>
                                                    <div @click="handleShowCommentOption(reply.replyId)" class="option-comment-reply">
                                                        <div>
                                                            <div></div>
                                                            <div></div>
                                                            <div></div>
                                                        </div>
                                                        <div v-if="showCommentOption === reply.replyId" class="menu-option-comment">
                                                            <p v-if="post.userId === user.userId || comment.userId === user.userId || reply.userId === user.userId"  @click="deleteReplyComment(post._id, comment.commentId, reply.replyId)" >Xóa bình luận</p>
                                                            <p>Báo cáo</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="write-comment">
                                <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545314990i/10433999._SY180_.jpg" alt="">
                                <form @submit.prevent="addComment(post, user.userId)" class="content-write-comment">
                                    <input type="text" placeholder="Viết bình luận" v-model="post.commentText">
                                    <button>
                                        <i class="fa-solid fa-paper-plane"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="write-comment">
                    <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545314990i/10433999._SY180_.jpg" alt="">
                    <form @submit.prevent="addComment(post, user.userId)" class="content-write-comment">
                        <input type="text" placeholder="Viết bình luận" v-model="post.commentText">
                        <button>
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AuthService from '../services/AuthService';
import UserService from '../services/user.service';
import PostService from '../services/post.service';
import BookService from '../services/book.service';
import MyBookService from '../services/myBook.service';
export default {
    data(){
        return{
            user: {},
            posts: [],
            friends: [],
            books: [],
            myBook: [],
            dropdownMenu: null,
            formReply: null,
            replyCommentText: '',
            show: null,
            userComments: [],
            showCommentOption: null,
        }
    },
    methods: {
        async getUser(){
            AuthService.checkAuthentication();
            const email = AuthService.user.email;
            this.user = await UserService.getUserByEmail(email)
            this.getPostByUserId(this.user.friends)
            this.getUserPostByUserId(this.user.friends)
            this.getMyBook(this.user.userId)
        },
        async getMyBook(userId){
            this.myBook = await MyBookService.getByUserId(userId);
        },
        async getBook(posts){
            for (const post of posts) {
                const book = await BookService.getByBookId(post.bookId);
                this.books.push(book);
            }
        },
        async getUserPostByUserId(Friends){
            for (const friendId of Friends) {
                const friend = await UserService.get(friendId)
                this.friends.push(friend)
            }
        },
        async getPostByUserId(Friends){
            const postsLocal = [];
            for (const friendId of Friends) {
                const post = await PostService.getPostByUserId(friendId)
                post["commentText"] = '';
                postsLocal.push(post);
            }
            this.posts = [].concat(...postsLocal)
            this.sortPost()
            this.getBook(this.posts)
            this.getUserCommentByUserId(this.posts)
        },
        async getUserCommentByUserId(posts){
            for (const post of posts) {
                for (const comment of post.comments){
                    const check = this.userComments.some(userComment => userComment.userId === comment.userId)
                    if (check === false) {
                        this.userComments.push(await UserService.get(comment.userId))
                    }
                    for (const reply of comment.replys){
                        const check1 = this.userComments.some(userComment => userComment.userId === reply.userId)
                        if (check1 === false) {
                            this.userComments.push(await UserService.get(reply.userId))
                        }
                    }
                }
            }
        },
        findUserCommetByUserId(userId, userComments){
            const userComment = userComments.find(userComment => userComment.userId === userId);
            return userComment
        },
        sortPost(){
            return this.posts.sort((a, b) => b.createdAt - a.createdAt);
        },
        getInFoUserPost(userId){
           return this.friends.find(friend => friend.userId == userId)
        },
        getBookByBookId(bookId){
            return this.books.find(book => book.bookId == bookId)
        },
        checkStatusBook(bookId){
            return this.myBook.find(book => book.bookId == bookId)
        },

        toggleDropdown(index) {
            this.dropdownMenu = this.dropdownMenu === index ? null : index;
        },
        async handleAddMyBook(bookId, userId) {
            try {
                const date = new Date()
                const timestamp = date.getTime();
                const data = {
                    userId: userId,
                    bookId: bookId,
                    status: 'Want To Read',
                    bookshelves: '',
                    createdAt: timestamp
                }
                const dataPost = {
                    userId: userId,
                    bookId: bookId,
                    content: 'Want To Read',
                    createdAt: timestamp,
                    likes: [],
                    comments: [],
                }
                const create = await MyBookService.create(data);
                console.log(create);
                if (create) {
                    const createPost = await PostService.create(dataPost);
                    alert("Create success!");
                    window.location.reload();
                } else {
                    alert("Create failure!");
                }
            } catch (error) {
                console.log(error);
            }
            
        },
        async handleUpdateMyBook(userId, bookId, status) {
            try {
                const date = new Date()
                const timestamp = date.getTime();
                const data = {
                    userId: userId,
                    bookId: bookId,
                    status: status,
                    bookshelves: '',
                    createdAt: timestamp
                }
                const update = await MyBookService.update(userId, bookId, data);
                if (update) {
                    alert(update.message);
                    window.location.reload();
                } else {
                    alert("Update failure!");
                }
            } catch (error) {
                
            }
        },
        checkLikePost(post, userId) {
            return post.likes.some(like => like === userId);
        },
         async handleLikePost(post, userId) {

            try {
                const liked = this.checkLikePost(post, userId);
                if (liked) {
                    const index = post.likes.indexOf(userId);
                    if (index !== -1) {
                        post.likes.splice(index, 1);
                    }
                } else {
                    post.likes.push(userId);
                }

                console.log('post', post._id);
                const data = {
                    userId: userId,
                }
               const update = await PostService.update(post._id, data)
               console.log(update);
            } catch (error) {
                console.log(error);
            }
           
        },
        async addComment(post, userId){
            try {
                const date = new Date();
                const timestamp = date.getTime();
                const randomString = Math.random().toString(36).substring(5);
                const result = randomString + '_' + timestamp;
                const data = {
                    commentId: result,
                    userId: userId,
                    content: post.commentText,
                    createdAt: timestamp,
                    likes: [],
                    replys: [],
                }
                post.comments.push(data);
                const updateComment = await PostService.updateComment(post._id, data)
                post.commentText = ''
            } catch (error) {
                console.log(error);
            }
        },
        showFormReply(index){
            this.formReply = this.formReply === index ? null : index;
        },
        async addReplyComment(post, comment, userId, replyCommentText){
            const date = new Date();
            const timestamp = date.getTime();
             const randomString = Math.random().toString(36).substring(5);
            const result = randomString + '_' + timestamp;
            const data = {
                replyId: result,
                userId: userId,
                content: replyCommentText,
                likes: [],
                createdAt: timestamp,
            }
            comment.replys.push(data);
            const updateReply = await PostService.updateReplyComment(post._id, comment.userId, comment.createdAt, data);
            this.replyCommentText = '';
            this.formReply = null
        },
        getDifference(createdAt) {
            const date = new Date();
            const timestamp = date.getTime();
            var timeDifference = Math.abs(timestamp - createdAt); 
            var milliseconds = timeDifference % 1000;
            timeDifference = (timeDifference - milliseconds) / 1000;
            var seconds = timeDifference % 60;
            timeDifference = (timeDifference - seconds) / 60;
            var minutes = timeDifference % 60;
            timeDifference = (timeDifference - minutes) / 60;
            var hours = timeDifference % 24;
            var days = (timeDifference - hours) / 24;
           if (days > 0) {
            if (days > 30) {
                return 'than 1 month ago';
            }else{
                return days + ' day ago'
            }
           } else if (hours > 0) {
            return hours + ' hour ago'
           } else if (minutes > 0) {
            return minutes + ' minute ago'
           } else if (seconds > 0) {
            return seconds + ' second ago'
           } else {
            return 'Vừa xong'
           }
        },
        async updateLikeComment(userId, commentId, post){
           try {
                const comment = post.comments.find(comment => comment.commentId === commentId)
                const check = comment.likes.indexOf(userId)
                console.log(check);
                if (check >= 0){
                    console.log(check);
                    comment.likes.splice(check, 1)
                } else {
                    comment.likes.push(userId)
                }
                const data = {
                    userId: userId,
                }
                const updateLikeComment = await PostService.updateLikeComment(post._id, commentId, data)
           } catch (error) {
                console.log(error);
           }

        },
        showModal(index) {
            this.show = index;
        },
        handleShowCommentOption(index){
            this.showCommentOption = this.showCommentOption === index ? null : index
        },
        async deleteComment(postId, commentId){
            const post = this.posts.find(post => post._id === postId);
            const comment = post.comments.findIndex(comment => comment.commentId === commentId)
            if (comment > -1){
                post.comments.splice(comment, 1)
            }

            const deleteComment = await PostService.deleteComment(post._id, commentId)
        },
        async deleteReplyComment(postId, commentId, replyId){
            const post = this.posts.find(post => post._id === postId);
            const comment = post.comments.find(comment => comment.commentId === commentId)
            const reply = comment.replys.findIndex(reply => reply.replyId === replyId)
            if (reply > -1){
                comment.replys.splice(reply, 1)
            }
            const deleteReply = await PostService.deleteReplyComment(postId, commentId, replyId)
        }

    },
    mounted(){
        this.getUser();
    }
}
</script>
<style scoped>
.modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.408);
    }

    .modal-content {
        /* position: relative; */
        background-color: #fefefe;
        margin: 50px auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
        border-radius: 5px;
        height: 80vh;
        padding: 10px;
        overflow: auto;
        width: 50%;
        /* animation: mymove 1s;
        animation-fill-mode: forwards;
        animation-timing-function: ease; */
    }
    .modal-content::-webkit-scrollbar{
        width: 0;
    }


    .header-modal{
        display: flex;
        justify-content: space-between;
        background-color: #ffffff;
        padding: 10px 20px ;
        align-items: center;
    }

    .header-modal > span {
        cursor: pointer;
    }
    .body-modal{
        padding: 0 20px;
        padding-bottom: 20px;
        height: 80%;
        overflow: auto;
    }
    .body-modal::-webkit-scrollbar{
        width: 0;
    }

    /* @keyframes mymove {
        from {top: 0px;}
        to {top: 100px;}
    } */

.container {
    height: 90vh;
    overflow: auto;
}
.container::-webkit-scrollbar{
    width: 0;
}
.header{
    display: flex;
    justify-content: space-between;
}
.customize{
    display: flex;
    align-items: center;
}
.customize > p {
    margin-left: 3px;
}

.posts{
    background-color: #ffffff;
    margin-top: 10px;
    padding: 5px;
    border:1px solid #D8D8D8;
    border-radius:5px;
}

.info-posts{
    display: flex;
    align-items: center;
}

.info-posts > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.detail-info-posts{
    margin-left: 5px;
}

.user-posts{
    font-weight: 600;
}

.time-posts{
    font-size: 14px;
}

.content-post{
    display: flex;
    margin: 10px;
}

.content-post > img {
    width: 120px;
    height: 180px;
}

.info-book{
    margin-left: 10px;
    padding: 5px;
}

.name-book{
    font-weight: 600;
    font-size: 18px;
}

.name-book:hover{
    text-decoration: underline;
}

.author-book{
    font-size: 16px;
}
.author-name:hover{
    text-decoration: underline;
}

.status-book{
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #F2F2F2;
    width: 150px;
    border-radius: 3px;
    height: 30px;
    cursor: pointer;
}
.status-name{
    display: flex;
    align-items: center;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    padding-left: 5px;
}
.status-name > i {
    margin-right: 5px;
}
.status-name > p {
    font-size: 14px;
    width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.status-none {
    background-color: #409D69;
    color: #ffffff;
}
.status-change{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    background-color: #409D69;
    color: #ffffff;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    border-left:1px solid #38883d ;
}
.dropdown-menu {
    position: absolute;
    top: 100%;
    width: 150px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);

}


.dropdown-item {
    font-size: 14px;
    padding: 8px 12px;
    cursor: pointer;
    color: #333333;
}
.dropdown-item > i {
    margin-right: 5px;
}

.dropdown-item:hover {
    background-color: #f0f0f0;
}

.description{
    margin-top: 10px;
}
.description > p{
    max-height: 55px;
    overflow-y: hidden;
    text-overflow: ellipsis;
}
.interact{
    margin: 20px;
}

.interact-number {
    display: flex;
}
.number-like{
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-right: 20px;
}
.number-like > i { 
    color: #ff3040;
}
.number-like > p{
    margin-left: 5px;
    user-select: none;
}
.number-comment{
    display: flex;
    cursor: pointer;
    align-items: center;
}
.number-comment > i {
    color: #606770;
}

.number-comment > p{
    margin-left: 5px;
    user-select: none;
}
.interact-way{
    display: flex;
    margin: 10px 0;
    padding: 10px;
    border-top: 1px solid #989a9c;
    border-bottom: 1px solid #989a9c;
}

.interact-way-like{
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
}
.interact-way-like i {
    color: #ff3040;
}
.interact-way-like > p {
    margin-left: 5px;
    user-select: none;
}
.interact-way-comment{
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
}
.interact-way-comment > i {
    color: #606770;
}
.interact-way-comment > p {
    margin-left: 5px;
    user-select: none;
}

.view-more-comment{
    cursor: pointer;
}
.view-more-comment:hover{
    text-decoration: underline;
}

.comment{
    height: 150px;
    overflow: auto;

}
.comment::-webkit-scrollbar{
    width: 0;
}
.content-detail-comment{
    margin-top: 20px;
    display: flex;
    
}
.content-detail-comment > img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
}

.detail-comment{
    margin-left: 10px;
    max-width: 75%;
}

.info-user-comment{
    padding: 10px;
    background-color: #f0f2f5;
    border-radius: 10px;
}

.name-user{
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    margin-bottom: 5px;
}

.interact-comment{
    display: flex;
    margin-top: 5px;
}
.interact-comment > p {
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    margin-right: 10px;
}
.option-comment {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.option-comment > div:nth-child(1){
    display: flex;
    align-items: center;
    justify-content: center;
}

.option-comment > div > div{
    height: 4px;
    width: 4px;
    border-radius: 50%;
    background-color: #606770;
    margin-right: 2px;
}
.menu-option-comment{
    position: absolute;
    top: -25px;
    left: 20px;
    width: 150px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.menu-option-comment > p {
    font-size: 14px;
    padding: 8px 12px;
    cursor: pointer;
    color: #333333;
}
.content-write-reply-comment{
    margin-left: 20px;
    margin-top: 5px;
    width: 350px;
    display: flex;
}
.form-write-reply-comment{
    border-radius: 20px;
    padding: 3px 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f0f2f5;
}
.form-write-reply-comment > input {
    width: 80%;
    border: none;
    background-color: transparent;
    outline: none;
}
.form-write-reply-comment > button {
    cursor: pointer;
    padding: 3px;
    border: none;
    background-color: transparent;
}

.content-detail-comment-reply {
    margin-top: 10px;
    display: flex;
    margin-left: 20px;
}

.content-detail-comment-reply > img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
}
.detail-comment-reply{
    margin-left: 10px;
    max-width: 75%;
}

.info-user-comment-reply{
    padding: 10px;
    background-color: #f0f2f5;
    border-radius: 10px;
}

.name-user{
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    margin-bottom: 5px;
}

.interact-comment-reply{
    display: flex;
    margin-top: 5px;
}
.interact-comment-reply > p {
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    margin-right: 10px;
}
.option-comment-reply {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.option-comment-reply > div:first-child{
    display: flex;
    align-items: center;
    justify-content: center;
}

.option-comment-reply > div > div{
    height: 4px;
    width: 4px;
    border-radius: 50%;
    background-color: #606770;
    margin-right: 2px;
}
.write-comment{
    display: flex;
    align-items: center;    
    margin-top: 20px;
}

.write-comment > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.content-write-comment{
    margin-left: 10px;
    height: 30px;
    width: 90%;
    background-color: #f0f2f5;
    border-radius: 15px;
}

.content-write-comment > input {
    background-color: transparent;
    border: none;
    height: 100%;
    width: 93%;
    margin-left: 5px;
    outline: none;

}
.content-write-comment > button {
    border: none;
    cursor: pointer;
}
</style>