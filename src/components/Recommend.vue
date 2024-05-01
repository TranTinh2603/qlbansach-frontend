<template>
    <div class="container">
        <h4>RECOMMENDATIONS</h4>
        <div class="container-content-recommend">
            <div>
                <div v-for="(recommendation, index) in paginatedRecommendations" :key="index" class="content-recommend">
                    <div class="book-recommend">
                        <img :src="recommendation.image" alt="">
                        <div class="info-book-recommend">
                            <router-link class="name-info" :to="'/book/detail/' + recommendation.bookId">
                                {{ recommendation.name }}
                            </router-link>
                            <div class="author-info">
                                <span>by </span>
                                <router-link class="author-name" :to="'/author/detail/' + recommendation.author">{{ recommendation.author
                                }}</router-link>
                            </div>
                            <div @click="handleStatus(user.userId, recommendation.bookId)" class="want-to-read">
                                Want to Read
                            </div>
                        </div>
                    </div>
                    <div class="description">
                        <p>
                            {{ recommendation.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <i style="float: right; cursor: pointer;" class="fa-solid fa-chevron-right" @click="nextPage"></i>
        <div class="all-book-recommend">
            <router-link to="/all-recommendations">View all book recommendations</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: {type: Object, default: {}},
        recommendations: { type: Array, default: [] }
    },
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 2
        };
    },
    computed: {
        paginatedRecommendations() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.recommendations.slice(startIndex, endIndex);
        }
    },
    emits:['handleStatus'],
    methods: {
        nextPage() {
            const totalPages = Math.ceil(this.recommendations.length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
            }
        },
        handleStatus(userId, bookId){
            const date = new Date();
            const timestamp = date.getTime();
            const data = {
                userId: userId,
                bookId: bookId,
                status: "Want To Read",
                bookshelves: "",
                createdAt: timestamp
            }
            this.$emit('handleStatus', data);
        }
    },
    mounted() {
        
    }
}
</script>

<style scoped>
.container-content-recommend{
    display: flex;
}
.content-recommend{
    margin-top: 20px;
}
.book-recommend{
    display: flex;
    margin-bottom: 10px;
}
.book-recommend > img {
    width: 95px;
    height: 140px;
}

.info-book-recommend{
    margin-left: 5px;
}

.name-info{
    font-weight: 600;
}
.name-info:hover{
    text-decoration: underline;
}

.author-info{
    font-size: 14px;
}
.author-name:hover{
    text-decoration: underline;
}
.want-to-read{
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 100px;
    border-radius: 3px;
    background-color: #409D69;
    color: #ffffff;
    cursor: pointer;
}

.description{
    margin-top: 10px;
}
.all-book-recommend{
    margin-top: 10px;
}
.all-book-recommend:hover{
    text-decoration: underline;
}
</style>