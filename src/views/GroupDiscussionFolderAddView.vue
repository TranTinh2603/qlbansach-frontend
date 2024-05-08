<template>
    <div class="container">
        <div class="container-content">
            <div class="container-content-1">
                <div class="header-content-1">
                    <router-link :to="'/community/group/discussion/' + groupId">Discussion</router-link>
                    <i class="fa-solid fa-greater-than"></i>
                    <p>Add folder</p>
                </div>
                <div class="body-content-1">
                    <span>Folders allow you to organize topics in your group into sections. This is useful for groups that have hundreds of topics, as it can greatly improve navigation. For groups that don't have over one hundred topics we don't recommend using folders.</span>
                    <form @submit.prevent="addFolder(user.userId)" class="form-add-folder">
                        <div class="field-folder-name">
                            <label for="folder-name">
                                Folder name
                            </label>
                            <br>
                            <input name="folder-name" id="folder-name" type="text" v-model="folderName">
                        </div>
                        <div class="field-submit">
                            <input type="submit" value="Add">
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import GroupService from '../services/group.service'
import UserService from '../services/user.service';
import AuthService from '../services/AuthService';
export default {
    props: {
        groupId: {type: String, default: ""}
    },
    data() {
        return {
            folderName: "",
            user: {},
        }
    },
    methods: {
        async getUser(){
            AuthService.checkAuthentication();
            const email = AuthService.user.email
            this.user = await UserService.getUserByEmail(email)
        },
        async addFolder(userId){
            try {
                const date = new Date();
                const timestamp = date.getTime();
                const randomString = Math.random().toString(36).substring(5);
                const result = randomString + '_' + timestamp;
                console.log(userId);
                const data = {
                    folderId: result,
                    folderName: this.folderName,
                    createdAt: timestamp,
                    createdBy: userId,
                    topics: []
                }
                const add = await GroupService.updateDiscussion(this.groupId, data)
                if (add) {
                    alert('Create a new folder success!')
                } else {
                    alert('Craete a new folder failure!');
                }
            } catch (error) {
                alert('Craete a new folder failure!')
                console.log(error);
            }
        }
    },
    mounted(){
        this.getUser()
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
        margin-bottom: 20px;
    }
    .body-content-1 > span {
        font-size: 14px;
    }
    .form-add-folder{
        margin-top: 20px;
    }
    .field-folder-name {
        font-size: 14px;
    }
    .field-folder-name > input {
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        margin-top: 2px;
        padding: 2px 5px;
        font-family: 'Times New Roman', Times, serif;
    }
    .field-folder-name > input:focus{
        box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-submit {
        margin-top: 20px;
    }
    .field-submit > input {
        color: #333333;
        background-color: #F4F1EA;
        font-size: 14px;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        cursor: pointer;
        font-family: 'Times New Roman', Times, serif;
        padding: 5px 10px;
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
</style>