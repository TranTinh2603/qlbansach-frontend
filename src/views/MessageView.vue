<template>
    <div class="container-message">
        <div class="content-list-friends">
            <div class="header-content-list-friends">
                <h4>Đoạn chat</h4>
                <div class="search-friend">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search">
                </div>
                <div class="body-content-list-friends">
                    <div v-for="(friend, index) in friends" :key="index" @click="getMessage(user.userId, friend.userId)" class="item-friend-message">
                        <img src="https://scontent.fvca1-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEi0VkQuBcTZEalh9eTHdvpso2H55p0AlGyjYfnmnQCUdc4ngjpztgdBloDcewFFirlKBe3f7nQMiV8K1-RKQfE&_nc_ohc=ydxhzA9VjJsAX8IEi-C&_nc_ht=scontent.fvca1-2.fna&cb_e2o_trans=q&oh=00_AfA2hvPAJfDnNmze_QI2lGOTFwKQlJUOx0O-OrAMceYvqg&oe=661F3A38" alt="">
                        <div class="friend-name-message">
                            <p>{{ friend.Name }}</p>
                            <div class="message">
                                <p>Hello</p>
                                <p>2 ngày</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="friendActive !== ''" class="content-detail-messages">
            <div class="header-content-detail-message">
                <div class="info-friend-message">
                    <img src="https://scontent.fvca1-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEi0VkQuBcTZEalh9eTHdvpso2H55p0AlGyjYfnmnQCUdc4ngjpztgdBloDcewFFirlKBe3f7nQMiV8K1-RKQfE&_nc_ohc=ydxhzA9VjJsAX8IEi-C&_nc_ht=scontent.fvca1-2.fna&cb_e2o_trans=q&oh=00_AfA2hvPAJfDnNmze_QI2lGOTFwKQlJUOx0O-OrAMceYvqg&oe=661F3A38" alt="">
                    <div class="name-status">
                        <p>{{ friendActive.Name }}</p>
                        <p>Đang hoạt động</p>
                    </div>
                </div>
            </div>
            <div class="body-content-detail-message">
                <div v-for="(message, index) in messages" :key="index">
                    <div v-if="message.senderId === friendActive.userId && message.content !== undefined && message.content !== ''" class="your-message">
                        <img src="https://scontent.fvca1-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEi0VkQuBcTZEalh9eTHdvpso2H55p0AlGyjYfnmnQCUdc4ngjpztgdBloDcewFFirlKBe3f7nQMiV8K1-RKQfE&_nc_ohc=ydxhzA9VjJsAX8IEi-C&_nc_ht=scontent.fvca1-2.fna&cb_e2o_trans=q&oh=00_AfA2hvPAJfDnNmze_QI2lGOTFwKQlJUOx0O-OrAMceYvqg&oe=661F3A38" alt="">
                        <div class="content-your-message">
                            <div class="your-message-1">
                                <p>{{ message.content }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="message.senderId === user.userId  && message.content !== undefined && message.content !== ''"  class="my-message">
                        <div class="content-my-message">
                            <div  class="my-message-1">
                                <p>{{message.content}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form @submit.prevent="sendMessage(user.userId,friendActive.userId)" class="enter-message">
                <input type="text" placeholder="Nhập tin nhắn" v-model="inputMessage">
                <button type="submit">Gửi</button>
            </form>
        </div>
        <div v-if="friendActive !== ''" class="content-info-friend">
            <div class="header-content-info-friend">
                <img src="https://scontent.fvca1-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEi0VkQuBcTZEalh9eTHdvpso2H55p0AlGyjYfnmnQCUdc4ngjpztgdBloDcewFFirlKBe3f7nQMiV8K1-RKQfE&_nc_ohc=ydxhzA9VjJsAX8IEi-C&_nc_ht=scontent.fvca1-2.fna&cb_e2o_trans=q&oh=00_AfA2hvPAJfDnNmze_QI2lGOTFwKQlJUOx0O-OrAMceYvqg&oe=661F3A38" alt="">
                <div class="name-info">
                    <p>{{ friendActive.Name }}</p>
                    <p>Đang hoạt động</p>
                </div>
            </div>
            <div class="body-content-info-friend">
                <div class="action">
                    <div class="action-1">
                        <i class="fa-regular fa-circle-user"></i>
                        <p>Trang cá nhân</p>
                    </div>
                    <div class="action-2">
                        <i class="fa-solid fa-bell"></i>
                        <p>Tắt thông báo</p>
                    </div>
                    <div class="action-3">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <p>Tìm kiếm</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
import UserService from "../services/user.service"
import AuthService from "../services/AuthService"
const socket = io('http://localhost:8888');
export default {
    data() {
        return {
            user: {},
            friendActive: "",
            friends: [],
            messages: [],
            myMessages: [],
            yourMessages: [],
            inputMessage: '',
            roomId: "",
        };
    },
    // created() {
    //    // Listen for 'chat message' event from the server
       
    // },
    methods: {
        async getUser(){
            AuthService.checkAuthentication()
            const email = AuthService.user.Email;
            this.user = await UserService.getUserByEmail(email);
            for (const userId of this.user.Friends){
                this.getFriend(userId)
            }
        },
        async getFriend(userId) {
            this.friends.push(await UserService.get(userId))
        },
        sendMessage(senderId, receiverId) {
            const timestamp = new Date();
            const data = {
                senderId: senderId,
                receiverId: receiverId,
                content: this.inputMessage,
                timestamp: timestamp.getTime(),
                roomId: this.roomId
            }
            // Emit 'chat message' event to the server
            socket.emit('chat message', data);
            this.inputMessage = '';
            socket.on('chat message', (data) => {
                this.messages = data;
            })
            console.log(this.messages);

        },
        generateRoomId() {
            const today = new Date();
            const randomNumber = Math.floor(Math.random() * 10000);
            this.roomId = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}_${randomNumber}`;
        },
        getMessage(userId, friendId) {
            socket.emit('getMessage', userId, friendId);
            socket.once('getMessage', (messages) => {
                this.messages = messages;
                // this.filterMessages(friendId, userId, messages);
                if (this.messages.length <= 0) {
                    this.generateRoomId(); // Tạo roomId nếu không có tin nhắn
                    socket.emit('room', {roomId: this.roomId, senderId: userId , receiverId: friendId});
                } else {
                    // Kiểm tra nếu có tin nhắn nào chứa roomId
                    const messageWithRoomId = messages.find(message => message.roomId);
                    if (messageWithRoomId) {
                        this.roomId = messageWithRoomId.roomId; // Sử dụng roomId đã tồn tại
                    } else {
                        this.generateRoomId();
                         // Tạo roomId mới nếu không có
                    }
                    socket.emit('room', { roomId: this.roomId, senderId: userId, receiverId: friendId });
                }
            });
            this.getFriendActive(friendId);
           
        },
        getFriendActive(friendId){
            this.friendActive = this.friends.find(friend => friend.userId === friendId)
        },
        // filterMessages(yourId, myId, messages) {
        //     this.myMessages = messages.filter(message => message.senderId === myId);
        //     this.yourMessages = messages.filter(message => message.senderId === yourId);
        // }

    },
    mounted(){
        this.getUser();
        socket.on('chat message', (data) => {
            this.messages = data;
            console.log('mounted message', this.messages);
        })
    }
};
</script>
<style scoped>
    .container-message{
        margin: 10px 100px;
        display: flex;
        justify-content: space-between;
    }
    .content-list-friends{
        width: 300px;
    }
    .header-content-list-friends h4{
        font-size: 14px;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
    .search-friend{
        display: flex;
        align-items: center;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        padding: 5px;
        margin: 10px;
        /* height: 20px; */
    }
    /* .search-friend:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    } */
    .search-friend > input {
        border: none;
        outline: none;
        margin-left: 5px ;
        width: 100%;
    }
    .body-content-list-friends{
        margin: 20px 10px;

    }
    .item-friend-message{
        cursor: pointer;
        padding-top: 5px;
        display: flex;
        align-items: center;
        padding-bottom: 5px;
        border-bottom: 1px solid #d7d7d7;
    }
    .item-friend-message img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }
    .friend-name-message{
        margin-left: 5px;
        width: 75%;
    }
    .friend-name-message > p{
        font-weight: bold;
    }
    .message{
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        margin-top: 5px;
    }
    .message p:nth-child(1){
        width: 65%;
    }
    .content-detail-messages{
        width: 500px;
    }
    .header-content-detail-message{
        padding: 5px;
        border-bottom: 1px solid #d7d7d7;
    }
    .info-friend-message{
        display: flex;
        align-items: center;
    }
    .info-friend-message img{
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
    .name-status{
        margin-left: 5px;
    }
    .name-status > p:nth-child(1){
        font-weight: bold;
    }
    .name-status p:nth-child(2){
        font-size: 14px;
    }
    .body-content-detail-message{
        padding: 5px;
        font-size: 14px;
    }
    .your-message {
        display: flex;
        align-items: end;
        margin-bottom: 5px;
    }
    .your-message img {
        height: 28px;
        width: 28px;
        border-radius: 50%;
    }
    .content-your-message{
        margin-left: 5px;
    }
    .your-message-1{
        padding: 5px;
        background-color: #f0f0f0;
        border-radius: 12px;
    }
    .my-message {
        display: flex;
        align-items: end;
        justify-content: end;
        margin-bottom: 5px;
    }
    .my-message img {
        height: 28px;
        width: 28px;
        border-radius: 50%;
    }
    .content-my-message{
        margin-left: 5px;
    }
    .my-message-1{
        padding: 5px;
        background-color: #0084ff;
        color: #ffffff;
        border-radius: 12px;
    }
    .enter-message{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .enter-message input{
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        padding: 5px;
        width: 75%;
        margin: 10px;
        outline: none;
    }
    .enter-message button{
        margin-left: 5px;
        font-size: 11px;
        height: 27px;
        padding: 5px 10px;
        cursor: pointer;
        color: #333333;
        background-color: #F4F1EA;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
    }
    .content-info-friend{
        width: 250px;
    }
    .header-content-info-friend {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .header-content-info-friend img {
        width: 72px;
        height: 72px;
        border-radius: 50%;
    }
    .name-info{
        margin-top: 5px;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .name-info p:nth-child(1){
        font-weight: bold;
        font-size: 16px;
    }
    .body-content-info-friend{
        padding: 0 10px;
    }
    .action{
        display: flex;
        justify-content: space-between;
    }
    .action-1{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .action-1 p {
        text-align: center;
        font-size: 14px;
    }
    .action-2{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .action-2 p {
        text-align: center;
        font-size: 14px;
    }
    .action-3{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .action-3 p {
        text-align: center;
        font-size: 14px;
    }

</style>
