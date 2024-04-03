    <template>
        <div class="info-detail">
            <h1 class="book-name">{{ book.name }}</h1>
            <router-link to="/" class="author-name">{{ book.author }}</router-link>
            <div class="star-rate-book">
                <i v-for="starIndex in 5" :key="starIndex" :class="starClass(starIndex, reviews)" style="color: #e87400"></i>
                <h3>{{ avgRating(reviews) }}</h3>
                <div class="ratings-number">
                    <p>{{ reviews.length }} ratings</p>
                    <div></div>
                    <p>{{ countReview(reviews) }} reviews</p>
                </div>
            </div>
            <div class="description">
            <span>
                {{ book.description }}
            </span>
            </div>
            <hr>
            <div class="information">
                <h3>Information</h3>
                <div class="information-detail">
                    <div class="title-information">
                        <p>Category</p>
                        <p>Format</p>
                        <p>Published</p>
                        <p>Language</p>
                    </div>
                    <div class="value-information">
                        <p>{{ book.category }}</p>
                        <p>{{ book.page + ' Pages' }}</p>
                        <p>{{ book.published }}</p>
                        <p>{{ book.language }}</p>
                    </div>
                </div>
            </div>
            <hr>
            <div class="about-the-author">
                <h3>About the author</h3>
                <div class="info-about-the-author">
                    <img :src="author.image" alt="">
                    <div class="name-author">
                        <p>{{ author.name}}</p>
                        <div class="book-and-follower">
                            <p>{{ author.books && author.books.length ? author.books.length :'' }} books</p>
                            <div></div>
                            <p>123 followers</p>
                        </div>
                    </div>
                    <button class="button-follow">Follow</button>
                </div>
                <div class="introduce-author">
                    <span>{{ author.biography }}</span>
                </div>
            </div>
            <hr>
            <div class="similar-books">
                <h3>Similar books</h3>
                <div class="list-recommend-books">
                    <div v-for="(similarBook, index) in paginatedSimilarBooks" :key="index" class="recommend-book">
                        <img :src="similarBook.image" alt="">
                        <div class="recommend-book-info">
                            <h4>{{ similarBook.name }}</h4>
                            <p>{{ similarBook.author }}</p>
                            <div class="recommend-book-info-rate">
                                <i class="fa-solid fa-star"></i>
                                <p>4.42</p>
                                <div></div>
                                <p>4321</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pagination">
                    <i v-if="currentPage !== 1" @click="prevPage" class="fa-solid fa-angle-left"></i>
                    <i v-if="currentPage !== totalPages" @click="nextPage" class="fa-solid fa-angle-right"></i>
                </div>
                <div class="all-similar-books">
                    <p>All similar books</p>
                </div>
            </div>
            <hr>
            <div class="ratings-and-reviews">
                <h2>Ratings & Reviews</h2>
                <div class="my-review">
                    <h3>My review</h3>
                    <div class="content-my-review">
                        <div class="info-my-review">
                            <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691147319i/11273677.jpg" alt="">
                            <p>Trần Tính</p>
                            <p>1 reviews</p>
                        </div>
                        <div class="rate-my-review">
                            <div class="star-rate-my-review">
                                <i v-for="start in getMyReview(reviews, user.userId) ? getMyReview(reviews, user.userId).rating : 0" class="fa-solid fa-star"></i>
                                <i v-for="emtyStart in 5 - (getMyReview(reviews, user.userId) ? getMyReview(reviews, user.userId).rating : 0)" class="fa-regular fa-star"></i>
                            </div>
                            <div class="button-write-a-review">
                                <button>Write a Review</button>
                            </div>
                        </div>
                        <div class="time-my-review">
                            <p>24/02/2024</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="community-reviews">
                <h3>Community Reviews</h3>
                <div class="star-rate-community-reviews">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <h3>4.27</h3>
                    <div class="ratings-number-community-reviews">
                        <p>1234 ratings</p>
                        <div></div>
                        <p>123 reviews</p>
                    </div>
                </div>
                <div class="detail-star-rate-community-reviews">
                    <div class="five-star">
                        <p>5 stars</p>
                        <div class="chart-rate-container">
                            <div class="chart-rate-container-value">
                                <div class="chart-rate-value"></div>
                            </div>
                        </div>
                        <p>39%</p>
                    </div>
                    <div class="five-star">
                            <p>5 stars</p>
                            <div class="chart-rate-container">
                                <div class="chart-rate-container-value">
                                    <div class="chart-rate-value"></div>
                                </div>
                            </div>
                            <p>39%</p>
                        </div>
                    <div class="five-star">
                        <p>5 stars</p>
                        <div class="chart-rate-container">
                            <div class="chart-rate-container-value">
                                <div class="chart-rate-value"></div>
                            </div>
                        </div>
                        <p>39%</p>
                    </div>
                    <div class="five-star">
                        <p>5 stars</p>
                        <div class="chart-rate-container">
                            <div class="chart-rate-container-value">
                                <div class="chart-rate-value"></div>
                            </div>
                        </div>
                        <p>39%</p>
                    </div>
                    <div class="five-star">
                        <p>5 stars</p>
                        <div class="chart-rate-container">
                            <div class="chart-rate-container-value">
                                <div class="chart-rate-value"></div>
                            </div>
                        </div>
                        <p>39%</p>
                    </div>
                </div>
                <div class="detail-community-reviews">
                    <div class="info-user-community-reviews">
                        <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630482892i/11378463.jpg" alt="">
                        <h4>Trần Tính</h4>
                        <div>
                            <p>123 reviews</p>
                            <p>741 followers</p>
                        </div>
                        <button>Follow</button>
                    </div>
                    <div class="content-user-community-reviews">
                        <div class="content-user-rate-and-time">
                            <div class="content-user-rate">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div class="content-user-time">
                                <span>25/02/2024</span>
                            </div>
                        </div>
                        <div class="content-user-comment">
                            <span>Tác phẩm miêu tả cuộc phiêu lưu của một chú Dế Mèn qua thế giới loài vật và loài người. Những vấn đề nóng hổi như là: cái thiện và cái ác, chiến tranh và hòa bình, lí tưởng và lẽ sống được thể hiện một cách nhẹ nhàng, tinh tế mà sâu sắc.
                                Cậy mình là chàng dế cường tráng, Mèn dương dương tự đắc, cho mình là tay ghê gớm. Trải qua hai bài học đắt giá là cái chết của của dế Choắt và bị bác Xiến Tóc cắt đứt mất hai sợi râu mượt óng mà Mèn mới tỉnh ngộ, hiểu ra thế nào là lòng nhân ái và cái giá phải trả cho sự ngông nghênh của mình. 
                                Từ đó Mèn quyết chí đi chu du thiên hạ, chí hướng của Mèn càng được củng cố sau khi chú làm được việc có ích đầu tiên trong đời đó là cứu giúp chị Nhà Trò yếu đuối thoát nạn lũ nhện hung ác. Không những thế chú còn được sự ủng hộ hết lòng của mẹ kính yêu và kết giao được với người bạn tri kỉ là Dế Trũi.
                            </span>
                        </div>
                        <div class="content-user-like-comment">
                            <p>32 like</p>
                            <div class="like-and-comment">
                                <div>
                                    <i class="fa-regular fa-heart"></i>
                                    <p>Like</p>
                                </div>
                                <div>
                                    <i class="fa-regular fa-comment"></i>
                                    <p>Comment</p>
                                </div>
                            </div>
                        </div>
                        <hr>
                    </div>
                </div>
                <div class="detail-community-reviews">
                        <div class="info-user-community-reviews">
                            <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630482892i/11378463.jpg" alt="">
                            <h4>Trần Tính</h4>
                            <div>
                                <p>123 reviews</p>
                                <p>741 followers</p>
                            </div>
                            <button>Follow</button>
                        </div>
                        <div class="content-user-community-reviews">
                            <div class="content-user-rate-and-time">
                                <div class="content-user-rate">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <div class="content-user-time">
                                    <span>25/02/2024</span>
                                </div>
                            </div>
                            <div class="content-user-comment">
                                <span>
                                    Tác phẩm miêu tả cuộc phiêu lưu của một chú Dế Mèn qua thế giới loài vật và loài người. Những vấn đề nóng hổi như là: cái thiện và cái ác, chiến tranh và hòa bình, lí tưởng và lẽ sống được thể hiện một cách nhẹ nhàng, tinh tế mà sâu sắc.
                                    Cậy mình là chàng dế cường tráng, Mèn dương dương tự đắc, cho mình là tay ghê gớm. Trải qua hai bài học đắt giá là cái chết của của dế Choắt và bị bác Xiến Tóc cắt đứt mất hai sợi râu mượt óng mà Mèn mới tỉnh ngộ, hiểu ra thế nào là lòng nhân ái và cái giá phải trả cho sự ngông nghênh của mình. 
                                    Từ đó Mèn quyết chí đi chu du thiên hạ, chí hướng của Mèn càng được củng cố sau khi chú làm được việc có ích đầu tiên trong đời đó là cứu giúp chị Nhà Trò yếu đuối thoát nạn lũ nhện hung ác. Không những thế chú còn được sự ủng hộ hết lòng của mẹ kính yêu và kết giao được với người bạn tri kỉ là Dế Trũi.
                                </span>
                            </div>
                            <div class="content-user-like-comment">
                                <p>32 like</p>
                                <div class="like-and-comment">
                                    <div>
                                        <i class="fa-regular fa-heart"></i>
                                        <p>Like</p>
                                    </div>
                                    <div>
                                        <i class="fa-regular fa-comment"></i>
                                        <p>Comment</p>
                                    </div>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
            </div>
        </div>
    </template>
    <script>
    import BookService from '../services/book.service';
    import AuthService from '../services/AuthService';
    import AuthorService from '../services/author.service';
    import UserService from '../services/user.service';
    import ReviewService from '../services/review.service';
    import SimilarService from '../services/similar.service'
    export default {
        props: {
            id: {type: String, default: ""},
        },
        data() {
            return {
                book: {},
                author: {},
                user: {},

                reviews: [],
                similarBooks: [],
                currentPage: 1,
                itemsPerPage: 4
                
            }
        },
        computed: {
             paginatedSimilarBooks() {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                return this.similarBooks.slice(startIndex, endIndex);
            },
            totalPages() {
                return Math.ceil(this.similarBooks.length / this.itemsPerPage);
            }
        },
        methods: {
            async getUser() {
                AuthService.checkAuthentication();
                const email = AuthService.user.Email;
                this.user = await UserService.getUserByEmail(email);
            },
            async getSimilarsBookId() {
                const similars = await SimilarService.get(this.id);
                this.getSimilarsBook(similars.similars)
            },
            async getSimilarsBook(similars){
                for (const similar of similars){
                    const similarBook = await BookService.getByBookId(similar)
                    this.similarBooks.push(similarBook)
                }   
            },
            async getBook(){
                this.book = await BookService.getByBookId(this.id);
                this.getAuthorByName(this.book.author);
            },
            async getAuthorByName(name){
                this.author = await AuthorService.getByName(name);
            },
            async getReviewByBookId(){
                this.reviews = await ReviewService.getByBookId(this.id);
                console.log(this.reviews);
            },
            getMyReview(reviews, userId) {
                const myReview = reviews.find(review => review.userId === userId)
                return myReview
            },
            countReview(reviews){
                let count = 0;
                for (const review of reviews) {
                    if (review.review !== ''){
                        count++;
                    }
                }
                return count;
            },
            avgRating(reviews){
                let avgRating = 0.0;
                let sum = 0;
                let count = 0;

                for (const review of reviews) {
                    sum += review.rating;
                    count++;
                }

                if (count !== 0) {
                    avgRating = sum / count;
                    avgRating = Math.round(avgRating * 100) / 100;
                }
                return avgRating;
            },
            starClass(starIndex, reviews) {
                const rating = this.avgRating(reviews);
                if (rating >= starIndex) {
                    return 'fa-solid fa-star';
                } else if (rating > starIndex - 1 && rating < starIndex) {
                    return 'fa-solid fa-star-half-alt';
                } else {
                    return 'fa-regular fa-star';
                }
            },

            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                }
            },
            prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
            }

        },
        mounted(){
            this.getBook();
            this.getUser();
            this.getReviewByBookId();
            this.getSimilarsBookId()
        }
    }
