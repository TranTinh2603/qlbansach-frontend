<template>
    <div class="page">
        <div class="read">
            <div class="currently-reading">
                <CurrentlyReading :currentlyReading="currentlyReading" />
            </div>
            <hr>
            <h5 style="margin-top: 20px;">WANT TO READ</h5>
            <div class="want-to-read">
                <div class="content-want-to-read">
                    <router-link v-for="(book, index) in wantToRead" :key="index" :to="'/book/detail/' +  book.bookId">
                        <img :src="book.image" alt="">
                    </router-link>
                </div>
            </div>
            <router-link to="/my-books">View all books</router-link>
            <hr>
        </div>
        <div class="update">
            <Posts />
        </div>
        <div class="recommend">
            <Recommend :recommendations="recommendations" :user="user" @handleStatus="handleStatus"/>
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
import AuthService from "../services/AuthService";
import RecommendService from "../services/recommend.service";
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
            recommendations: [],
            myBooks: []
        }
    },
    computed:{
        
    },
    methods: {
        async getUser() {
            try {
                AuthService.checkAuthentication();
                const email = AuthService.user.email;
                this.user = await UserService.getUserByEmail(email);
                this.getBookByStatus(this.user.userId);
                this.getRecommended(this.user.userId);
                this.getMyBookByUserId(this.user.userId);
            } catch (error) {
                console.error(error);
            }
        },
        async getMyBookByUserId(userId) {
            try {
                this.myBooks = await MyBookService.getByUserId(userId);
            } catch (error) {
                console.error("Lỗi khi kiểm tra sách được đề xuất:", error);
                throw error;
            }

        },
        checkRecommendedBook(bookId){
            const bookExists = !this.myBooks.some(book => book.bookId === bookId);
            return bookExists;
        },
        async getRecommended(userId){
            const recommendationsBookIds = await RecommendService.get(userId);          
            for (const recommendationsBookId of recommendationsBookIds) {
                if(this.checkRecommendedBook(recommendationsBookId)){
                    this.getBookByBookId(recommendationsBookId);
                } else {
                    continue
                }
            }
        },
        async getBookByBookId(bookId) {
            const book = await BookService.getByBookId(bookId);
            this.recommendations.push(book);
        },
        async getBookByStatus(userId){
            const data1 = {
                userId: userId,
                status: "Currently Reading",
            };
            const data2 = {
                userId: userId,
                status: "Want To Read",
            };
            const data3 = {
                userId: userId,
                status: "Read",
            };
            try {
                const currentlyReadingLocal = await MyBookService.getByStatus(data1);
                for (const book of currentlyReadingLocal) {
                    this.currentlyReading.push(await BookService.getByBookId(book.bookId));
                }
                const wantToReadLocal = await MyBookService.getByStatus(data2);
                for (const book of wantToReadLocal) {
                    this.wantToRead.push(await BookService.getByBookId(book.bookId));
                }

            } catch (error) {
                
            }
        },
        async handleStatus(data){
            try {
                const create = await MyBookService.create(data);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
           
        }
    },
    mounted(){
        this.getUser();
        
    },
};
</script>
<style scoped>
.page { 
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
}

.read{
    width: 300px;
    height: 90vh;
    overflow: auto;
}

.read::-webkit-scrollbar{
    width: 0;
}

.currently-reading{
    margin-bottom: 10px;
}

.want-to-read{
    margin-top: 10px;
    margin-bottom: 10px;
    height: 200px;
    overflow: auto;
}
.want-to-read::-webkit-scrollbar{
    width: 0;
}
.content-want-to-read{
    margin-top: 10px;
    margin-bottom: 5px;
}
.content-want-to-read  img{
    margin-right: 5px;
    height: 96px;
    width: 96px;
    object-fit: cover;
}
.want-to-read a:hover{
    text-decoration: underline;
}
.update{
    width: 600px;

}
.recommend{
    width: 300px;
     
}

</style>