<template>
    <div class="container">
        <div class="header-content-container">
            <router-link :to="'/community/group/detail/' + groupId">{{ groupId }}</router-link>
            <i class="fa-solid fa-greater-than"></i>
            <p>Book</p>
        </div>
        <div class="body-content-container">
            <div class="container-content-1">
                <div class="message-content">
                    <span>Only moderators of this group can add books.</span>
                </div>
                <div class="search-book-content">
                    <form class="search-book-form">
                        <label for="search">Search for books</label>
                        <div>
                            <input type="text" class="search-input">
                            <input type="submit" class="search-submit" value="Search">
                        </div>
                    </form>
                </div>
                <div class="shelves-content">
                    <p>Group shelves</p>
                    <p>All(1)</p>
                    <p>Read(1)</p>
                    <p>Currently Reading(1)</p>
                    <p>Want To Read(1)</p>
                </div>
            </div>
            <div class="container-content-2">
                <table style="border-collapse: collapse; width: 100%;">
                    <tr style="border-bottom: 2px solid #ebe8d5; font-size: 14px; color: #382110;">
                        <th style="width: 60px;">Image</th>
                        <th style="width: 150px;">Name</th>
                        <th style="width: 90px;">Author</th>
                        <th style="width: 100px;">My Rating</th>
                        <th style="width: 60px;">Shelves</th>
                        <th style="width: 90px;">Added By</th>
                        <th style="width: 100px;">Date Added</th>
                    </tr>
                    <tr style="font-size: 14px; border-bottom: 1px solid #e8e8e8;">
                        <td><img style="height: 75px; width: 50px;" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691147319i/11273677.jpg" alt=""></td>
                        <td>
                            <router-link to="/">Mắt Biếc</router-link>
                        </td>
                        <td><router-link to="/">Nguyễn Nhật Ánh</router-link></td>
                        <td>
                            <div style="font-size: 12px; color: #d6d6d6;">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                        </td>
                        <td>Read</td>
                        <td>
                            <router-link to="/">Trần Tính</router-link>
                        </td>
                        <td>22/04/2024</td>
                        <td>
                            <router-link to="/">View</router-link>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        groupId: {type: String, default: ""}
    }
}
</script>
<style scoped>
    a{
        color: #00635d;
    }

    a:hover{
        text-decoration: underline;
    }
    td{
        vertical-align: top;
    }
    th{
        text-align: left;
    }
    .container{
        margin: 20px 100px;
    }
    .header-content-container{
        display: flex;
        align-items: center;
    }
    .header-content-container > a {
        font-size: 20px;
        font-weight: 600;
    }
    .header-content-container > i {
        margin: 0 5px;
        font-size: 12px;
    }
    .header-content-container > p {
        font-size: 20px;
        font-weight: 600;
    }
    .body-content-container{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }
    .container-content-1{
        width: 250px;
    }
    .message-content{
        font-size: 14px;
    }
    .search-book-content {
        margin-top: 20px;
    }
    .search-book-form{
        font-size: 14px;
    }
    .search-book-form > div {
        display: flex;
        margin-top: 2px;
    }
    .search-input{
        margin-right: 5px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        font-family: 'Times New Roman', Times, serif;
        padding: 2px 5px;
    }
    .search-input:focus{
        box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .search-submit{
        color: #333333;
        background-color: #F4F1EA;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        cursor: pointer;
        font-family: 'Times New Roman', Times, serif;
        font-size: 12px;
        padding: 2px 12px;
    }
    .search-submit:hover{
        color: #333333;
        background-color: #ede6d6;
        text-decoration: none;
    }
    .shelves-content{
        margin-top: 10px;
        font-size: 14px;
    }
    .shelves-content > p {
        cursor: pointer;
    }
    .shelves-content > p:first-child {
        font-weight: 600;
        margin-bottom: 5px;
    }
    .shelves-content > p:not(:first-child){
        color: #00635d;
    }
    .shelves-content > p:not(:first-child):hover{
        text-decoration: underline;
    }

    .container-content-2{
        width: 800px;
    }
    th {
        padding: 5px;
    }
    td {
        padding: 5px;
    }

</style>