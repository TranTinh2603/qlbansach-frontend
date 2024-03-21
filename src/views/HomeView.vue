<template>
    <div class="page">
        <div class="read">
            <div class="currently-reading">
                <CurrentlyReading :currentlyReading="currentlyReading" :wantToRead="wantToRead" />
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
import UserService from "../services/user.service";
import MyBookService from "../services/myBook.service";
import BookService from "../services/book.service";
export default {
    components: {
        CurrentlyReading,
        Posts,
        Recommend,
    },
    data() {
        return {
            user:{},
            currentlyReading: [],
            wantToRead: [],
            read: [],
            isLoading: false,
        }
    },
    computed:{
        
    },
    methods: {
        async getUser() {
            try {
                this.user = await UserService.get("U001");
            } catch (error) {
                console.error(error);
            }
        },
        async getBookByStatus(){
            const data1 = {
                userId: "U001",
                status: "Currently Reading",
            };
            const data2 = {
                userId: "U001",
                status: "Want To Read",
            };
            const data3 = {
                userId: "U001",
                status: "Read",
            };
            try {
                const currentlyReadingLocal = await MyBookService.getByStatus(data1);
                for (const book of currentlyReadingLocal) {
                    this.currentlyReading.push(await BookService.getByBookId(book.bookId));
                }
                this.wantToRead = await MyBookService.getByStatus(data2);
            } catch (error) {
                
            }
        }
    },
    created(){
        this.getUser();
        this.getBookByStatus();
    },
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