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
            <router-link class="view-all" to="/my-books">View all books</router-link>
            <div v-if="showAddBook === false"></div>
            <p v-if="showAddBook === false" @click="handleShowAddBook()" class="add-book">Add a book</p>
        </div>
        <form v-if="showAddBook" class="form-add-book">
            <input type="text" placeholder="Search book" >
            <i class="fa-solid fa-magnifying-glass"></i>
            <i @click="handleShowAddBook()" class="fa-solid fa-xmark"></i>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        currentlyReading: { type: Array, default: [] },
    },
    data(){
        return {
            showAddBook: false
        }
    },
    methods: {
        handleShowAddBook(){
            this.showAddBook = !this.showAddBook;
        }
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
.form-add-book{
    margin-top: 10px;
    position: relative;
    width: 90%;
    display: flex;
    align-items: center;
    
}
.form-add-book > input{
    border: #DCD6CC 1px solid;
    border-radius: 3px;
    background: #FFFFFF;
    color: #333333;
    height: 30px;
    padding: 4px 26px 4px 8px;
    width: 100%;
    margin-right: 20px;
}
.form-add-book > input:focus{
    box-shadow: 0 0 4px rgba(185,173,153,0.5);
    border-color: #B9AD99;
    outline: 0px;
}
.form-add-book > i:nth-child(2) {
    position: absolute;
    right: 40px;
    cursor: pointer;
}
.form-add-book > i:nth-child(3){
    cursor: pointer;
}
</style>