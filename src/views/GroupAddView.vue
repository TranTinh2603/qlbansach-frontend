<template>
    <div class="container">
        <div class="container-content-1">
            <div class="header-create-group-content">
                <router-link to="/community/group">Group</router-link>
                <i class="fa-solid fa-greater-than"></i>
                <h3>Create a Group</h3>
            </div>
            <div class="body-create-group-content">
                <form @submit.prevent="addGroup(group, user.userId)" class="form-create-group">
                    <div class="field-group-name">
                        <label class="label" for="group-name">Group name<span>*</span></label>
                        <br>
                        <input type="text" name="group-name" id="group-name" v-model="group.name">
                    </div>
                    <div class="field-description">
                        <label class="label" for="description">Description<span>*</span></label>
                        <br>
                        <textarea type="text" name="description" id="description" rows="5" v-model="group.description"></textarea>
                    </div>
                    <div class="field-rules">
                        <label class="label" for="rules">Rules</label>
                        <br>
                        <textarea name="rules" id="rules" cols="30" rows="5" v-model="group.rules"></textarea>
                        <br>
                        <div class="select-show-rule">
                            <div class="option-rule">
                                <input type="radio" name="option" id="option1" value="only" v-model="group.showRule">
                                <label for="option1" class="label">Only show rules to new members</label>
                            </div>
                            <div class="option-rule">
                                <input type="radio" name="option" id="option2" value="always" v-model="group.showRule">
                                <label for="option2" class="label">Always show rules when members post new comments</label>
                            </div>
                        </div>
                    </div>
                    <div class="field-topic-group">
                        <label class="label">Group or bookclub topic<span>*</span></label>
                        <div class="topic-group">
                            <select name="topic1" id="topic1" v-model="group.groupTopics">
                                <option value="">Select Topic:</option>
                                <option value="Books & Literature">Books & Literature</option>
                                <option value="Business">Business</option>
                                <option value="Entertainment & Arts">Entertainment & Arts</option>
                                <option value="Friends & Common Interest">Friends & Common Interest</option>
                                <option value="Geography">Geography</option>
                                <option value="Goodreads Authors">Goodreads Authors</option>
                                <option value="Just for Fun">Just for Fun</option>
                                <option value="Organizations">Organizations</option>
                                <option value="Student Groups">Student Groups</option>
                            </select>
                        </div>
                        <!-- <div class="topic-group">
                            <select name="topic2" id="topic2">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div> -->
                    </div>
                    <div class="field-tags">
                        <label for="tags" class="label">Tags<span>(Comma separated: bookclub, fantasy, romance, etc)</span></label>
                        <br>
                        <input type="text" name="tags" id="tags" v-model="group.tags">
                    </div>
                    <div class="field-satus">
                        <div class="option-satus">
                            <div>
                                <input type="radio" name="status" id="pubic" value="public" v-model="group.status">
                                <label for="public" class="label">This group is public.</label>
                            </div>
                            <span>Anyone can join this group. Anyone can view the group information and discussion board.</span>
                        </div>
                        <div class="option-satus">
                            <div>
                                <input type="radio" name="status" id="private" value="private" v-model="group.status">
                                <label for="private" class="label">This group is private.</label>
                            </div>
                            <span>New members must be approved by the group moderators. Anyone can see the group information, but only members can see the polls and discussion board. Only Moderators can invite new members.</span>
                        </div>
                        <div class="option-satus">
                            <div>
                                <input type="radio" name="status" id="secret" value="secret" v-model="group.status">
                                <label for="secret" class="label">This group is secret.</label>
                            </div>
                            <span>New members must be approved by the group moderators. The group will not appear in search results or in the profiles of its members. Only members can see the group information, polls, and discussion board. Only Moderators can invite new members.</span>
                        </div>
                    </div>
                    <div class="field-country">
                        <label for="country" class="label">Country<span>*</span></label>
                        <br>
                        <select name="country" id="country" v-model="group.country">
                            <option v-for="(country, index) in countrys" :key="index" :value=country.name.common>{{ country.name.common }}</option>
                        </select>
                    </div>
                    <div class="field-affiliated">
                        <label for="affiliated" class="label">Affiliated website<span>(optional. eg. https://www.goodreads.com)</span></label>
                        <br>
                        <input type="text" id="affiliated" name="affiliated" v-model="group.affiliatedWebsite">
                    </div>
                    <div class="field-submit">
                        <input type="submit" value="Create">
                    </div>
                </form>
            </div>
        </div>
        <div class="container-content-2">
            <div class="moderating-content">
                <h4>About Moderating Groups</h4>
                <ul>
                    <li>Only moderators can edit group settings.</li>
                    <li>You can add and remove moderators on the members page.</li>
                    <li>You can block users from joining this group on the block/unblock users page.</li>
                    <li>For more information about being a moderator, read the moderator guidelines.</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import AuthService from "../services/AuthService"
import UserService from "../services/user.service"
import GroupService from "../services/group.service"
export default {
    data(){
        return {
            user: {},
            group: {
                country: 'Vietnam'
            },
            countrys: [],
        }
    },
    methods: {
        async getUser(){
            try {
                AuthService.checkAuthentication();
                const email = AuthService.user.Email;
                this.user = await UserService.getUserByEmail(email)
            } catch (error) {
                console.log(error);
            }
        },
        async getCountry(){
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                this.countrys = data
            } catch (error) {
                
            }
        },
        async addGroup(group, userId){
            try {
                const date = new Date();
                const timestamp = date.getTime();
                const randomString = Math.random().toString(36).substring(5);
                const result = randomString + '_' + timestamp;
                const data = {
                    groupId: result,
                    userId: userId,
                    name: group.name,
                    description: group.description,
                    image: "",
                    rules: group.rules,
                    showRule: group.showRule,
                    groupTopics: group.groupTopics,
                    tags: group.tags,
                    createdAt: timestamp,
                    status: group.status,
                    country: group.country,
                    affiliatedWebsite: group.affiliatedWebsite,
                    members: [{
                        userId: userId,
                        role: "admin",
                    }],
                    bookshelfs: [],
                    discussions: []
                }
                if (data.status === "private") {
                    data["joinRequests"] = []
                }
                const addGroup = await GroupService.create(data);
                if (addGroup) {
                    alert("Add group successfully!")
                } else {
                    alert("Add group failed!")
                }
            } catch (error) {
                alert("Please try again!")
            }
        }
    },
    mounted(){
        this.getUser()
        this.getCountry()
    }
}
</script>
<style scoped>
    a{
        color: #00635d;
        font-size: 14px;
    }
    a:hover {
        text-decoration: underline;
    }
    .container{
        margin: 20px 100px;
        display: flex;
        justify-content: space-between;
    }
    .container-content-1{
        width: 700px;
    }
    .container-content-2{
        width: 340px;
    }
    .header-create-group-content{
        margin-bottom: 20px;
        display: flex;
        align-items: center;
    }
    .header-create-group-content > a {
        font-size: 20px;
        font-weight: 600;
    }
    .header-create-group-content > i {
        font-size: 12px;
        margin: 0 5px;
    }
    .body-create-group-content{
        width: 100%;
    }
    .form-create-group{
        width: 100%;
    }
    .field-group-name{
        margin-bottom: 10px;
    }
    .label {
        font-size: 14px;
    }
    .field-group-name > input {
        margin-top: 2px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        width: 80%;
        font-size: 14px;
        padding: 4px;
        font-family: 'Times New Roman', Times, serif;
    }
    .field-group-name > input:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-group-name > .label > span {
        color: red;
    }
    .field-description{
        margin-bottom: 10px;
    }
    .field-description > .label > span {
        color: red;
    }
    .field-description > textarea {
        margin-top: 2px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        width: 80%;
        font-size: 14px;
        padding: 4px;
        font-family: 'Times New Roman', Times, serif;
    }
    .field-description > textarea:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-rules{
        margin-bottom: 10px;
    }
    .field-rules > textarea {
        margin-top: 2px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        width: 80%;
        font-size: 14px;
        padding: 4px;
        font-family: 'Times New Roman', Times, serif;
    }
    .field-rules > textarea:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .select-show-rule {
        margin-top: 10px;
    }
    .option-rule{
        display: flex;
        align-items: center;
    }
    .option-rule > input {
        margin-right: 5px;
    }
    .field-topic-group{
        margin-bottom: 10px;
    }
    .field-topic-group > .label > span {
        color: red;
    }
    .topic-group {
        margin-top: 2px;
    }
    .topic-group > select {
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        width: 40%;
        font-size: 14px;
        padding: 4px;
        font-family: 'Times New Roman', Times, serif;
    }
    .topic-group > select:focus {
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-tags{
        margin-bottom: 10px;
    }
    .field-tags > .label > span {
        color: #999999;
        margin-left: 5px;
    }
    .field-tags > input {
        margin-top: 2px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        width: 40%;
        font-size: 14px;
        padding: 4px;
        font-family: 'Times New Roman', Times, serif;
    }
    .field-tags > input:focus {
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-satus {
        margin-bottom: 10px;
    }
    .option-satus{
        margin-bottom: 10px;
    }
    .option-satus > div {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }
    .option-satus > div > input {
        margin-right: 5px;
    }
    .option-satus > span {
        font-size: 14px;
        margin-left: 20px;
        color: #777;
    }
    .field-country{
        margin-bottom: 10px;
    }
    .field-country > .label > span {
        color: red;
    }
    .field-country > select {
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        width: 40%;
        margin-top: 2px;
        font-size: 14px;
        padding: 4px;
        font-family: 'Times New Roman', Times, serif;
    }
    .field-country > select:focus {
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-affiliated{
        margin-bottom: 20px;
    }
    .field-affiliated > .label > span {
        color: #999999;
        margin-left: 5px;
    }
    .field-affiliated > input {
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        width: 40%;
        margin-top: 2px;
        font-size: 14px;
        padding: 4px;
        font-family: 'Times New Roman', Times, serif;
    }
    .field-affiliated > input:focus {
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-submit > input {
        padding: 8px 12px;
        color: #333333;
        background-color: #F4F1EA;
        cursor: pointer;
        font-size: 14px;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        font-family: 'Times New Roman', Times, serif;
    }
    .field-submit > input:hover {
        color: #333333;
        background-color: #ede6d6;
    }
    .moderating-content > h4{
        margin-bottom: 10px;
    }
    .moderating-content > ul {
        padding-left: 20px;
        font-size: 14px;
    }
</style>