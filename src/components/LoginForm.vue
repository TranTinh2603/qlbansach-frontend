<template>
    <div class="container-login-form">
        <form class="container-form" @submit.prevent="handleLogin">
            <h1>Đăng nhập</h1>
            <div class="content-email">
                <label class="lable">Email</label>
                <input type="email" class="input" v-model="userLogin.Email" required>
            </div>
            <div class="content-password">
                <label class="lable">Password</label>
                <input type="password" class="input" v-model="userLogin.Password" required>
            </div>
            <div class="content-button-login">
                <button class="button-login" type="submit">Đăng nhập</button>
            </div>
            <hr />
            <div class="content-button-register">
                <button class="button-register" type="button" @click="toggleRegister">Đăng ký</button>
            </div>
        </form>
    </div>

    <!-- Modal -->
    <div class="modal" :class="{ 'show-modal': showModal }">
        <div class="modal-content">
            <div class="header-modal-content">
                <h2>Đăng ký</h2>
                <button class="close-modal" @click="toggleRegister"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <hr>
            <div class="body-modal-content">
                <div class="name-container">
                    <input type="text" placeholder="FirstName" v-model="user.firstName">
                    <input type="text" placeholder="Surname" v-model="user.surName">
                </div>
                <div class="email-container">
                    <input type="text" placeholder="Email address or Mobile number" v-model="user.Email">
                </div>
                <div class="password-container">
                    <input type="password" placeholder="Password" v-model="user.Password">
                </div>
                <div class="date-container">
                    <label for="date">Date of birth:</label>
                    <input type="date" name="date" placeholder="Date" v-model="user.Birthday">
                </div>
                <div class="gender-container">
                    <label>Gender:</label>
                    <div class="gender-input">  
                        <input type="radio" name="gender" value="Male" v-model="user.Gender">
                        <label for="male">Male</label><br>
                    </div>
                    <div class="gender-input">
                        <input type="radio" name="gender" value="Female" v-model="user.Gender">
                        <label for="female">Female</label><br>
                    </div>
                    <div class="gender-input">
                        <input type="radio" name="gender" value="Custom" v-model="user.Gender" >
                        <label for="custom">Custom</label><br>
                    </div>
                </div>
                <div>
                    <button @click="handleRegister()">Đăng ký</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            user: {
                Email: '',
                Password: '',
                Name: '',
                firstName: '',
                surName: '',
                Birthday: '',
                Gender: '',
            },
            userLogin: {
                Email: '',
                Password: '',
            },
            showModal: false,
        };
    },
    emits: ['login', 'register'],
    methods: {
        handleLogin() {
            this.$emit('login', this.userLogin);
            console.log(this.user);
        },
        handleRegister(){
            this.user.Name = `${this.user.surName} ${this.user.firstName}`;
            console.log(this.user);
            this.$emit('register', this.user);
        },
        toggleRegister() {
            this.showModal = !this.showModal;
        },
    },
};
</script>

<style scoped>
    .container-login-form {
        margin-top: 50px;
    }
    .container-form{
        width: 350px;
        margin: 0 auto;
    }
    .container-form h1{
        text-align: center;
    }   
    .content-email{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .lable{
        display: block;
        margin-bottom: 5px;
        margin-left: 5px;
    }

    .input{
        width: 100%;
        height: 36px;
        padding: 4px 8px;
        border-radius: 24px;
        border: 1px solid #a6a6a6;
        outline: 0;
    }
    .content-password{
        margin-bottom: 20px;
    }

    .content-button-login{
        margin-top: 40px;
        margin-bottom: 20px;
    }

    .button-login{
        width: 100%;
        height: 36px;
        padding: 4px 8px;
        border-radius: 24px;
        background-color: black;
        color: #ffffff;
        border: none;
        cursor: pointer;
    }
    .content-button-register{
        margin-top: 20px;
    }
    .button-register{
        width: 100%;
        height: 36px;
        padding: 4px 8px;
        border-radius: 24px;
        border: none;
        cursor: pointer;
    }
    .modal {
        display: none; /* initially hide the modal */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* semi-transparent background */
        z-index: 9999;
        
    }

    .modal-content {
        background-color: #fff;
        width: 432px;
        margin: 100px auto; /* center the modal vertically and horizontally */
        padding: 20px;
        border-radius: 5px;
        overflow: auto;
    }

    .show-modal {
        display: block;
        overflow: auto;
        transition: .3s ease-in-out; /* show the modal when the showModal property is true */
    }
    .header-modal-content{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .close-modal{
        height: 30px;
        width: 30px;
    }
    .body-modal-content{
        margin-top: 10px;
       
    }
    .name-container{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .name-container > input{
        width: 190px;
        padding: 10px 15px;
        background-color: #f5f6f7;
        border: 1px solid #aaadb0;
        border-radius: 5px;
        outline: none;
    }
    .email-container{
        width: 100%;
        margin-bottom: 10px;
    }
    .email-container > input{
        width: 100%;
        padding: 10px 15px;
        background-color: #f5f6f7;
        border: 1px solid #aaadb0;
        border-radius: 5px;
        outline: none;
    }
    .password-container {
        margin-bottom: 10px;
    }
    .password-container > input{
        width: 100%;
        padding: 10px 15px;
        background-color: #f5f6f7;
        border: 1px solid #aaadb0;
        border-radius: 5px;
        outline: none;
    }
    .date-container{
        margin-bottom: 10px;
    }
    .date-container >label {
        margin-left: 5px;
        margin-bottom: 5px;
    }
    .date-container > input {
        margin-top: 5px;
        width: 100%;
        padding: 10px 15px;
        background-color: #f5f6f7;
        border: 1px solid #aaadb0;
        border-radius: 5px;
        outline: none;
    }
    .gender-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .gender-input{
        display: flex;
        align-items: center;
        padding: 10px 15px;
        background-color: #f5f6f7;
        border: 1px solid #aaadb0;
        border-radius: 5px;
        outline: none;
    }
    .gender-input > input {
        margin-right: 5px;
    }
</style>