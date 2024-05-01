<template>
    <div class="container">
        <div class="header-container-content">
            <router-link :to="`/community/group/detail/` + groupId">{{ groupId }}</router-link>
            <i class="fa-solid fa-greater-than"></i>
            <p>Invite Members</p>
        </div>
        <div class="body-container-content">
            <div class="container-content-1">
                <div class="select-friends-content">
                    <p>Invite friends to the group</p>
                    <form class="select-friend-form">
                        <div class="field-select">
                            <div class="search-friend">
                                <form>
                                    <input type="text" placeholder="Search friend">
                                    <input type="submit" value="Search">
                                </form>
                            </div>
                            <div class="friends-list">
                                <div class="friend-item">
                                    <input type="checkbox" name="">
                                    <div>
                                        <router-link to="">Trần Tính</router-link>
                                        <span>Hà Nội, Việt Nam</span>
                                        <span>Already a member</span>
                                    </div>
                                    <img src="https://s.gr-assets.com/assets/nophoto/user/u_25x33-ccd24e68f4773d33a41ce08c3a34892e.png" alt="">
                                </div>
                                <div class="friend-item">
                                    <input type="checkbox" name="">
                                    <div>
                                        <router-link to="">Trần Tính</router-link>
                                        <span>Hà Nội, Việt Nam</span>
                                        <span>Already a member</span>
                                    </div>
                                    <img src="https://s.gr-assets.com/assets/nophoto/user/u_25x33-ccd24e68f4773d33a41ce08c3a34892e.png" alt="">
                                </div>
                            </div>
                            <p>0 friends selected <span>(clear all)</span></p>
                        </div>
                        <div class="field-message">
                            <label for="message">message (optional)</label>
                            <br>
                            <textarea name="message" id="message" rows="5"></textarea>
                        </div>
                        <div class="field-submit">
                            <input type="submit" value="Invite">
                        </div>
                    </form>
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
                <div class="invite-link-content">
                    <h4>INVITE LINK</h4>
                    <span>Send this link to your friends to invite them to this group.</span>
                    <button>Get Link</button>
                </div>
                <div class="inviting-guidelines-content">
                    <h4>Inviting Guidelines</h4>
                    <ul style="font-size: 14px; padding: 0 20px; margin-top: 10px;">
                        <li>The number of invitations you can send is limited by how active you are in this group.</li>
                        <li>Friends that have a pending invitation will be grayed out to prevent duplicate invites.</li>
                        <li>Friends that have rejected a previous invitation will *not* be grayed out, so please don't invite all your friends more than once.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        groupId: {type: String, default: ""}
    },
    data(){
        return {
            selected: true
        }
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
    .header-container-content > a {
        font-size: 20px;
        font-weight: 600;
    }
    .header-container-content > i {
        font-size: 14px;
        margin: 0 5px;
    }

    .header-container-content > p {
        font-size: 20px;
        font-weight: 600;
    }
    .body-container-content {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    .container-content-1{
        width: 750px;
    }
    .select-friends-content{
        width: 70%;
    }
    .select-friend-form{
        margin-top: 10px;
    }
    .field-select {
        height: 300px;
        overflow: auto;
    }
    .search-friend{
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }
    .search-friend > form > input[type="text"] {
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        font-size: 14px;
        padding: 2px 5px;
        font-family: 'Times New Roman', Times, serif;
    }
    .search-friend > form > input[type="text"]:focus{
        box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .search-friend > form > input[type="submit"] {
        font-size: 14px;
        margin-left: 5px;
        padding: 2px 12px;
        color: #333333;
        background-color: #F4F1EA;
        cursor: pointer;border-radius: 3px;
        border: 1px solid #D6D0C4;
        font-family: 'Times New Roman', Times, serif;
    }
    .search-friend > form > input[type="submit"]:hover {
        color: #333333;
        background-color: #ede6d6;
    }
    .friends-list {
        display: grid;
        grid-template-columns: auto auto;
        gap: 10px;
    }
    .friend-item {
        display: grid;
        grid-template-columns: 20px 150px 40px;
        align-items: center;
        justify-content: center;
        background: #EEE;
        box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.1);
        padding: 5px 0;
    }
    .friend-item > input {
        height: 20px;
        width: 20px;
    }
    .friend-item > div {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        margin-left: 5px;
    }
    .friend-item > img {
        height: 33px;
        width: 25px;
    }

    .field-select > p {
        font-size: 14px;
        margin-top: 10px;
    }
    .field-select > p > span {
        color: #00635d;
        cursor: pointer;
    }
    .field-select > p > span:hover {
        text-decoration: underline;
     }
    .field-message{
        margin-top: 10px;
    }
    .field-message > label {
        font-size: 14px;
    }
    .field-message > textarea{
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        font-size: 14px;
        padding: 2px 5px;
        font-family: 'Times New Roman', Times, serif;
        width: 100%;
        margin-top: 2px;
    }
    .field-message > textarea:focus{
        box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-submit{
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .field-submit > input {
        font-size: 14px;
        padding: 5px 12px;
        color: #333333;
        background-color: #F4F1EA;
        cursor: pointer;border-radius: 3px;
        border: 1px solid #D6D0C4;
        font-family: 'Times New Roman', Times, serif;
    }
    .field-submit > input:hover{
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
    .invite-link-content{
        margin-top: 10px;
    }
    .invite-link-content > h4 {
        padding: 5px 0;
        font-size: 14px;
        border-bottom: 1px solid #EBE8D5;
        margin-bottom: 10px;
    }
    .invite-link-content > span {
       font-size: 14px;
    }
    .invite-link-content > button {
        margin-top: 10px;
        display: block;
        padding: 8px 12px;
        color: #333333;
        background-color: #F4F1EA;
        cursor: pointer;    
        font-size: 14px;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        font-family: 'Times New Roman', Times, serif;
    }
    .invite-link-content > button:hover {
        color: #333333;
        background-color: #ede6d6;
    }
    .inviting-guidelines-content{
        margin-top: 10px;
    }
    .inviting-guidelines-content > h4 {
        padding: 5px 0;
        border-bottom: 1px solid #EBE8D5;
        font-size: 14px;
    }
</style>