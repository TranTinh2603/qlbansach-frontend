<template>
    <div class="col-md-6 offset-md-3 shadow-sm p-3 mb-5 bg-body-tertiary rounded" >
        <h3>Thông tin chi tiết</h3>
        <hr>
        <p>Họ tên: <strong>{{ this.customer.HoTenKH }}</strong></p>
        <p>Địa chỉ: <strong>{{ this.customer.DiaChi }}</strong></p>
        <p>Số điện thoại: <strong>{{ this.customer.SoDienThoai }}</strong></p>
        <p>Email: <strong>{{ this.customer.Email }}</strong></p>
        <hr>
        <div class="d-flex justify-content-center" v-on:click="handleEdit()">
            <button class="btn btn-primary">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        customer: {type: Object , default: {}} ,
    },

    methods: {
        handleEdit(){
            this.$emit('edit', this.customer._id)
        }
    }
}
</script>