<template>
    <div class="row bg-white d-flex justify-content-center">
        <form class="col-4 shadow p-3 mb-5 bg-body-tertiary rounded" @submit.prevent="handleSubmit">
            <h4 class="text-center">{{ data.isRegistering ? 'Đăng ký' : 'Đăng nhập' }}</h4>
            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control rounded-0" v-model="data.email" placeholder="Enter email" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control rounded-0" v-model="data.password" placeholder="Enter password"
                    required>
            </div>
            <div class="mb-3" v-if="data.isRegistering">
                <label class="form-label">Nhập lại Password</label>
                <input type="password" class="form-control rounded-0" v-model="data.confirmPassword"
                    placeholder="Nhập lại password" required ref="confirmPasswordInput" />
            </div>
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-primary" type="submit">{{ data.isRegistering ? 'Đăng ký' : 'Đăng nhập' }}</button>
            </div>
            <hr />
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-success" type="button" @click="toggleRegister">{{ data.isRegistering ? 'Đăng nhập' : 'Đăngký' }}</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: {
                mskh: '',
                email: '',
                password: '',
                confirmPassword: '',
                isRegistering: false,
            },
        };
    },
    methods: {
        handleSubmit() {
             const customerNumber = Date.now().toString() + Math.floor(Math.random() * 1000);
            if (this.validatePasswords()) {
                this.data.mskh = customerNumber;
                this.$emit('login', this.data);
            } else {
                alert('Nhập lại mật khẩu sai!');
                this.$refs.confirmPasswordInput.focus();

            }
        },
        toggleRegister() {
            this.data.isRegistering = !this.data.isRegistering;
        },
        validatePasswords() {
            if (this.data.isRegistering) {
                return this.data.password === this.data.confirmPassword;
            }
            return true; 
        },
    },
};
</script>