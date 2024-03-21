<template>
    <div class="container-author-detail">
        <div class="image-follow-author-detail">
            <img class="image-author" :src="author.image" alt="">
            <div class="container-button-follow-author">
                <button class="button-follow-author">Follow Author</button>
            </div>
        </div>
        <div class="info-author">
            <InfoAuthor :key="author.authorId" :author="author" />
        </div>
    </div>
</template>
<script>
import InfoAuthor from "@/components/InfoAuthor.vue";
import AuthorService from "../services/author.service";
export default {
    components: {
        InfoAuthor,
    },

    props: {
        name: {type: String, default: ""}
    },
    data(){
        return {
            author: {},
        }
    },
    methods:{
        async getAuthor(){
            try {
                this.author = await AuthorService.getByName(this.name);
            } catch (error) {
                console.log(error);
            }
        }
    },

    created(){
        this.getAuthor();
    }
}
</script>
<style scoped>
    .container-author-detail{
        display: flex;
        justify-content: space-between;
        margin: 20px 100px;
    }
    .image-follow-author-detail{
        width: 300px;
    }
    .image-author{
        display: block;
        width: 200px;
        height: 270px;
        margin: 0 auto;
    }
    .container-button-follow-author{
        margin: 20px 0;
        display: flex;
        justify-content: center;
    }
    .button-follow-author{
        width: 140px;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        cursor: pointer;
        color: #333333;
        background-color: #F4F1EA;
        line-height: 1;
        padding: 8px 12px;
    }
    .info-author{
        width: 700px;
    }
    
</style>