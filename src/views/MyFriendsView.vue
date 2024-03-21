<template>
    <div class="container-my-friends">
        <div class="header-container-my-friends">
            <h2>Friends</h2>
            <div class="friends-add-friends">
                <p>Friends</p>
                <p>Add Friends</p>
            </div>
        </div>
        <div class="content-container-my-friends">
            <div class="friend-request">
                <h4>Friend request</h4>
                <div v-for="(friendRequest, index) in friendRequests" class="item-friend-list" :key=index>
                    <img src="https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png" alt="">
                    <div class="info-friends">
                        <p>{{ friendRequest.Name }}</p>
                        <span>3 books | {{  friendRequest.Friends && friendRequest.Friends.length ? friendRequest.Friends.length : '0' }} friends</span>
                        <div v-if="textAddFriend === ''" class="accept-reject">
                            <button @click="handleAccept('accepted', friendRequest.userId)">Accept</button>
                            <button @click="handleAccept('rejected', friendRequest.userId)">Reject</button>
                        </div>
                        <p v-else>{{ this.textAddFriend }}</p>
                    </div>
                </div>
            </div>
            <div class="friends-list">
                <form class="form-search-your-friends-list">
                    <input type="text" placeholder="Search your friends list">
                    <button type="submit">Search</button>
                </form>
                <div class="sort">
                    <form class="form-sort">
                        <select>
                            <option value="1">1</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                            <option value="1">1</option>
                        </select>
                    </form>
                    <p>edit friends</p>
                </div>
                <div  v-for="(friend, index) in friends" :key="index" class="item-friend-list">
                    <img src="https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png" alt="">
                    <div class="info-friends">
                        <p>{{ friend.Name }}</p>
                        <span>3 books | {{ friend.Friends && friend.Friends.length }} friends</span>
                    </div>
                </div>
            </div>
            <div class="follow-find-friends">
                <div class="follow">
                    <p>People I'am Following</p>
                    <p>My Followers</p>
                </div>
                <div class="find-friends">
                    <h4>FIND FRIENDS FORM</h4>
                    <form class="form-find-friends" @submit.prevent="handelSearch" >
                        <input ref="searchInput" type="text" v-model="searchText" placeholder="name or email">
                        <button type="submit">
                            Search
                        </button>
                    </form>
                    <p class="search-message" v-if="message !== ''"><i class="fa-solid fa-circle-exclamation"></i>{{ this.message }}</p>
                </div>
                <div class="invite-friend-link">
                    <h4>INVITE FRIEND LINK</h4>
                    <p>Send this link to your friends to connect with them.</p>
                    <button>Get Link</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AuthService from '../services/AuthService';
