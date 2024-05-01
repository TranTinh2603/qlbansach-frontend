<template>
    <div class="container">
        <div class="container-content">
            <div class="container-content-1">
                <div class="header-content-1">
                    <router-link :to="`/community/group/detail/` + groupId">{{ groupId }}</router-link>
                    <i class="fa-solid fa-greater-than"></i>
                    <p>Members</p>
                </div>
                <div class="body-content-1">
                    <div class="tab-content">
                        <button class="active">All</button>
                        <button>Friends</button>
                        <button>Moderators</button>
                        <button>Requests</button>
                    </div>
                    <div class="members-list-content">
                        <div class="member-item">
                            <div class="member-info">
                                <img src="https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png" alt="">
                                <div>
                                    <router-link to="/">Trần Tính</router-link>
                                    <router-link to="/">15 book</router-link>
                                    <p>add title</p></div>
                                </div>
                            <div class="action-member">
                                <router-link to="/">0 comments</router-link>
                                <span>member since Apr 21, 2024</span>
                                <div>
                                    <span>make moderator</span>
                                    <span> | </span>
                                    <span>remove from group</span>
                                </div>
                            </div>
                        </div>
                        <div class="member-item">
                            <div class="member-info">
                                <img src="https://s.gr-assets.com/assets/nophoto/user/u_50x66-632230dc9882b4352d753eedf9396530.png" alt="">
                                <div>
                                    <router-link to="/">Trần Tính</router-link>
                                    <router-link to="/">15 book</router-link>
                                    <p>add title</p></div>
                                </div>
                            <div class="action-member">
                                <router-link to="/">0 comments</router-link>
                                <span>member since Apr 21, 2024</span>
                                <div>
                                    <span>make moderator</span>
                                    <span> | </span>
                                    <span>remove from group</span>
                                </div>
                            </div>
                        </div>
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
                    <router-link :to="'/community/group/discussion/' + groupId">Discussion</router-link>
                    <router-link to="/">Members</router-link>
                    <router-link to="/">Send invite</router-link>
                    <router-link to="/">Setting</router-link>
                </div>
                <div class="search-member-content">
                    <form class="search-member-form">
                        <input type="text" placeholder="Search member">
                        <input type="submit" value="Search">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import router from '../router';

export default {
    props: {
        groupId: { type: String, default: "" }
    },
    components: { router }
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
    
    .header-content-1 {
        display: flex;
        align-items: center;
    }
    .header-content-1 > a{
        font-size: 20px;
        font-weight: bold
    }
    .header-content-1 > i {
        font-size: 14px;
        margin: 0 5px;
    }
    .header-content-1 > p {
        font-size: 20px;
        font-weight: bold;
    }
    .body-content-1{
        margin-top: 10px;
    }
    .tab-content{
        border-bottom: 1px solid #D8D8D8;
    }
    .tab-content > button {
        background-color: transparent;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        margin-left: 10px;
    }
    .tab-content > button:hover{
        border-bottom: 2px solid black;
    }
    .tab-content > .active {
        border-bottom: 2px solid black;
    }
    .members-list-content{
        margin-top: 10px;
    }
    .member-item{
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #d7d7d7;
    }
    .member-info{
        display: flex;
        font-size: 14px;
    }
    .member-info  > img {
        height: 66px;
        width: 50px;
    }
    .member-info > div {
        margin-left: 5px;
        display: flex;
        flex-direction: column;
    }
    .member-info > div > a:first-child{
        font-weight: bold;
    }
    .member-info > div > p {
        color: #00635d;
    }
    .action-member {
        display: flex;
        flex-direction: column;
        font-size: 14px;
    }
    .action-member > div {
        color: #00635d;
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
    .search-member-content{
        margin-top: 10px;
    }
    .search-member-form {
        display: flex;
    }
    .search-member-form > input[type="text"]{
        width: 75%;
        padding: 2px 5px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        font-family: 'Times New Roman', Times, serif;
    }
    .search-member-form > input[type="text"]:focus {
        box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .search-member-form > input[type="submit"]{
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        color: #333333;
        background-color: #F4F1EA;
        font-size: 12px;
        padding: 4px 12px;
        cursor: pointer;
        margin-left: 5px;
    }
    .search-member-form > input[type="submit"]:hover{
        color: #333333;
        background-color: #ede6d6;
    }
</style>