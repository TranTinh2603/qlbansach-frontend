<template>
    <div>
        <h1>Notification App</h1>
        <div v-for="user in users" :key="user.id">
            <h2>{{ user.name }}</h2>
            <input type="text" v-model="notificationMessages[user.id]" />
            <button @click="sendNotification(user.id)">Send Notification</button>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            users: [
                { id: "U001", name: 'User 1' },
                { id: "U002", name: 'User 2' }
            ],
            notificationMessages: {
                "U001": '',
                "U002": ''
            },
            socket: null
        };
    },
    mounted() {
        // Kết nối tới máy chủ
        this.socket = io('http://localhost:8888');
        this.socket.on('connect', () => {
            console.log('Connected to server');
            // Xác định id của người dùng
            this.socket.emit('setUserId', "U001");
            this.socket.emit('setUserId', "U002"); // Thay 1 bằng id của người dùng
        });
        // Lắng nghe sự kiện nhận thông báo
        this.socket.on('notification', message => {
            console.log('Received notification:', message);
            alert('Notification: ' + message);
        });
    },
    methods: {
        sendNotification(userId) {
            const message = this.notificationMessages[userId];
            this.socket.emit('sendNotification', { userId, message });
            this.notificationMessages[userId] = ''; // Xóa tin nhắn sau khi gửi
        }
    }
};
</script>

<style>
</style>
