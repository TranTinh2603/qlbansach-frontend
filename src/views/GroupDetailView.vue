<template>
    <div class="container">
        <div class="container-content-image">
            <div class="banner">
                <img src="https://images.gr-assets.com/groups/1567002644masthead/179584.jpg" alt="">
            </div>
            <div class="avatar">
                <img src="https://images.gr-assets.com/groups/1479936067p3/179584.jpg" alt="">
            </div>
        </div>
        <div class="container-content-group">
            <div class="header-content-group">
                <h2>{{ group.name }}</h2>
            </div>
            
            <div class="body-content-container">
                <div class="body-content-container-1">
                    <div v-if="checkIsMemberGroup(user.userId, group) === false" class="join-group-content">
                        <button @click="handleJoinGroup(user.userId)">{{ checkJoinRequest(user.userId, group) === true ? 'Sent Request' : 'Join Group' }}</button>
                    </div>
                    <div class="description-content">
                        <span>
                            {{ group.description }}
                        </span>
                    </div>
                    <div class="group-info-content">
                        <p>Group info</p>
                        <div class="show-group-info">
                            <div class="category">
                                <div>category</div>
                                <router-link to="/">{{ group.groupTopics }}</router-link>
                            </div>
                            <div class="tags">
                                <div>tags</div>
                                <p><router-link v-for="(tag, index) in group.tags" :key="index" to="/">{{ tag }}</router-link></p>
                            </div>
                            <div class="location">
                                <div>location</div>
                                <span>{{ group.country }}</span>
                            </div>
                            <div class="group-status">
                                <div>group status</div>
                                <span>{{ group.status }}</span>
                            </div>
                            <div class="rule">
                                <div>rule</div>
                                <p>{{ group.rules }}</p>
                                <span>more</span>
                            </div>
                            
                        </div>
                    </div>
                    <div class="discussion-content">
                        <h4><router-link :to="'/community/group/discussion/' + groupId">DISCUSSION</router-link></h4>
                        <div v-if="group.discussions && group.discussions.length > 0" class="folder-discussion-list">
                            <div v-for="(discussion, index) in group.discussions" :key="index" class="folder-discussion-item">
                                <div class="header-folder-discussion-item">
                                    <div class="folder-name">
                                        <router-link :to="'/community/group/discussion/folder/topic/' + groupId + '&' + discussion.folderId">{{ discussion.folderName }}</router-link>
                                    </div>
                                </div>
                                <div class="body-folder-discussion-item">
                                    <div v-if="discussion.topics && discussion.topics.length > 0" class="topic-discussions-list">
                                        <div v-for="(topic, index) in discussion.topics" :key="index" class="topic-discussion-item">
                                            <div class="topic-name">
                                                <router-link :to="'/community/group/discussion/folder/topic/detail/' + groupId + '&' + discussion.folderId + '&' + topic.topicId">{{ topic.name }}</router-link>
                                            </div>
                                            <div class="topic-info">
                                                <span>By {{ topic.createdBy }} · {{ topic.comments ? topic.comments.length : '' }} posts · 755 views</span>
                                                <span>last updated Dec 26, 2022 02:37AM</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p v-else>No discussions have been started in this group yet. <router-link :to="'/community/group/discussion/folder/topic/add/' + groupId + '&' + discussion.folderId">Start one now »</router-link></p>
                                </div>
                            </div>
                        </div>
                        <p v-else>No discussions have been started in this group yet. <router-link to="/">Start one now »</router-link></p>
                        <router-link class="more-discussion" :to="'/community/group/discussion/' + groupId">More discussion...</router-link>
                    </div>
                    <div class="members-content">
                        <h4>MEMBERS ({{ group.members ? group.members.length : '' }})</h4>
                        <div class="members-list">
                            <div v-for="(member, index) in group.members" :key="index" class="member-item">
                                <img src="https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png" alt="">
                                <router-link to="/">{{ member.userId }}</router-link>
                            </div>
                        </div>
                        <router-link to="/" class="more-members">More members...</router-link>
                    </div>
                    <div class="bookshelf-content">
                        <h4>BOOKSHELF</h4>
                        <div class="book-list">
                            <div class="book-item">
                                <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1582004027l/51456746._SX98_.jpg" alt="">
                                <div class="book-info">
                                    <router-link to="/">Disability Visibility: First-Person Stories from the Twenty-first Century</router-link>
                                    <div>
                                        <span>by</span>
                                        <router-link to="/"> Alice Wong (Editor), Harriet McBryde Johnson (Contributor)</router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="book-item">
                                <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691147319i/11273677.jpg" alt="">
                                <div class="book-info">
                                    <router-link to="/">Mắt Biếc</router-link>
                                    <div>
                                        <span>by</span>
                                        <router-link to="/">Nguyễn Nhật Ánh</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="body-content-container-2">
                    <div class="navigation-content">
                        <router-link class="active" :to="'/community/group/detail/' + groupId" >Group Home</router-link>
                        <router-link :to="'/community/group/bookshelf/' + groupId">Bookshelf</router-link>
                        <router-link :to="'/community/group/discussion/' + groupId">Discussion</router-link>
                        <router-link :to="'/community/group/member/' + groupId">Members</router-link>
                        <router-link :to="'/community/group/send-invite/' + groupId">Send invite</router-link>
                        <router-link :to="'/community/group/setting/' + groupId">Setting</router-link>
                    </div>
                    <div class="my-navigation-content">
                        <router-link to="/">My Group Topics</router-link>
                        <router-link to="/">My Group Comments</router-link>
                    </div>
                    <div class="search-content">
                        <input type="text" class="search-input" placeholder="Saerch discussion">
                        <input type="submit" class="search-submit" value="Search">
                    </div>
                    <div class="moderators-content">
                        <h4>Moderators</h4>
                        <div class="moderators-list">
                            <div class="moderator-item">
                                <img src="https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png" alt="">
                                <div class="moderator-info">
                                    <router-link to="/">Trần Tính</router-link>
                                    <span>Moderator</span>
                                </div>
                            </div>
                            <div class="moderator-item">
                                <img src="https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png" alt="">
                                <div class="moderator-info">
                                    <router-link to="/">Trần Trung Tính</router-link>
                                    <span>Moderator</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AuthService from '../services/AuthService';
