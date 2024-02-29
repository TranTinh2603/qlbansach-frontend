<template>
    <div class="d-flex" >
        <button class="border-0 bg-white"  v-for="(item, index) in category" :key="index" v-on:click="handleCategory(item.MaTheLoai)">
            <img :src="item.HinhTL">
            <p class="mb-0">{{ item.TenTheLoai }}</p>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        category: {
            type: Array,
            default: []
        }
    },
    methods: {
        handleCategory(id){
            this.$emit('categoryIndex', id)
        }
    }
}
</script>

<style scoped>
    img {
        height: 100px;
        width: 100px;
    }
</style>
