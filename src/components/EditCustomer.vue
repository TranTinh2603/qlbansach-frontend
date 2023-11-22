<template>
    <form class="col-md-6 offset-md-3 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <h3 class="mb-5">Chỉnh sửa thông tin</h3>
        <div class="mb-4 row">
            <label class="col-3">Họ tên:</label>
            <input type="text" class="col-7" v-model="this.customer.HoTenKH">
        </div>
        <div class="mb-4 row">
            <label  class="col-3">Số điện thoại:</label>
            <input class="col-7" type="text" v-model="this.customer.SoDienThoai">
        </div>
        <div class="mb-4 row">
            <label class="col-3">Địa chỉ:</label>
            <input type="text" class="col-7" v-model="this.customer.DiaChi">
        </div>

        <div class="d-flex justify-content-end"> 
            <button v-on:click="handleEdit()" class="btn btn-primary">Cập nhập</button>
        </div>
    </form>
</template>

<script>

export default {
    props: {
        customer: {type: Object, default: {}}
    },
    methods: {
        handleEdit(){
            this.$emit('edit', this.customer);
        }
    },

};
</script>

<style scoped></style>
