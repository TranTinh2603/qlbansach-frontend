<template>
    <div class="container">
        <div class="container-content">
            <div class="container-content-1">
                <div class="header-content-1">
                    <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1691147319l/11273677._SY75_.jpg" alt="">
                    <div class="topic-info">
                        <div>
                            <router-link to="/">{{ folder.folderName }}</router-link>
                            <i class="fa-solid fa-greater-than"></i>
                            <p>{{ topic.name }} <router-link to="/">(edit)</router-link></p>
                        </div>
                        <p>This topic is about <router-link to="/">Mắt Biếc</router-link></p>
                    </div>
                </div>
                <div class="message-content">
                    <div v-if="topic.comments && topic.comments.length > 0" class="messages-list">
                        <div v-for="(comment, index) in topic.comments" :key="index" class="message-item">
                            <div v-if="comment.userId === topic.createdBy" class="mod-message-item">
                                <div class="header-mod-message-item">
                                    <p><b>message {{ index + 1 }}</b>: by <router-link to="/">{{ comment.userId }}</router-link></p>
                                    <p>21 hours, 6 min ago {{ comment.createdAt }}</p>
                                </div>
                                <div class="body-message-item">
                                    <div>
                                        <img src="https://s.gr-assets.com/assets/nophoto/user/u_25x33-ccd24e68f4773d33a41ce08c3a34892e.png" alt="">
                                        <p>Mod</p>
                                    </div>
                                    <div>
                                        <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1691147319l/11273677._SY75_.jpg" alt="">
                                        <span>{{ comment.content }}</span>
                                    </div>
                                </div>
                                <div v-if="user.userId === comment.userId" class="action-message-item">
                                    <!-- <span>reply</span>
                                    <span> | </span> -->
                                    <span>edit</span>
                                    <span> | </span>
                                    <span>delete</span>
                                </div>
                            </div>
                            <div v-else class="other-message-item">
                                <div class="header-other-message-item">
                                    <p><b>message {{ index + 1 }}</b>: by <router-link to="/">{{ comment.userId }}</router-link></p>
                                    <p>21 hours, 6 min ago {{ comment.createdAt }}</p>
                                </div>
                                <div class="body-message-item">
                                    <div>
                                        <img src="https://s.gr-assets.com/assets/nophoto/user/u_25x33-ccd24e68f4773d33a41ce08c3a34892e.png" alt="">
                                    </div>
                                    <div>
                                        <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1691147319l/11273677._SY75_.jpg" alt="">
                                        <span>{{ comment.content }}</span>
                                    </div>
                                </div>
                                <div v-if="user.userId === comment.userId || user.userId === topic.createdBy" class="action-message-item">
                                    <!-- <span>reply</span>
                                    <span> | </span> -->
                                    <span v-if="user.userId === comment.userId">edit</span>
                                    <span v-if="user.userId === comment.userId"> | </span>
                                    <span>delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment-content">
                    <form @submit.prevent="addComment(topic, user.userId)" class="comment-form">
                        <p><b>comment</b><span>add book/author</span></p>
                        <textarea name="comment" rows="5" v-model="commentText"></textarea>
                        <br>
                        <input type="submit" value="Post">
                    </form>
                </div>
            </div>
            <div class="container-content-2">
                <div class="group-name-content">
                    <img src="https://images.gr-assets.com/groups/1479936067p2/179584.jpg" alt="">
                    <p>{{ group.name }}</p>
                </div>
                <div class="navigation-content">
                    <router-link :to="'/community/group/detail/' + groupId">Group Home</router-link>
                    <router-link :to="'/community/group/bookshelf/' + groupId">Bookshelf</router-link>
                    <router-link :to="'/community/group/discussion/' + groupId">Discussion</router-link>
                    <router-link to="/">Members</router-link>
                    <router-link to="/">Send invite</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AuthService from '../services/AuthService';
