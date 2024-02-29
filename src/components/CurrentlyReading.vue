<template>
    <div class="container">
        <h4>CURRENTLY READING</h4>
        <div class="content">
            <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545314990i/10433999._SY180_.jpg" alt="">
            <div class="info">
                <router-link class="name-info" to="/book/detail/1">
                    Tôi thấy hoa vàng trên cỏ xanh 
                </router-link>
                <div class="author-info">
                    <span >by </span>
                    <router-link class="author-name" to="/author/detail/1">Nguyễn Nhật Ánh</router-link>
                </div>
                <button class="update-progress">
                    Update progress
                </button>
            </div>
        </div>
        <div class="content">
            <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1691147319i/11273677._SY180_.jpg" alt="">
            <div class="info">
                <router-link class="name-info" to="/test">
                    Mắt biếc 
                </router-link>
                <div class="author-info">
                    <span >by </span>
                    <router-link class="author-name" to="/test">Nguyễn Nhật Ánh</router-link>
                </div>
                <button class="update-progress">
                    Update progress
                </button>
            </div>
        </div>
        <div class="content">
            <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1630546924i/23276781._SY180_.jpg" alt="">
            <div class="info">
                <router-link class="name-info" to="/test">
                    Cà Phê Cùng Tony
                </router-link>
                <div class="author-info">
                    <span >by </span>
                    <router-link class="author-name" to="/test">Tony Buổi Sáng</router-link>
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