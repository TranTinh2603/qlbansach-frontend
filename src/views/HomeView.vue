<template>
    <div class="page">
        <div class="read">
            <div class="currently-reading">
                <CurrentlyReading />
            </div>
            <hr>
            <div class="want-to-read">
                <h5>WANT TO READ</h5>
                <div class="content-want-to-read">
                    <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545314990i/10433999._SY180_.jpg" alt="">
                    <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545314990i/10433999._SY180_.jpg" alt="">
                </div>
                <router-link to="/a">View all books</router-link>
            </div>
            <hr>
        </div>
        <div class="update">
            <Posts />
        </div>
        <div class="recommend">
            <Recommend />
        </div>
    </div>
</template>
<script>
import CurrentlyReading from "../components/CurrentlyReading.vue";
import Posts from "../components/Posts.vue";
import Recommend from "../components/Recommend.vue";
export default {
    components: {
        CurrentlyReading,
        Posts,
        Recommend,
    }
};
</script>
<style scoped>
.page {
    padding: 10px 20px;
    display: flex;
    background-color: #f9f7f4;
    justify-content: space-between;
}

.read{
    width: 300px;
}

.currently-reading{
    margin-bottom: 10px;
}

.want-to-read{
    margin-top: 10px;
    margin-bottom: 10px;
}
.content-want-to-read{
    margin-top: 10px;
    margin-bottom: 5px;
}
.content-want-to-read > img{
    margin-right: 5px;
    height: 96px;
    width: 96px;
    object-fit: cover;
}
.update{
    width: 600px;

}
.recommend{
    width: 300px;
     
}

</style>