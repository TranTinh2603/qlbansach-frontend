<template>
    <div class="container-info-author">
        <h3>{{ author.name }}</h3>
        <hr>
        <div class="life-and-career">
            <div class="born-category">
                <div class="born">
                    <p class="title-born-category">Born</p>
                    <p>{{ author.country }}</p>
                </div>
                <div class="birth-date">
                    <p  class="title-born-category">Birth date</p>
                    <p>{{ author.birthDate }}</p>
                </div>
                <div class="category">
                    <p  class="title-born-category">Category</p>
                    <p>Children's, Young Adult, Fiction</p>
                </div>
                <div class="description-born-category">
                    <span>{{ author.summary }}</span>
                </div>
            </div>
            <hr>
            <div class="content-life-and-career">
                <h4>Cuộc đời và sự nghiệp</h4>
                <span>{{ author.biography }}</span>
            </div>
        </div>
        <hr>    
        <div class="author-books">
            <h3>Author's Books</h3>
            <table style="width: 100%;border-collapse: collapse; margin-top: 10px;">
                <tbody valign="top">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="width: 60px;">
                            <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1691147319i/11273677._SY75_.jpghttps://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1691147319i/11273677._SY75_.jpg" alt="">
                        </td>
                        <td>
                            <div>
                                <h4>Mắt biếc</h4>
                                <div style="font-size: 14px;">
                                    <span>by </span>
                                    <router-link to="/a">Nguyễn Nhật Ánh</router-link>
                                </div>
                                <div style="display: flex; font-size: 14px;">
                                    <div style="margin-right: 5px;">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </div>
                                    <div>
                                        <span>4.0</span>
                                        <span> avg rating - </span>
                                        <span>2</span>
                                        <span> rating</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td valign="middle" style="width: 200px;">
                            <div class="button-change-status">
                                <div class="status-name">
                                    <i class="fa-solid fa-check"></i>
                                    <p>Want to Read</p>
                                </div>
                                <div class="status-change">
                                    <i class="fa-solid fa-sort-down"></i>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                            <td style="width: 60px;">
                                <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1545314990i/10433999.jpg" alt="">
                            </td>
                            <td>
                                <div>
                                    <h4>Tôi thấy hoa vàng trên cỏ xanh</h4>
                                    <div style="font-size: 14px;">
                                        <span>by </span>
                                        <router-link to="/a">Nguyễn Nhật Ánh</router-link>
                                    </div>
                                    <div style="display: flex; font-size: 14px;">
                                        <div style="margin-right: 5px;">
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                        <div>
                                            <span>4.0</span>
                                            <span> avg rating - </span>
                                            <span>3</span>
                                            <span> rating</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td valign="middle">
                                <div class="button-change-status">
                                    <i class="fa-solid fa-check"></i>
                                    <div class="status-name">
                                        <p>Want to Read</p>
                                    </div>
                                    <div class="status-change">
                                        <i class="fa-solid fa-sort-down"></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
                </tbody>
            </table>
            <div class="more-book-by-author">
                <router-link to="/a">More books by <span>Nguyễn Nhật Ánh</span></router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        author: {type: Object, required: true},
    },
    methods: {
        getAuthor(){
            const a = this.author;
            console.log('test',this.author);
        }
    },
    updated(){
        console.log(this.author)
    },
    mounted(){
        console.log(this.author);
        this.getAuthor();
    }
}
</script>
<style scoped>
    .container-info-author > h3 {
        margin-bottom: 5px;
    }
    .life-and-career{
        margin-top: 5px;
        margin-bottom: 10px;
    }
    .born-category{
        margin-bottom: 10px;
    }

    .born, .birth-date, .category{
        font-size: 14px;
    }
    .born{
        display: flex;
    }
    .birth-date{
        display: flex;
    }
    .category{
        display: flex;
    }
    .title-born-category {
        width: 120px;
        font-weight: 600;
    }
    .description-born-category{
        margin-top: 10px;
        line-height: 20px;
    }
    .content-life-and-career{
        line-height: 20px;
    }
    .content-life-and-career > h4 {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .button-change-status{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #F2F2F2;
        width: 150px;
        height: 30px;
    }
    .status-name{
        display: flex;
        align-items: center;
        padding-left: 5px;
    }
    .status-name > i{
        margin-right: 5px;
    }
    .status-change{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        width: 30px;
        background-color: #409D69;
        color: #ffffff;
        border-bottom-right-radius: 3px;
        border-top-right-radius: 3px;
    }
     .status-change > i{
        margin-bottom: 6px;
     }
     .more-book-by-author{
        margin-top: 10px;
        margin-bottom: 10px;
        float: right;
     }
</style>