</script>

<style scoped>
    .book-name {
        margin-bottom: 10px;
    }
    .author-name{
        font-size: 20px;
    }
    .author-name:hover{ 
        text-decoration: underline;
    }
    .star-rate-book{
        display: flex;
        align-items: center;
        margin-top: 20px;
        font-size: 20px;
    }
    .star-rate-book > i {
        margin-right: 10px;
    }
    .ratings-number{
        margin-left: 10px;
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    .ratings-number > div {
        margin-left: 5px;
        margin-right: 5px;
        height: 2px;
        width: 2px;
        border-radius: 50%;
        background-color: black;
    }
    .description{
        margin-top: 20px;
        line-height: 25px;
        margin-bottom: 10px;
    }
    .information{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .information-detail{
        margin-top: 20px;
        display: flex;
    }

    .title-information{
        margin-right: 40px;
        font-weight: 600;
    }
    .about-the-author{
        margin-top: 10px;
    }
    .info-about-the-author{
        margin-top: 20px;
        display: flex;
        align-items: center;
    }
    .info-about-the-author > img{
        height: 70px;
        width: 70px;
        border-radius: 50%;
        object-fit: cover;
    }
    .name-author{
        margin-left: 10px;
    }
    .name-author > p{
        font-weight: 600;
    }
    .book-and-follower{
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #707070;
        margin-top: 5px;
    }

    .book-and-follower > div {
        height: 2px;
        width: 2px;
        border-radius: 50%;
        background-color: #707070;
        margin-left: 5px;
        margin-right: 5px;
    }
    .button-follow{
        border: none;
        background-color: black;
        color: #ffffff;
        height: 40px;
        width: 80px;
        border-radius: 20px;
        margin-left: 20px;
        cursor: pointer;
    }
    .introduce-author{
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .similar-books{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .list-recommend-books{
        display: flex;
        margin-top: 10px;
    }
    .recommend-book{
        padding-right: 20px;
        max-width: 25%;
    }
    .recommend-book  >img {
        width: 100%;
        height: 250px;
    }
    .recommend-book-info > h4 {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .recommend-book-info > p{
        font-size: 14px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .recommend-book-info-rate{
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    .recommend-book-info-rate > i {
        margin-right: 5px;
        color: yellow;
    }
    .recommend-book-info-rate > p:nth-child(2){
        font-weight: 600;
    }
    .recommend-book-info-rate > div {
        margin-left: 5px;
        margin-right: 5px;
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background-color: #707070;
    }
    .recommend-book-info-rate > p:nth-child(4){
        color: #707070;
    }
    .pagination {
    margin-top: 20px;
}

.pagination-btn {
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.pagination-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

    .all-similar-books{
        margin-top: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .all-similar-books > p:hover{
        text-decoration: underline;
    }
    .all-similar-books > i {
        margin-left: 10px;
    }

    .ratings-and-reviews{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .my-review{
        margin-top: 20px;
    }

    .content-my-review{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .info-my-review > img{
        height: 56px;
        width: 56px;
        border-radius: 50%;
    }
    .info-my-review > p:nth-child(2){
        font-weight: 600;
        margin-bottom: 5px;
    }

    .star-rate-my-review{
        margin-bottom: 10px;
        font-size: 18px;
        cursor: pointer;
    }
    .star-rate-my-review  > i{
        margin-right: 5px;
    }
    .button-write-a-review > button{
        cursor: pointer;
        height: 48px;
        padding: 0 32px;
        font-size: 18px;
        background-color: black;
        color: #ffffff;
        border: none;
        border-radius: 24px;
    }
     .button-write-a-review > button:hover{
        opacity: 0.7;
     }
    .community-reviews{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .star-rate-community-reviews{
        display: flex;
        margin-top: 20px;
        align-items: center;
    }
    .star-rate-community-reviews > i {
        font-size: 20px;
        margin-right: 5px;
    }

    .star-rate-community-reviews > h3 {
        margin-left: 5px;
        margin-right: 5px;
        font-size: 24px;
    }

    .ratings-number-community-reviews{
        display: flex;
        align-items: center;
        margin-left: 5px;
        font-size: 16px;
        color: #707070;
    }

    .ratings-number-community-reviews > div {
        width: 2px;
        height: 2px;
        background-color: #707070;
        margin-left: 5px;
        margin-right: 5px;
    }
    .detail-star-rate-community-reviews{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .five-star{
        display: flex;
        align-items: center;
    }
    .five-star > p{
        font-weight: 600;
    }
    .chart-rate-container{
        padding: 20px;
        margin: 0 5px;
        width: 500px;
        border-radius: 26px;
    }
    .chart-rate-container:hover{
        background-color: #cfccc9;
    }
    .chart-rate-container-value{
        background-color: #ebebeb;
    }
    .chart-rate-container-value, .chart-rate-value{
        height: 12px;
        border-radius: 6px;
    }
    .chart-rate-value{
        height: 12px;
        width: 39%;
        background-color: #e87400;
    }
    .detail-community-reviews{
        display: flex;
        margin-top: 20px;
    }

    .info-user-community-reviews > img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }
    .info-user-community-reviews > h4 {
        margin-top: 5px;
    }
    .info-user-community-reviews > div {
        margin-top: 10px;
        margin-bottom: 10px;
        color: #707070;
    }
    .info-user-community-reviews > button {
        height: 36px;
        padding: 0 30px;
        border-radius: 18px;
        background-color: black;
        color: #ffffff;
        cursor: pointer;
        border: none;
    }
    .content-user-community-reviews{
        margin-left: 20px;
    }
    .content-user-rate-and-time {
        display: flex;
        justify-content: space-between;
    }
    .content-user-rate{
        color: #e87400;
        margin-bottom: 20px;
    }
    .content-user-rate > i {
        margin-right: 5px;
    }
    .content-user-comment{
        line-height: 25px;
        margin-bottom: 20px;
    }
     .content-user-like-comment{
        margin-bottom: 20px;
     }
    .content-user-like-comment > p {
        font-weight: 600;
    }
    .like-and-comment{
        display: flex;
        margin-top: 10px;
    }
    .like-and-comment > div{
        display: flex;
        margin-right: 10px;
    }
    .like-and-comment > div > i{
        margin-right: 5px;
    }
</style>