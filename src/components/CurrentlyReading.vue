<template>
    <div class="container">
        <h4>CURRENTLY READING</h4>
        <div class="content" v-for="book in currentlyReading" :key="book.bookId">
            <img :src="book.image" :alt="book.name">
            <div class="info">
                <router-link class="name-info" :to="{name: 'book.detail', params: {id: book.bookId}}">
                    {{ book.name }}
                </router-link>
                <div class="author-info">
                    <span>by </span>
                    <router-link class="author-name" :to="{name: 'author.detail', params: {name: book.author}}">{{ book.author }}</router-link>
                </div>
                <button class="update-progress">
                    Update progress
                </button>
            </div>
        </div>
        <div class="navigation">
            <router-link class="view-all" to="/a">View all books</router-link>
            <div></div>
            <p class="add-book">Add a book</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        currentlyReading: { type: Array, default: [] },
        wantToRead: { type: Array, default:[]}
    },
    data(){
        return {test: this.wantToRead}
    },
    methods: {
    //    test(){
    //     const test = this.wantToRead;
    //     console.log("teets",test);
    //    }
    },
    mounted(){
    }
}
</script>

<style scoped>

.content{
    margin-top: 10px;
    display: flex;
}

.content > img{
    cursor: pointer;
    width: 95px;
    height: 145px;
}

.info{
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

.update-progress{
    margin-top: 5px;
    border-radius: 3px;
    background-color: transparent;
    border: 1px solid #382110;
    color: #382110;
    font-size: 11px;
    padding: 4px 12px;
}
.update-progress:hover{
    background-color: #382110;
    color: #ffffff;
}

.navigation{
    display: flex;
    align-items: center;
    margin-top: 10px;
}
.view-all:hover{
    text-decoration: underline ;
}

.navigation > div{
    margin: 0 5px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: black;
}

.add-book{
    cursor: pointer;
}
.add-book:hover{
    text-decoration: underline;
}
</style>