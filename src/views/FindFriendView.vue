<template>
    <div class="container-find-friend">
        <div class="header-find-friend">
            <h2>Find Friends</h2>
            <div class="friends-add-friends">
                <p>Friends</p>
                <p>Add Friends</p>
            </div>
        </div>
        <div class="content-find-friend">
            <div class="search-content">
                <p>Find a friend by name or email address</p>
                <form class="form-find-friends" @submit.prevent="handleSubmit">
                    <input ref="searchInput" type="text" v-model="searchTextLocal" placeholder="name or email">
                    <button type="submit">
                        Search
                    </button>
                </form>
                <p class="search-message" v-if="message !== ''"><i class="fa-solid fa-circle-exclamation"></i>{{ this.message }}</p>
            </div>
            <div class="result-content">
                <span>Results for: {{ this.searchText }}</span>
                <div class="item-friend-list" v-for="(friend, index) in searchFriendResult" :key="index">
                    <img :src="friend.avatar" alt="">
                    <div class="info-friends">
                        <p>{{ friend.Name }}</p>
                        <span>{{ friend.books }} books | {{ friend.Friends && friend.Friends ? friend.Friends.length : '0' }} friends</span>
                    </div>
                    <div class="button-add-friend">
                        <button v-if="checkFriend(friend.userId) == false || checkFriendRequests(friend.userId) && checkFriendRequests(friend.userId).status !== 'pending' && checkFriend(friend.userId) == false || checkFriendRequests(friend.userId) && checkFriendRequests(friend.userId).status === 'rejected'" @click="addFriend(friend.userId)">Add friend</button>
                        <p v-if="checkFriendRequests(friend.userId) && checkFriend(friend.userId) == true && checkFriendRequests(friend.userId).status === 'accepted'">Is Friend</p>
                        <p v-if="checkFriendRequests(friend.userId) && checkFriend(friend.userId) == false && checkFriendRequests(friend.userId).status === 'pending'">Invitation sent</p>
                    </div>
                </div>
                <div style="font-size: 14px; margin-top: 10px; font-weight: bold;" v-if="!searchFriendResult || searchFriendResult.length === 0">
                    No results found
                </div>
                </div>
        </div>
    </div>
</template>
<script>
import FriendRequestsService from "../services/friendRequests.service";
import UserService from "../services/user.service";
import AuthService from "../services/AuthService";
export default {
    props: {
        searchText: { type: String, default: ""}
    },
    data(){
        return{
            searchFriendResult: [],
            message: '',
            searchTextLocal: this.searchText,
            user: "",
            friendRequests: [],
        }
    },
    methods: {
        async getUser(){
            AuthService.checkAuthentication();
            const email =  AuthService.user;
            this.user = await UserService.getUserByEmail(email.Email);
        },
        async searchUser() {
            this.searchFriendResult = await UserService.getUserByEmail(this.searchTextLocal);
            for (const user of this.searchFriendResult) {
                this.getFriendRequests(user.userId);
            }
        },
        async getFriendRequests(userId) {
            this.friendRequests.push(await FriendRequestsService.getBySenderIdAndReceiverId(this.user.userId,userId));
            console.log(this.friendRequests);
        },

        checkFriendRequests(userId){
            return this.friendRequests.find(friendRequest => friendRequest.receiverId === userId);
        },
        handleSubmit(){
            if (this.searchTextLocal === '') {
                this.message = 'Please enter';
               this.$refs.searchInput.focus();
            } else {
                this.$router.push({ name: "friend.find", params: { searchText: this.searchTextLocal } })
                this.searchUser();
            }
            
        },
        async addFriend(userId){
            const data = {
                senderId: this.user.userId,
                receiverId: userId,
                status: "pending",
                createdAt: new Date(),
            }
            await FriendRequestsService.create(data);
            window.location.reload();

        },
        checkFriend(userId){
            return this.user && this.user.Friends && this.user.Friends.includes(userId);
        }
    },
    mounted(){
        this.searchUser();
        this.getUser();
    }
}
</script>
<style scoped>
    .container-find-friend{
        margin: 10px 100px;
    }
    .header-find-friend{
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ebe8d5;
    }
    .friends-add-friends{
        display: flex;
        font-weight: bold;
    }
    .friends-add-friends > p:nth-child(1) {
        margin-right: 10px;
    }
    .content-find-friend{
        padding: 10px;
        width: 700px;
    }
    .search-content{
        margin-bottom: 20px;
        
    }
    .search-content > p {
        font-size: 14px;
    }
    .form-find-friends{
        display: flex;
        align-items: center;
        margin-top: 10px;
    }
   
    .form-find-friends > input {
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        width: 160px;
        padding: 5px;
        height: 20px;
    }
    .form-find-friends > input:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .form-find-friends > button {
        margin-left: 5px;
        font-size: 11px;
        padding: 3px 12px;
        cursor: pointer;
        color: #333333;
        background-color: #F4F1EA;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
    }

    .form-find-friends > button:hover{
        color: #333333;
        background-color: #ede6d6;
    }
    .search-message{
        margin-top: 5px;
        font-size: 14px;
        display: flex;
        align-items: center;
        color: red;
    }
    .search-message > i {
        margin-right: 5px;
    }
    .result-content > span {
        font-size: 14px;
    }
    .item-friend-list{
        margin-top: 10px;
        display: flex;
        padding: 5px;
        width: 100% ;
        border-bottom: 1px solid #d7d7d7;
        color: #00635d;
    }
    .item-friend-list > img {
        height: 66px;
        width: 50px;
    }
    .info-friends{
        margin-left: 10px; 
    }
    .info-friends > p {
        font-size: 14px;
        font-weight: bold;
    }
    .info-friends > span {
        font-size: 13px;
    }
    .button-add-friend {
        font-size: 14px;
    }
    .button-add-friend > button{
        margin-left: 5px;
        font-size: 11px;
        padding: 3px 12px;
        cursor: pointer;
        color: #333333;
        background-color: #F4F1EA;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
    }
    .button-add-friend p {
        margin-left: 5px;
        font-weight: bold;
        color: #000000;
    }
</style>