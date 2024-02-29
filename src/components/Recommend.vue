<template>  
    <div class="container">
        <h4>RECOMMENDATIONS</h4>
        <div class="content-recommend">
            <div class="book-recommend">
                <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1630482892i/11378463._SY180_.jpg" alt="">
                <div class="info-book-recommend">
                    <router-link class="name-info" to="/detail/1">
                        Dế mèn phiêu lưu ký 
                        (Diary of a Cricket)
                    </router-link>
                    <div class="author-info">
                        <span >by </span>
                        <router-link class="author-name" to="/test">Tô Hoài</router-link>
                    </div>
                    <div class="want-to-read">
                        Want to Read
                    </div>
                </div>
            </div>
            <div class="description">
                <p>Tác phẩm miêu tả cuộc phiêu lưu của một chú Dế Mèn qua thế giới loài vật và loài người.
                Những vấn đề nóng hổi như là: cái thiện và cái ác, chiến tranh và hòa bình, lí tưởng và lẽ 
                sống được thể hiện một cách nhẹ nhàng, tinh tế mà sâu sắc.</p>
            </div>
        </div>
        <div class="content-recommend">
            <div class="book-recommend">
                <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1630313960i/50908574._SY180_.jpg" alt="">
                <div class="info-book-recommend">
                    <router-link class="name-info" to="/detail/1">
                        Thiên Tài Bên Trái, Kẻ Điên Bên Phải
                    </router-link>
                    <div class="author-info">
                        <span >by </span>
                        <router-link class="author-name" to="/test">Cao Minh</router-link>
                    </div>
                    <div class="want-to-read">
                        Want to Read
                    </div>
                </div>
            </div>
            <div class="description">
                <p>NẾU MỘT NGÀY ANH THẤY TÔI ĐIÊN, THỰC RA CHÍNH LÀ ANH ĐIÊN ĐẤY! Hỡi những con người đang oằn mình trong cuộc sống, bạn biết gì về thế giới của mình?</p>
            </div>
        </div>
        <div class="all-book-recommend">
            <router-link to="/test">View all book recommend</router-link>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>
.content-recommend{
    margin-top: 20px;
}
.book-recommend{
    display: flex;
}
.book-recommend > img {
    max-width: 95px;
    max-height: 140px;
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