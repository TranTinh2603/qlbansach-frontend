<template>
    <div class="container">
        <div class="container-content-1">
            <h2>Groups</h2>
            <div class="search-content">
                <input type="text" class="search-text" placeholder="Group name, description">
                <input type="submit" class="search-submit" value="Search groups">
            </div>
            <div class="content-my-groups">
                <h3>My groups created</h3>
                <div class="my-groups-list">
                    <div v-for="(myGroupCreated, index) in myGroupsCreated" :key="index" class="my-group-item">
                        <img src="https://images.gr-assets.com/groups/1479936067p3/179584.jpg" alt="">
                        <div class="info-my-group-item">
                            <router-link :to="'/community/group/detail/' + myGroupCreated.groupId" >{{ myGroupCreated.name }}</router-link>
                            <span class="active">
                                23 minutes ago
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-my-groups">
                <h3>My groups</h3>
                <div class="my-groups-list">
                    <div class="my-group-item">
                        <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/groups/1269147049i/220._UY75_CR10,0,75,75_.jpg" alt="">
                        <div class="info-my-group-item">
                            <router-link to="/">Goodreads Librarians Group</router-link>
                            <span class="active">
                                23 minutes ago
                            </span>
                        </div>
                    </div>
                    <div class="my-group-item">
                        <img src="https://images.gr-assets.com/groups/1479936067p3/179584.jpg" alt="">
                        <div class="info-my-group-item">
                            <router-link to="/">Our Shared Shelf</router-link>
                            <span class="active">
                                23 minutes ago
                            </span>
                        </div>
                    </div>
                    <div class="my-group-item">
                        <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/groups/1269147049i/220._UY75_CR10,0,75,75_.jpg" alt="">
                        <div class="info-my-group-item">
                            <router-link to="/">Oprah's Book Club (Official)</router-link>
                            <span class="active">
                                23 minutes ago
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-popular-groups">
                <h3>Popular groups</h3>
                <div class="popular-groups-list">
                    <div class="popular-group-item">
                        <img src="https://images.gr-assets.com/groups/1479936067p3/179584.jpg" alt="">
                        <div class="info-popular-group-item">
                            <router-link to="/">Our Shared Shelf</router-link>
                            <div class="members-active">
                                <span>144537 members</span>
                                <div></div>
                                <span>Active 5 hours ago</span>
                            </div>
                            <div class="description">
                                <span>OUR SHARED SHELF IS CURRENTLY DORMANT AND NOT MANAGED BY EMMA AND HER TEAM.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-content-2">
            <div class="content-create-group">
                <h3 >Create group</h3>
                <div class="create-group-item">
                    <router-link to="/community/group/add">Create group</router-link>
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
    data(){
        return {
            user: {},
            myGroupsCreated: [],
        }
    },
    methods: {
        async getUser(){
            AuthService.checkAuthentication();
            const email = AuthService.user.Email;
            this.user = await UserService.getUserByEmail(email);
            this.getMyGroupsCreated(this.user.userId)
        },
        async getMyGroupsCreated(userId){
            this.myGroupsCreated = await GroupService.getByUserId(userId)
            console.log(this.myGroupsCreated);
        }
    } ,
    mounted(){
        this.getUser()
    }
}
</script>
<style scoped>
    .container{
        display: flex;
        margin: 20px 100px;
        border-top: 1px solid #D8D8D8;
    }
    .container-content-1 {
        margin-top: 20px;
    }
    .container-content-1 > h2 {
        margin-bottom: 20px;
    }
    .search-content{
        display: flex;
    }
    .search-text{
        flex-grow: 1;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        padding: 4px;
        margin-right: 8px;
    }
    .search-text:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .search-submit{
        color: #333333;
        background-color: #F4F1EA;
        cursor: pointer;
        font-size: 14px;
        padding: 8px 12px;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
    }
    .search-submit:hover {
        color: rgb(51, 51, 51);
        background-color: rgb(237, 230, 214);
        text-decoration: none;
    }
    .content-my-groups{
        margin-top: 20px;
    }
    .my-groups-list{
        display: grid;
        grid-template-columns: auto auto;
    }
    .my-group-item{
        display: flex;
        margin-top: 20px; 
    }
    .my-group-item > img {
        border-radius: 5px;
        height: 40px;
        width: 40px;
    }
    .info-my-group-item {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        width: 75%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .info-my-group-item > a{
        color:  #00635D;
    }
    .info-my-group-item  > a:hover{
        text-decoration: underline;
    }
    .active {
        font-size: 14px;
        color: #767676;
    }
    .content-popular-groups{
        margin-top: 20px;
    }
    .popular-group-item{
        display: flex;
        align-items: top;
        margin-top: 20px;
    }
    .popular-group-item > img {
        height: 75px;
        width: 75px;
        border-radius: 10px;
    }
    .info-popular-group-item {
        margin-left: 10px;
    }
    .info-popular-group-item > a{
        color: #00635D;
    }
    .info-popular-group-item > a:hover {
        text-decoration: underline;
    }
    .members-active{
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #767676;
    }
    .members-active > div {
        height: 2px;
        width: 2px;
        background-color: #767676;
        border-radius: 50%;
        margin: 0 5px;
    }
    .description{
        font-size: 14px;
    }
    .container-content-2{
        margin-left: 20px;
    }
    .content-create-group{
        margin-top: 20px;
    }
    .create-group-item {
        margin-top: 10px;
    }
    .create-group-item > a{
        color: #00635D;
    }
    .create-group-item > a:hover{
        text-decoration: underline;
    }
</style>
