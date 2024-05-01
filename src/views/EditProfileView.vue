<template>
    <div class="container-edit-profile">
        <div class="header-content-edit-profile">
            <h2>Account Settings <router-link to="/">View My Profile</router-link></h2>
        </div>
        <div class="navigation-content-edit-profile">
            <router-link class="nav-link active" to="/">Profile</router-link>
            <router-link class="nav-link" to="/">Profile</router-link>
            <router-link class="nav-link" to="/">Profile</router-link>
            <router-link class="nav-link" to="/">Profile</router-link>   
        </div>
        <div class="body-content-edit-profile">
            <form class="form-content-edit-profile">
                <div class="content-photo-avatar">
                    <div class="header-content-photo-avatar">
                        <h3>Display avatar</h3>
                    </div>
                    <div class="body-content-photo-avatar">
                        <router-link to="/">
                            <img :src="user.image" alt="">
                        </router-link>
                        <br>
                        <input type="file">
                    </div>
                </div>
                <div class="content-display-name">
                    <div class="header-content-display-name">
                        <h3>Display name</h3>
                        <p>Manage how your name appears on BSN</p>
                    </div>
                    <div class="body-content-display-name">
                        <div class="field-first-name"> 
                            <label for="first-name">First Name <span>*</span></label>
                            <br>
                            <input id="first-name" type="text" v-model="user.Name">
                        </div>
                        <div class="field-last-name"> 
                            <label for="last-name">Last Name <span>*</span></label>
                            <br>
                            <input id="last-name" type="text">
                        </div>
                    </div>
                </div>
                <div class="content-profile-information">
                    <div class="header-content-profile-information">
                        <h3>Profile Information</h3>
                        <p>Manage what people see when they view your profile.</p>
                    </div>
                    <div class="body-content-profile-information">
                        <div class="field-profile-url"> 
                            <label for="profile-url">Profile URL (goodreads.com/user_name)</label>
                            <br>
                            <input id="profile-url" type="text">
                        </div>
                        <div class="field-gender">
                            <label for="gender">Gender</label>
                            <br>
                            <select name="gender" id="gender">
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Custom">Custom</option>
                            </select>
                        </div>
                        <div class="field-country"> 
                            <label for="country">Country</label>
                            <br>
                            <input id="country" type="text">
                        </div>
                        <div class="field-address"> 
                            <label for="address">Address</label>
                            <br>
                            <input id="address" type="text">
                        </div>
                        <div class="field-date-of-birth"> 
                            <label for="date-of-birth">Date of birth</label>
                            <br>
                            <input id="date-of-birth" type="date">
                        </div>
                        <div class="field-about-me"> 
                            <label for="about-me">About me</label>
                            <br>
                            <textarea id="about-me" cols="50" rows="10"></textarea>
                        </div>
                        <div class="field-submit">
                            <button class="button-submit">Save Profile Settings</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import AuthService from '../services/AuthService';
import UserService from '../services/user.service';
export default {
    data(){
        return {
            user: {},
        }
    },
    methods: {
        async getUser(){
            try {
                AuthService.checkAuthentication()
                const email = AuthService.user.Email;
                this.user = await UserService.getUserByEmail(email)
            } catch (error) {
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
    .container-edit-profile{
        margin: 10px 150px;
    }
    .header-content-edit-profile{
        margin-top: 0;
        margin-bottom: 15px;
    }
    .header-content-edit-profile > h2 {
        padding: 0px 0px 2px 0px;
        font-size: 22px;
        font-weight: bold;
    }
    .header-content-edit-profile  h2 a {
        font-size: 16px;
        float: right;
        width: auto;
    }
    .navigation-content-edit-profile{
        display: flex;
        border-bottom: 1px solid #D8D8D8;
        margin-bottom: 20px;
    }
    .nav-link {
        display: block;
        margin: 0 5px;
        padding: 5px 10px;
        background-color: white;
        color: #382110;
        font-size: 16px;
    }
    .nav-link.active{
        border-bottom: 2px solid black;
    }
    .nav-link:hover{
        border-bottom: 2px solid black;
    }
    .content-photo-avatar{
        margin-bottom: 20px;
    }
    .header-content-photo-avatar{
        margin-bottom: 10px;
    }
    .body-content-photo-avatar a img{
        width: 111px;
        height: 148px;
        margin-bottom: 10px;
    }
    .content-display-name{
        margin-bottom: 20px;
    }
    .header-content-display-name{
        margin-bottom: 10px;
    }
    
    .header-content-display-name h3 {
        margin-bottom: 5px;
    }
    .field-first-name{
        margin-bottom: 10px;
    }
    .field-first-name label{
        font-size: 14px;
    }
    .field-first-name label span{
        color: red;
        font-size: 14px;
    }
    .field-first-name input {
        margin-top: 5px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        resize: none;
        font-size: 14px;
        padding: 4px;
    }
    .field-first-name input:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-last-name label{
        font-size: 14px;
    }
    .field-last-name label span{
        color: red;
        font-size: 14px;
    }
    .field-last-name input {
        margin-top: 5px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        resize: none;
        font-size: 14px;
        padding: 4px;
    }
    .field-last-name input:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .content-profile-information{
        margin-bottom: 20px;
    }
    .header-content-profile-information{
        margin-bottom: 10px;
    }
    .header-content-profile-information h3{
        margin-bottom: 5px;
    }
    .field-profile-url{
        margin-bottom: 10px;
    }
    .field-profile-url label{
        font-size: 14px;
    }
    .field-profile-url input {
        margin-top: 5px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        resize: none;
        font-size: 14px;
        padding: 4px;
    }
    .field-profile-url input:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-gender{
        margin-bottom: 10px;
    }
    .field-gender label{
        font-size: 14px;
    }
    .field-gender select{
        margin-top: 5px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        resize: none;
        font-size: 14px;
        padding: 4px;
    }
    .field-gender select:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-country{
        margin-bottom: 10px;
    }
    .field-country label{
        font-size: 14px;
    }
    .field-country input {
        margin-top: 5px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        resize: none;
        font-size: 14px;
        padding: 4px;
    }
    .field-country input:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-address {
        margin-bottom: 10px;
    }
    .field-address label {
        font-size: 14px;
    }
    .field-address input {
        margin-top: 5px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        resize: none;
        font-size: 14px;
        padding: 4px;
    }
    .field-address input:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-date-of-birth{
        margin-bottom: 10px;
    }
    .field-date-of-birth label {
        font-size: 14px;
    }
    .field-date-of-birth input {
        margin-top: 5px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        resize: none;
        font-size: 14px;
        padding: 4px;
    }
    .field-date-of-birth input:focus {
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .field-about-me{
        margin-bottom: 10px;
    }
    .field-about-me label {
        font-size: 14px;
    }
    .field-about-me textarea {
        margin-top: 5px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        font-size: 14px;
        padding: 4px;
    }
    .field-about-me textarea:focus {
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    /* .field-submit{
        margin-left: 10px;
    } */
    .button-submit{
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        font-size: 14px;
        cursor: pointer;
        color: #333333;
        background-color: #F4F1EA;
        padding: 8px 12px;
    }
    .button-submit:hover{
        color: #333333;
        background-color: #ede6d6;
    }
</style>