import UserService from '../services/user.service';
import GroupService from '../services/group.service';
export default {
    props: {
        groupId: {type: String, default:""},
        folderId: {type: String, default: ""},
        topicId: {type: String, default:""},
    },
    data(){
        return {
            user: {},
            group: {},
            folder: {},
            topic: {},
            commentText: ""
        }
    },
    methods: {
        async getUser(){
            try {
                AuthService.checkAuthentication();
                const email = AuthService.user.Email;
                this.user = await UserService.getUserByEmail(email);
            } catch (error) {
                console.log(error);
            }
        },
        async getGroup(){
            try {
                this.group = await GroupService.getByGroupId(this.groupId)
                this.getFolder(this.group)
            } catch (error) {
                console.log(error);
            }
        },
        getFolder(group){
            this.folder = group.discussions.find(discussion => discussion.folderId === this.folderId)
            this.getTopic(this.folder)
        },
        getTopic(folder){
            this.topic = folder.topics.find(topic => topic.topicId === this.topicId)
        },
        async addComment(topic, userId){
            try {
                const date = new Date();
                const timestamp = date.getTime();
                const randomString = Math.random().toString(36).substring(5);
                const result = randomString + '_' + timestamp;
                const data = {
                    commentId: result,
                    content: this.commentText,
                    createdAt: timestamp,
                    userId: userId
                }
                const addCommentResult = await GroupService.updateComment(this.groupId, this.folderId, this.topicId, data)
                if (addCommentResult) {
                    topic.comments.push(data);
                    this.topic = topic
                } else {
                    alert("Please try again!")
                }
            } catch (error) {
                console.log(error);
                alert("Please try again!")
            }
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
    .container-content{
        display: flex;
        justify-content: space-between;
    }
    .container-content-1{
        width: 750px;
    }
    .header-content-1{
        display: flex;
    }
    .header-content-1 > img {
        height: 75px;
        width: 48px;
    }
    .topic-info {
        margin-left: 10px;
    }
    .topic-info > div {
        display: flex;
        align-items: center;
    }
    .topic-info > div > a {
        font-size: 20px;
        font-weight: bold;
    }
    .topic-info > div > i {
        font-size: 14px;
        margin: 0 5px;
    }
    .topic-info > div > p {
        font-size: 20px;
        font-weight: bold;
    }
    .topic-info > div > p > a {
        font-size: 14px;
        font-weight: 100;
    }
    .message-content {
        margin-top: 20px;
        width: 600px;
    }
    .message-item{
        margin-bottom: 10px;
    }
    .header-mod-message-item{
        display: flex;
        justify-content: space-between;
        padding: 5px;
        background-color: #FFFBD9;
        font-size: 14px;
    }
    .body-message-item{
        margin-top: 10px;
        display: flex;
        font-size: 14px;
    }
    .body-message-item > div:first-child > img {
        display: block;
        height: 33px;
        width: 25px;
        margin: 0 auto;
    }
    .body-message-item > div:first-child > p {
        font-size: 10px;
        background-color: #603913;
        text-align: center;
        padding: 2px;
        color: #ffffff;
        margin-top: 2px;
    }
    .body-message-item > div:last-child {
        display: flex;
        margin-left: 10px;
    }
    .body-message-item > div:last-child > img {
        height: 75px;
        width: 48px;
    }
    .body-message-item > div:last-child > span {
        margin-left: 10px;
    }
    .action-message-item {
        color: #00635d;
        display: flex;
        justify-content: right;
        font-size: 14px;
    }
    .action-message-item > span:nth-child(2){
        margin: 0 2px;
    }
    .action-message-item > span:first-child, .action-message-item > span:last-child{
        cursor: pointer;
    }
    .header-other-message-item{
        display: flex;
        justify-content: space-between;
        padding: 5px;
        background-color: #f4f1ea;
        font-size: 14px;
    }
    .comment-content {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .comment-form > p{
        font-size: 14px;
    }
    .comment-form > p > span {
        margin-left: 200px;
        color: #00635d;
        cursor: pointer;
    }
    .comment-form > p > span:hover{
        text-decoration: underline;
    }
    .comment-form > textarea {
        width: 60%;
        font-size: 14px;
        padding: 5px;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        font-family: 'Times New Roman', Times, serif;
        margin-top: 2px;
    }
    .comment-form > textarea:focus{
        box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .comment-form > input{
        margin-top: 5px;
        font-size: 14px;
        font-family: 'Times New Roman', Times, serif;
        padding: 4px 12px;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        color: #333333;
        background-color: #F4F1EA;
    }
    .comment-form > input:hover{
        color: #333333;
        background-color: #ede6d6;
    }
    .container-content-2{
        width: 300px;
    }
    .group-name-content{
        display: flex;
        align-items: center;
        margin: 10px 0;
    }
    .group-name-content > img {
        height: 50px;
        width: 50px;
    }
    .group-name-content > p {
        font-weight: 600;
        margin-left: 5px;
    }
    .navigation-content{
        display: grid;
        grid-template-columns: auto auto;
        font-size: 14px;
        gap: 5px;
        padding: 5px 0;
        border-top: 5px solid #EBE8D5;
        border-bottom: 1px solid #EBE8D5;
    }
</style>