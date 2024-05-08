<template>
    <div class="container">
        <div class="container-content">
            <div class="container-content-1">
                <div class="header-content-1">
                    <router-link :to="'/community/group/discussion/' + groupId">Discussion</router-link>
                    <i class="fa-solid fa-greater-than"></i>
                    <p>{{ folder.folderName }}</p>
                </div>
                <div class="body-content-1">
                    <router-link style="float: right; font-size: 14px; margin-bottom: 10px;" :to="'/community/group/discussion/folder/topic/add/' + groupId + '&' + folderId">new topic</router-link>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        <tr style="border-bottom: 2px solid #EBE8D5; text-align: left; ">
                            <th style="width: 250px;">topic name</th>
                            <th style="width: 100px;">created by</th>
                            <th style="width: 150px;">post</th>
                            <th style="width: 100px;">views</th>
                            <th>last activity</th>
                        </tr>
                        <tr v-if="folder.topics && folder.topics.length > 0 " v-for="(topic, index) in folder.topics" style="border-bottom: 1px solid #E8E8E8;">
                            <td>
                                <router-link :to="'/community/group/discussion/folder/topic/detail/' + groupId + '&' + folderId + '&' + topic.topicId">{{ topic.name }}</router-link>
                            </td>
                            <td style="color: #999999;">{{ topic.createdBy }}</td>
                            <td>{{ topic.comments ? topic.comments.length : '' }}</td>
                            <td>1158</td>
                            <td>{{ topic.createdAt }}</td>
                        </tr>
                    </table>
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
        groupId: {type: String, default: ""},
        folderId: {type: String, default:""}
    },
    data(){
        return{
            user: {},
            group: {},
            folder: {},
        }
    },
    methods: {
        async getUser(){
            AuthService.checkAuthentication();
            const email = AuthService.user.email
            this.user = await UserService.getUserByEmail(email);
        },
        async getGroup(){
            try {
                this.group = await GroupService.getByGroupId(this.groupId);
                this.getFolder(this.group)
            } catch (error) {
                
            }
        },
        getFolder(group){
            this.folder = group.discussions.find(discussion => discussion.folderId == this.folderId)
            console.log(this.folder);
        }
    },
    mounted(){
        this.getUser();
        this.getGroup()
    }
}
</script>
<style scoped>
    th, td{
        padding: 5px;
    }
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
        align-items: center;
    }
    .header-content-1 > i {
        font-size: 14px;
        margin: 0 5px;
    }
    .header-content-1 > p {
        font-size: 20px;
        font-weight: bold;
    }
    .header-content-1 > a{
        font-size: 20px;
        font-weight: bold;
    }
    .body-content-1{
        margin-top: 20px;
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