import UserService from '../services/user.service';
import GroupService from '../services/group.service'
export default {
    props: {
        groupId: { type: String, default: ""}
    },
    data(){
        return {
            user: {},
            group: {}
        }
    },
    methods: {
        async getUser(){
            AuthService.checkAuthentication()
            const email = AuthService.user.email
            this.user = await UserService.getUserByEmail(email);
        },
        async getGroup(){
            this.group = await GroupService.getByGroupId(this.groupId)
        },
        checkIsMemberGroup(userId, group){
            const check = group.members ? group.members.some(member => member.userId === userId) : true;
            return check
        },
        async handleJoinGroup(userId){
           try {
                 const data = {
                    userId: userId,
                }
                const updateMember = await GroupService.updateMember(this.groupId, data);
                if (updateMember) {
                    alert(updateMember.message)
                    window.location.reload()
                } else {
                    alert('Please try again!')
                }
           } catch (error) {
                console.log(error);
                alert('Please try again!')
           }
            
        },
        checkJoinRequest(userId, group){
            const check = group.joinRequests ? group.joinRequests.some(joinRequest => joinRequest.userId === userId) : false;
            return check
        }
    },
    mounted(){
        this.getUser();
        this.getGroup();
    }
}
</script>
<style scoped>
    a{
        color: #00635d;
    }
    a:hover {
        text-decoration: underline;
    }
    .container{
        margin: 20px 100px;
    }
    .container-content-image{
        position: relative;
    }
    .banner{
        width: 100%;
        height: 270px;
        overflow: hidden;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.3);
    }
    .banner > img {
        width: 100%;
        height: 100%;
    }
    .avatar{
        position: absolute;
        top: 0;
        margin-top: 220px;
        left: 20px;
        overflow: hidden;
        width: 111px;
        height: 111px;
        border-style: solid;
        border-color: #ccc;
        border-width: 1px;
        background: #fff;
        border-radius: 4px;
    }
    .header-content-group{
        padding: 16px 0 16px 152px;
        border-bottom: 1px solid #EBE8D5;
    }
    .join-group-content{
        margin-top: 10px;
        margin-left: 150px;
    }
    .join-group-content > button {
        padding: 8px 12px;
        color: #333333;
        background-color: #F4F1EA;
        cursor: pointer;
        font-size: 14px;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
    }
    .body-content-container{
        display: flex;
        justify-content: space-between;
    }
    .body-content-container-1{
        width: 750px;
    }
    .body-content-container-2{
        width: 300px;
    }
    .description-content{
        padding: 20px 0px 0px 150px;
    }
    .group-info-content{
        font-size: 14px;
        padding: 10px 0px 0px 150px;
    }
    .group-info-content > p {
        font-weight: 600;
    }
    .show-group-info {
        margin-top: 5px;
    }
    .category {
        margin-bottom: 5px;
        display: flex;
    }
    .category > div{
        color: #999;
        width: 100px;
    }
    .tags {
        margin-bottom: 5px;
        display: flex;
    }
    .tags > div{
        color: #999;
        width: 100px;
    }
    .tags > p{
        width: 400px;
    }
    .location {
        margin-bottom: 5px;
        display: flex;
    }
    .location > div{
        color: #999;
        width: 100px;
    }
    .group-status {
        margin-bottom: 5px;
        display: flex;
    }
    .group-status > div{
        color: #999;
        width: 100px;
    }
    .rule {
        margin-bottom: 5px;
        display: flex;
    }
    .rule > div{
        color: #999;
        width: 100px;
    }
    .rule > p {
        width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .rule > span {
        color: #00635d;
        cursor: pointer;
        user-select: none;
    }
    .discussion-content {
        margin-top: 20px;
    }
    .discussion-content > h4 {
        padding: 10px 0;
        font-size: 14px;
        border-bottom: 1px solid #D8D8D8;
    }
    .discussion-content > p {
        margin: 10px 0;
    }
    .folder-discussion-list{
        margin-bottom: 10px;
    }
    .header-folder-discussion-item {
        padding: 5px 0;
        border-bottom: 2px solid #EBE8D5;
    }
    .folder-name {
        font-weight: 600;
    }
    .body-folder-discussion-item{
        padding-left: 20px;
    }
    .body-folder-discussion-item > p {
        margin-top: 10px;
    }
    .topic-discussion-item {
        padding: 5px 0;
        border-bottom: 1px solid #d7d7d7;
    }
    .topic-name {
        margin-bottom: 3px;
    }
    .topic-info{
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        color: #999999;
    }
    .more-discussion{
        float: right;
    }
    .members-content{
        margin-top: 20px;
    }
    .members-content > h4 {
        font-size: 14px;
        padding: 5px 0;
        border-bottom: 1px solid #D8D8D8;
    }
    .members-list{
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
    }
    .member-item{
        margin-right: 10px;
    }
    .member-item > img {
        width: 50px;
        height: 66px;
        display: block;
        margin: 0 auto;
    }
    .member-item > a{
        font-size: 14px;
        display: block;
        text-align: center;
    }
    .more-members{
        float: right;
    }
    .bookshelf-content{
        margin-top: 40px;
    }
    .bookshelf-content > h4 {
        font-size: 14px;
        padding: 5px 0;
        border-bottom: 1px solid #D8D8D8;
    }
    .book-list{
        margin: 10px 0;
        display: grid;
        grid-template-columns: auto auto;
    }
    .book-item{
        display: flex;
        width: 300px;
    }
    .book-item > img {
        height: 147px;
        width: 98px;
    }
    .book-info{
        margin-left: 5px;
        overflow: hidden;
    }
    .book-info > a {
        font-size: 18px;
        color: black;
        font-weight: 600;
    }
    .book-info > div > a{
        font-size: 14px;
        color: #333333;
    }
    .book-info > div {
        font-size: 14px;
    }
    .navigation-content {
        display: grid;
        grid-template-columns: auto auto;
        font-size: 14px;
        padding: 10px 0;
        gap: 5px;
        border-bottom: 1px solid #EBE8D5;
    }
    .active{
        color: #333333;
        font-weight: 600;
    }
    .my-navigation-content{
        display: grid;
        grid-template-columns: auto auto;
        font-size: 14px;
        padding: 5px 0;
        border-bottom: 1px solid #EBE8D5;
    }
    .search-content {
        margin-top: 10px;
    }
    .search-input{
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        padding: 2px;
        width: 75%;
        font-size: 14px;
        font-family: 'Times New Roman', Times, serif;
    }
    .search-input:focus{
        outline: 0px;box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .search-submit {
        margin-left: 3px;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        cursor: pointer;
        color: #333333;
        background-color: #F4F1EA;
        font-family: 'Times New Roman', Times, serif;
        font-size: 14px;
        padding: 2px 12px;
    }
    .search-submit:hover{
        color: #333333;
        background-color: #ede6d6;
    }
    .moderators-content{
        margin-top: 10px;
    }
    .moderators-content > h4 {
        font-size: 14px;
        text-transform: uppercase;
        padding: 5px 0;
        border-bottom: 1px solid #D8D8D8;
    }
    .moderators-list{
        margin-top: 10px;
        display: grid;
        grid-template-columns: auto auto;
    }
    .moderator-item{
        display: flex;
    }
    .moderator-info{
        margin-left: 5px;
        font-size: 14px;
    }
    .moderator-info > a {
        display: block;
    }
    .moderator-info > span {
        color: #999999;
    }
</style>
