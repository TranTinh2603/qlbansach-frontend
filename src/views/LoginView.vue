<template>
    <div>
        <LoginForm @login="login" @register="register"/>
    </div>
</template>

<script>
import LoginService from '../services/login.service';
import RegisterService from '../services/register.service';
import AuthService from '../services/AuthService.js';
import LoginForm from '@/components/LoginForm.vue';

export default {
    components: {
        LoginForm,
    },

    methods: {
    
     async login(data) {
            try {
                // if (data.isRegistering) {
                //     console.log(data);
                //     const document = await RegisterService.create(data);
                //     console.log(document);
                //     alert(document.message ? document.message : 'Đăng kí thành công');
                // } else {
                    console.log(data);
                    const token = await LoginService.findByEmail(data);
                    console.log(token);
                    if (token !== '') {
                        alert('Login successful');
                        AuthService.setAuthentication(true, { Email: data.Email });
                        this.$router.push({ path: '/' });
                    }
                // }
            } catch (error) {
                if (error.response && error.response.status === 404 || error.response.status === 401 ) {
                    alert('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.');
                } else {
                    this.handleError(error);
                }
            }
        },
        async register(data){
            try {
                const register = await RegisterService.create(data);
                if (!register.message) {
                    console.log("thành công");
                } else {
                    console.log("thất bại");
                }
            } catch (error) {
                
            }
        },
        handleError(error) {
            console.error('Server error:', error);
        },
        toggleRegister() {
            this.isRegistering = !this.isRegistering;
        },
    },
};
</script>