import UserService from '../services/user.service';
import FriendRequestsService from '../services/friendRequests.service'
export default {
    data(){
        return {
            user: {},
            friends: [],
            searchText: "",
            searchUserResult: [],
            message: "",
            friendRequests: [],
            textAddFriend:"",
        }
    },
    methods: {
        async getUserByEmail(){
            AuthService.checkAuthentication();
            const email = AuthService.user;
            this.user = await UserService.getUserByEmail(email.Email);
            console.log(this.user);
            for (const friend of this.user.Friends){
                this.getFriend(friend);
            }
            this.getFriendRequests(this.user.userId)
        },
        async getFriend(friendId){
            this.friends.push(await UserService.get(friendId));
        },
        async getFriendRequests(userId){
            const requests = await FriendRequestsService.getByReceiverId(userId);
            console.log(requests);
            const filteredRequests = requests.filter(request => request.status === 'pending');
            for (const friendRequest of filteredRequests) {
                this.friendRequests.push(await UserService.get(friendRequest.senderId));
            };
        },
        handelSearch(){
            console.log(this.searchText);
            if (this.searchText === ''){
                this.message = "Vui lòng nhập"
                this.$refs.searchInput.focus();
            } else {
                this.$router.push({ name: 'friend.find', params: { searchText: this.searchText } })
            }
        },
        async handleAccept(status, userId){
            const data = {
                status: status
            }
            const update = await FriendRequestsService.updateStatus(userId, this.user.userId, data);
            const getUserSender = await UserService.get(userId);
            if(status === 'accepted'){
                this.user.Friends.push(userId);
                const dataReceiver = {
                    Friends: this.user.Friends
                }
                getUserSender.Friends.push(this.user.userId)
                const dataSender = {
                    Friends: getUserSender.Friends
                }
                const updateFriendsReceiver = await UserService.updateFriends(this.user.userId,  dataReceiver);
                const updateFriendsSender = await UserService.updateFriends(userId, dataSender);
                this.textAddFriend = 'You have accepted the invitation !';
            } else if(status === 'rejected'){
                const deleteRequests = await FriendRequestsService.delete(userId, this.user.userId);
                this.textAddFriend = 'You have rejected the invitation !';
            }
        }
    },
    mounted(){
        this.getUserByEmail();
    }
}
</script>
<style scoped>
    .container-my-friends{
        margin: 10px 100px;    
    }
    .header-container-my-friends{
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
    .content-container-my-friends{
        display: flex;
        justify-content: space-between;
        margin: 10px;
    }
    .friend-request{
        width: 250px;
    }
    .friend-request > h4 {
        font-size: 14px;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
    /* .friend-request > h2 {
        display: block;
        padding: 2px 0;
        width: auto;
        height: 24px;
        margin-bottom: 0;
        font-weight: bold;
        font-size: 13px;
        text-transform: uppercase;
    } */
    .accept-reject{
        margin-top: 5px;
    }
    .accept-reject button{
        margin-right: 5px;
        font-size: 11px;
        padding: 3px 12px;
        cursor: pointer;
        color: #333333;
        background-color: #F4F1EA;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
    }
    .accept-reject button:nth-child(2){
        background-color: red;
        border: 1px solid red;
        color: white;
    }
    .accept-reject button:nth-child(1):hover{
        color: #333333;
        background-color: #ede6d6;
    }
    .accept-reject button:nth-child(2):hover{
        opacity: 0.7;
    }

    .friends-list{
        width: 500px;
    }
    .form-search-your-friends-list{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    .form-search-your-friends-list > input:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
    border-color: #B9AD99;
    outline: 0px;
    }
    .form-search-your-friends-list > input {
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        width: 75%;
        padding: 5px;
        height: 33px;
        margin: 0 10px 0 20px;
        outline: none;
    }
    .form-search-your-friends-list > button {
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        font-size: 14px;
        cursor: pointer;
        color: #333333;
        background-color: #F4F1EA;
        padding: 8px 12px;
    }
    .form-search-your-friends-list > button:hover{
        color: #333333;
        background-color: #ede6d6;
    }
    .sort{
        display: flex;
        justify-content: end;
        padding: 5px;
        border-top: 1px solid #d7d7d7;
        border-bottom: 1px solid #d7d7d7;
    }
    .form-sort{
        margin-right: 5px;
    }
    .form-sort select {
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333  
    }

    .form-sort select:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .sort > p {
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        color: #00635d;
    }
    .item-friend-list{
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
    .follow-find-friends{
        width: 250px;
        font-size: 14px;
    }
    .follow{
        color: #00635d;
        margin-bottom: 10px;
    }
    .find-friends{
        margin-bottom: 10px;
    }
    .find-friends > h4 {
        padding-bottom: 5px;
        border-bottom: 1px solid #d7d7d7;
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
    .invite-friend-link > h4{
        padding-bottom: 5px;
        border-bottom: 1px solid #d7d7d7;
    }
    .invite-friend-link > p {
        margin-top: 10px;
        margin-bottom: 5px;
    }
    .invite-friend-link > button {
        cursor: pointer;
        padding: 8px 12px;
            color: #333333;
        background-color: #F4F1EA;
        font-size: 14px;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
    }
    .invite-friend-link > button:hover{
        color: #333333;
        background-color: #ede6d6;
    }
</style>