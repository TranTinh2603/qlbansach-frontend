<template>
    <div class="container">
        <div class="container-content">
            <div class="container-content-1">
                <div class="header-content-1">
                    <router-link :to="'/community/group/discussion/folder/topic/' + groupId + '&' + folderId">{{ folder.folderName }}</router-link>
                    <i class="fa-solid fa-greater-than"></i>
                    <p>New Discussion Topic</p>
                </div>
                <div class="add-content">
                    <form @submit.prevent="addTopic(topic, user.userId)" class="form-add-content">
                        <div class="field-topic-name">
                            <label for="topic-name">topic name</label>
                            <br>
                            <input type="text" name="topic-name" id="topic-name" v-model="topic.name">
                        </div>
                        <div class="field-topic-about">
                            <label for="topic-about">this topic is about <span>(book name)</span></label>
                            <br>
                            <input @input="getBook" type="text" name="topic-about" id="topic-about" v-model="topic.about.name" autocomplete="off">
                            <div v-if="books.length > 0" class="container-book-recommend">
                                <p v-for="(book, index) in books" @click="handleBook(book)" :key="index">{{ book.name }}</p>
                            </div>
                        </div>
                        <div class="field-comment">
                            <p>comment<span>add book/author</span></p>
                            <textarea name="comment" id="comment" rows="10" v-model="topic.comment"></textarea>
                        </div>
                        <div class="field-submit">
                            <input type="submit" value="Post">
                        </div>
                    </form>
                </div>
            </div>
            <div class="container-content-2">
                <div class="rules-content">
                    <h4>RULES FOR BOOK CLUB</h4>
                    <span>Không có luật gì cả</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AuthService from '../services/AuthService';
import UserService from '../services/user.service';
import GroupService from '../services/group.service';
import BookService from '../services/book.service';
export default {
    props:{
        groupId: {type: String, default: ""},
        folderId: {type: String, default: ""}
    },
    data(){
        return {
            user: {},
            group: {},
            folder: {},
            topic: {
                about: {}
            },
            bookTimeout: 0,
            books: []
        }
    },
    methods: {
        async getUser(){
           try {
                AuthService.checkAuthentication();
                const email = AuthService.user.email;
                this.user = await UserService.getUserByEmail(email)
           } catch (error) {
                console.log(error);
           }
        },
        async getGroup(){
            try {
                this.group = await GroupService.getByGroupId(this.groupId);
                this.getFolder(this.group)
            } catch (error) {
                console.log(error);
            }
        },
        getFolder(group){
            this.folder = group.discussions.find(discussion => discussion.folderId === this.folderId)
        },
        async addTopic(topic, userId){
            try {
                const date = new Date();
                const timestamp = date.getTime();
                const randomString = Math.random().toString(36).substring(5);
                const result = randomString + '_' + timestamp;
                const data = {
                    topicId: result,
                    name: topic.name,
                    createdAt: timestamp,
                    createdBy: userId,
                    about: topic.about,
                    comments: [
                        {
                            userId: userId,
                            content: topic.comment,
                            commentId: result,
                            createdAt: timestamp
                        }
                    ]
                }
                console.log(this.groupId, data);
                const update = await GroupService.updateTopic(this.groupId, this.folderId, data)
                if (update) {
                    alert('Topic updated successfully!')
                } else {
                    alert('Topic not updated successfully!')
                }
            } catch (error) {
                alert('Topic not updated successfully!')
                console.log(error);
            }
            
        },
        async getBook(){
            try {
                if(this.topic.about.name && this.topic.about.name !== ''){
                    this.books = await BookService.getByLiveSearch(this.topic.about.name);
                    clearTimeout(this.bookTimeout);
                    this.bookTimeout = setTimeout( () => {
                        this.books = []
                    }, 2000);
                } else {
                    this.books = [];
                }
                
            } catch (error) {
                console.log(error);
            }
               
        },
        handleBook(book){
            this.topic.about = book;
            this.books = []
        }
    },
    mounted(){
        this.getUser()
        this.getGroup()
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
    .container{
        margin: 20px 100px;
    }
    .container-content {
        display: flex;
        justify-content: space-between;
    }
    .container-content-1{
        width: 750px;
    }
    .header-content-1{
        display: flex;
        align-items: center;
    }
    .header-content-1 > a{
        font-size: 20px;
        font-weight: bold;
    }
    .header-content-1 > i {
        font-size: 14px;
        margin: 0 5px;
    }
    .header-content-1 > p {
        font-size: 20px;
        font-weight: bold;
    }
    .add-content{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .field-topic-name{
        margin-bottom: 20px;
    }
    .field-topic-name > label {
        font-size: 14px;
        font-weight: bold;
    }
    .field-topic-name > input {
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        font-family: 'Times New Roman', Times, serif;
        width: 40%;
        margin-top: 2px;
        padding: 2px 5px;
    }
    .field-topic-name > input:focus{
        box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-topic-about{
        position: relative;
        margin-bottom: 20px;
    }
    .field-topic-about > label {
        font-size: 14px;
        font-weight: bold;
    }
    .field-topic-about > label > span {
        color: #999999;
        font-weight: 100;
        font-size: 12px;
    }
    .field-topic-about > input {
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        font-family: 'Times New Roman', Times, serif;
        width: 40%;
        margin-top: 2px;
        padding: 2px 5px;
    }
    .field-topic-about > input:focus{
        box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .container-book-recommend{
        position: absolute;
        width: 300px;
        background-color: #ffffff;
        border:1px solid #B9AD99;
        border-bottom: none ;
    }
    .container-book-recommend > p {
        padding: 5px;
        cursor: pointer;
        border-bottom: 1px solid #B9AD99;
        font-size: 14px;
    }
    .container-book-recommend > p:hover{
        background-color: #ffb;
    }
    .field-comment{
        margin-bottom: 20px;
    }
    .field-comment > p {
        font-size: 14px;
        font-weight: bold;
    }
    .field-comment > p > span {
        color:#00635d;
        font-weight: lighter;
        margin-left: 100px;
        cursor: pointer;
    }
    .field-comment > p > span:hover{
        text-decoration: underline;
    }
    .field-comment > textarea {
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        font-family: 'Times New Roman', Times, serif;
        width: 40%;
        margin-top: 2px;
        padding: 2px 5px;
    }
    .field-comment > textarea:focus{
        box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-submit{
        margin-bottom: 20px;
    }
    .field-submit > input {
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        color: #333333;
        background-color: #F4F1EA;
        padding: 4px 12px;
        font-size: 14px;
        font-family: 'Times New Roman', Times, serif;
    }
    .container-content-2{
        width: 300px;
    }
    .rules-content > h4 {
        padding: 5px 0;
        font-size: 14px;
        border-bottom: 1px solid #D8D8D8;
        margin-bottom: 10px;
    }
    .rules-content > span {
        font-size: 14px;
    }
</style>