<template>
    <div class="container">
        <div class="header-container-content">
            <router-link :to="`/community/group/detail/` + groupId">{{ group.name }}</router-link>
            <i class="fa-solid fa-greater-than"></i>
            <p>Discussion</p>
        </div>
        <div class="body-container-content">
            <div class="container-content-1">
                <div class="create-folder-content">
                    <router-link :to="'/community/group/discussion/folder/add/' + groupId">New folder</router-link>
                </div>
                <div class="folders-list-content">
                    <div v-if="group.discussions && group.discussions.length > 0" v-for="(discussion, index) in group.discussions" :key="index" class="folder-item">
                        <div class="folder-name">
                            <router-link :to="'/community/group/discussion/folder/topic/' + groupId + '&' + discussion.folderId">{{ discussion.folderName }}</router-link>
                        </div>
                        <div v-if="discussion.topics && discussion.topics.length > 0" class="topics-list">
                            <div class="topic-item">
                                <div class="topic-name">
                                    <router-link to="/">Review</router-link>
                                </div>
                                <div class="topic-info">
                                    <span>By Pam · 10 posts (10 new) · 1394 views</span>
                                    <span>last updated Oct 31, 2023 02:32AM</span>
                                </div>
                            </div>
                            <div class="topic-item">
                                <div class="topic-name">
                                    <router-link to="/">Review</router-link>
                                </div>
                                <div class="topic-info">
                                    <span>By Pam · 10 posts (10 new) · 1394 views</span>
                                    <span>last updated Oct 31, 2023 02:32AM</span>
                                </div>
                            </div>
                        </div>
                        <p v-else>No discussions have been started in this group yet. <router-link :to="'/community/group/discussion/folder/topic/add/' + groupId + '&' + discussion.folderId">Start one now »</router-link></p>
                    </div>
                </div>
            </div>
            <div class="container-content-2">
                <div class="group-name-content">
                    <img src="https://images.gr-assets.com/groups/1479936067p2/179584.jpg" alt="">
                    <p>{{ groupId }}</p>
                </div>
                <div class="navigation-content">
                    <router-link :to="'/community/group/detail/' + groupId">Group Home</router-link>
                    <router-link :to="'/community/group/bookshelf/' + groupId">Bookshelf</router-link>
                    <router-link class="active" :to="'/community/group/discussion/' + groupId">Discussion</router-link>
                    <router-link to="/">Members</router-link>
                    <router-link to="/">Send invite</router-link>
                </div>
                <div class="search-discussion-content">
                    <form class="search-discussion-form">
                        <input type="text" placeholder="Search discussion">
                        <input type="submit" value="Search">
                    </form>
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
        groupId: {type: String, default:""}
    },
    data(){
        return {
            user: {},
            group: {},
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
                console.log(this.group);
            } catch (error) {
                console.log(error);
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
    .header-container-content{
        display: flex;
        align-items: center;
    }
    .header-container-content > a{
        font-size: 20px;
        font-weight: bold;
    }
    .header-container-content > i{
        font-size: 14px;
        margin: 0 5px;
    }
    .header-container-content > p {
        font-size: 20px;
        font-weight: bold;
    }
    .body-container-content{
        display: flex;
        justify-content: space-between;
    }
    .container-content-1{
        width: 750px;
    }
    .create-folder-content{
        font-size: 14px;
        margin-top: 20px;
        display: flex;
        justify-content: right;
    }
    .folders-list-content{
        margin-top: 10px;
    }
    .folder-item > p {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .folder-name{
        padding: 5px;
        border-bottom: 2px solid #EBE8D5;
    }
    .folder-name > a{
        font-weight: bold;
    }
    .topics-list{
        padding-left: 20px;
    }
    .topic-item{
        padding: 5px 0;
        border-bottom: 1px solid #d7d7d7;
    }
    .topic-name {
        margin-bottom: 2px;
    }
    .topic-info {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #999999;
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
    .active{
        color: #333333;
        font-weight: 600;
    }
    .search-discussion-content{
        margin-top: 10px;
    }
    .search-discussion-form {
        display: flex;
    }
    .search-discussion-form > input[type="text"]{
        width: 75%;
        padding: 2px 5px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        font-family: 'Times New Roman', Times, serif;
    }
    .search-discussion-form > input[type="text"]:focus {
        box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .search-discussion-form > input[type="submit"]{
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        color: #333333;
        background-color: #F4F1EA;
        font-size: 12px;
        padding: 4px 12px;
        cursor: pointer;
        margin-left: 5px;
    }
    .search-discussion-form > input[type="submit"]:hover{
        color: #333333;
        background-color: #ede6d6;
    }
</style>