<template>
    <div class="container">
        <div class="header">
            <h4>UPDATES</h4>
            <div class="customize">
                <i class="fa-solid fa-gear"></i>
                <p>Customize</p>
            </div>
        </div>
        <div class="posts">
            <div class="info-posts">
                <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1495635816i/32521178._UX96_CR0,22,96,96_.jpg" alt="">
                <div class="detail-info-posts">
                    <router-link class="user-posts" to="/a">Trần Tính</router-link>
                    <span> wants to read</span>
                    <p class="time-posts">23 phút</p>
                </div>
            </div>
            <div class="content-post">
                <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545314990i/10433999._SY180_.jpg" alt="">
                <div class="info-book">
                    <router-link to="/detail" class="name-book">Tôi thấy hoa vàng trên cỏ xanh</router-link>
                    <div class="author-book">
                        <span >by </span>
                        <router-link class="author-name" to="/test">Nguyễn Nhật Ánh</router-link>
                    </div>
                    <div class="status-book">
                        <div class="status-name">
                            <i class="fa-solid fa-check"></i>
                            <p>Want to Read</p>
                        </div>
                        <div class="status-change">
                            <i class="fa-solid fa-caret-down"></i>
                        </div>
                    </div>
                    <div class="description">
                        <p>
                        Một tác phẩm được nhiều người bình chọn là hay nhất của nhà văn này.
                        Một tác phẩm đang được dịch và giới thiệu tại Nhật Bản (theo thông tin từ các báo)… 
                        Bởi sự trong sáng của
                        </p>
                    </div>
                </div>
            </div>
            <div class="interact">
                <div class="interact-number">
                    <div class="number-like">
                        <i class="fa-solid fa-heart"></i>
                        <p>123</p>
                    </div>
                    <div class="number-comment">
                        <i class="fa-solid fa-comment"></i>
                        <p>12</p>
                    </div>
                </div>
                <div class="interact-way">
                    <div class="interact-way-like">
                        <i class="fa-regular fa-heart"></i>
                        <p>Thích</p>
                    </div>
                    <div class="interact-way-comment">
                        <i class="fa-regular fa-comment"></i>
                        <p>Bình luận</p>
                    </div>
                </div>
                <div class="comment">
                    <p>Xem thêm bình luận</p>
                    <div class="content-detail-comment">
                        <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545314990i/10433999._SY180_.jpg" alt="">
                        <div class="detail-comment">
                            <div class="info-user-comment">
                                <p class="name-user">Trần Tính</p>
                                <p>Tôi thấy hoa vàng trên cỏ xanh" truyện dài mới nhất của nhà văn vừa nhận giải văn chương ASEAN Nguyễn Nhật Ánh. Cuốn sách viết về tuổi thơ nghèo khó ở một làng quê, bên cạnh</p>
                            </div>
                            <div class="interact-comment">
                                <p>10 giờ</p>
                                <p>Thích</p>
                                <p>Phản hồi</p>
                                <div class="option-comment">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="write-comment">
                        <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1545314990i/10433999._SY180_.jpg" alt="">
                        <div class="content-write-comment">
                            <input type="text" placeholder="Viết bình luận">
                            <i class="fa-solid fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style scoped>
/* .container {

} */
.header{
    display: flex;
    justify-content: space-between;
}
.customize{
    display: flex;
    align-items: center;
}
.customize > p {
    margin-left: 3px;
}

.posts{
    background-color: #ffffff;
    margin-top: 10px;
    padding: 5px;
    border:1px solid #D8D8D8;
    border-radius:5px;
}

.info-posts{
    display: flex;
    align-items: center;
}

.info-posts > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.detail-info-posts{
    margin-left: 5px;
}

.user-posts{
    font-weight: 600;
}

.time-posts{
    font-size: 14px;
}

.content-post{
    display: flex;
    margin: 10px;
}

.content-post > img {
    width: 120px;
    height: 180px;
}

.info-book{
    margin-left: 10px;
    padding: 5px;
}

.name-book{
    font-weight: 600;
    font-size: 18px;
}

.name-book:hover{
    text-decoration: underline;
}

.author-book{
    font-size: 16px;
}
.author-name:hover{
    text-decoration: underline;
}

.status-book{
    margin-top: 10px;
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
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    padding-left: 5px;
}
.status-name > i {
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

.description{
    margin-top: 10px;
}
.description > p{
    max-height: 55px;
    overflow-y: hidden;
    text-overflow: ellipsis;
}
.interact{
    margin: 20px;
}

.interact-number {
    display: flex;
}
.number-like{
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-right: 20px;
}
.number-like > p{
    margin-left: 5px;
    user-select: none;
}
.number-comment{
    display: flex;
    cursor: pointer;
    align-items: center;
}

.number-comment > p{
    margin-left: 5px;
    user-select: none;
}
.interact-way{
    display: flex;
    margin: 10px 0;
    padding: 10px;
    border-top: 1px solid #989a9c;
    border-bottom: 1px solid #989a9c;
}

.interact-way-like{
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
}
.interact-way-like > p {
    margin-left: 5px;
    user-select: none;
}
.interact-way-comment{
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
}
.interact-way-comment > p {
    margin-left: 5px;
    user-select: none;
}
.content-detail-comment{
    margin-top: 20px;
    display: flex;
}
.content-detail-comment > img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
}

.detail-comment{
    margin-left: 10px;
    max-width: 75%;
}

.info-user-comment{
    padding: 10px;
    background-color: #f0f2f5;
    border-radius: 10px;
}

.name-user{
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    margin-bottom: 5px;
}

.interact-comment{
    display: flex;
    margin-top: 5px;
}
.interact-comment > p {
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    margin-right: 10px;
}
.option-comment{
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.option-comment > div{
    height: 4px;
    width: 4px;
    border-radius: 50%;
    background-color: #606770;
    margin-right: 2px;
}
.write-comment{
    display: flex;
    align-items: center;
    margin-top: 20px;
}

.write-comment > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.content-write-comment{
    margin-left: 10px;
    height: 30px;
    width: 75%;
    background-color: #f0f2f5;
    border-radius: 15px;
}

.content-write-comment > input {
    background-color: transparent;
    border: none;
    height: 100%;
    width: 90%;
    margin-left: 5px;
    outline: none;

}
</style>