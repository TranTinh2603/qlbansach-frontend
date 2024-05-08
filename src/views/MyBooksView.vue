<template>
    <div class="container-my-books">
        <h2>My Books</h2>
        <div class="container-bookshelves-and-table-books">
            <div class="bookshelves">
                <h4>Bookshelves</h4>
                <div class="bookshelves-status-book">
                    <p @click="filterType = 'All'; selectedShelf ='' ">All <span>({{ countStatusBook('all').length }})</span></p>
                    <p @click="filterType = 'Read'; selectedShelf = ''"> Read <span>({{ countStatusBook('Read').length }})</span></p>
                    <p @click="filterType = 'Currently Reading'; selectedShelf = ''"> Currently Reading <span>({{ countStatusBook('Currently Reading').length }})</span></p>
                    <p @click="filterType = 'Want To Read'; selectedShelf = ''">Want to Read <span>({{ countStatusBook('Want To Read').length }})</span></p>
                </div>
                <div class="bookshelves-add-book">
                    <p v-for="(shelf, index) in shelfs" @click="selectedShelf = shelf.name" :key="index">{{ shelf.name }} <span>({{ countBookshelves(shelf.name).length }})</span></p>
                    <button v-if="addShelf === false" @click="showAddShelf()">Add shelf</button>
                    <div v-else class="add-shelves">
                        <h4>Add a shelf</h4>
                        <form @submit.prevent="handleAddShelf()" class="form-add-shelves">
                            <input class="input-add-shelves" type="text" v-model="shelfName">
                            <input class="submit-add-shelves" type="submit" value="Add">
                            <i @click="showAddShelf()" class="fa-solid fa-xmark"></i>
                        </form>
                    </div>
                </div>
               
            </div>
            <div class="table-books">
                <table>
                    <tr style="border-bottom: 2px solid #ebe8d5; font-size: 14px;">
                        <th style="width: 60px;">Image</th>
                        <th style="width: 100px;">Title</th>
                        <th style="width: 70px;">Author</th>
                        <th style="width: 30px;">Avg Rating</th>
                        <th style="width: 90px;">My Rating</th>
                        <th style="width: 100px;">Shelves</th>
                        <th> My Review</th>
                        <th  style="width: 30px;"></th>
                    </tr>
                    <tr v-for="(book, index) in  paginatedBooks" :key="index" style="border-bottom: 1px solid #eee; font-size: 14px; color: #00635d; vertical-align: top;" >
                            <td><img @click="goToDetailBook(book.bookId)" style="height: 100px; width: 60px; cursor: pointer;" :src="book.image" alt=""></td>
                            <td><p @click="goToDetailBook(book.bookId)">{{ book.name }}</p></td>
                            <td><p @click="goToDetailAuthor(book.author)">{{ book.author }}</p></td>
                            <td>{{ avgRating(book.bookId) }}</td>
                            <td>
                                <div v-if="getReviewByUserIdAndBookId(user.userId, book.bookId)" style="font-size: 12px;">
                                    <i v-for="star in getReviewByUserIdAndBookId(user.userId, book.bookId).rating" class="fa-solid fa-star" style="color: gold;"></i>
                                    <i v-for="emptyStar in 5 - getReviewByUserIdAndBookId(user.userId, book.bookId).rating" class="fa-regular fa-star"></i>
                                </div>
                                <div v-else style="font-size: 12px;">
                                    <i v-for="star in 5" 
                                        :key="star" 
                                        :class="['fa', 'fa-star', { 'fa-solid': star <= book.currentRating, 'fa-regular': star > book.currentRating }]"
                                        @mouseover=" hoverRating(book,star)"
                                        @mouseleave="resetRating(book)"
                                        @click="setRating(star,user.userId, book)"
                                    ></i>
                                </div>
                            </td>
                            <td><p>{{ getMyBookByBookId(book.bookId).status }}{{ getMyBookByBookId(book.bookId) && getMyBookByBookId(book.bookId).bookshelves ? ', '+getMyBookByBookId(book.bookId).bookshelves: '' }}</p>
                                <div class="edit-icon">
                                    <p @click="toggleDropdownMenu(book)">[Edit]</p>
                                    <div v-if="book.showDropdownMenu" class="dropdown-menu">
                                        <p @click="handleChangeStatusBook(user.userId, book.bookId,'Read')"><i v-if="getMyBookByBookId(book.bookId).status === 'Read'" class="fa-solid fa-check"></i> Read</p>
                                        <p  @click="handleChangeStatusBook(user.userId, book.bookId, 'Currently Reading')"><i v-if="getMyBookByBookId(book.bookId).status === 'Currently Reading'" class="fa-solid fa-check"></i> Currently Reading</p>
                                        <p  @click="handleChangeStatusBook(user.userId, book.bookId, 'Want To Read')"><i v-if="getMyBookByBookId(book.bookId).status === 'Want To Read'" class="fa-solid fa-check"></i> Want To Read</p>
                                        <h4>Shelf</h4>
                                        <p v-for="(shelf, index) in shelfs " :key="index" @click="handleChangeBookshelves(user.userId, book.bookId, shelf.name)"><i v-if="getMyBookByBookId(book.bookId).bookshelves === shelf.name" class="fa-solid fa-check"></i> {{ shelf.name }}</p>
                                    </div>
                                </div>
                                
                            </td>
                            <td>
                                <div v-if="book.showEditReview === ''">
                                    <p>{{ getReviewByUserIdAndBookId(user.userId, book.bookId) ? getReviewByUserIdAndBookId(user.userId, book.bookId).review : '' }}</p>
                                    <p @click="handleShowEditReview(book)" style="font-size: 12px; margin-top: 5px; cursor: pointer;">[Edit]</p>
                                </div>
                                <form class="form-edit-review" v-if="book.showEditReview === book.bookId">
                                    <textarea cols="30" rows="4" v-model="book.review"></textarea>  
                                    <div>
                                        <input @click="handleEditReview(user.userId, book)" type="submit" value="Post">
                                        <p style="margin-left: 10px; cursor: pointer; font-size: 12px;" @click="handleShowEditReview(book)">Cancel</p>
                                    </div>
                                </form>
                                
                            </td>
                            <td><i style="cursor: pointer;" @click="deleteMyBook(user.userId, book.bookId)" class="fa-solid fa-xmark"></i></td>
                        </tr>
                </table>
                <div class="pagination">
                    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                    <span>{{ currentPage }} of {{ totalPages }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AuthService from "../services/AuthService";
import UserService from "../services/user.service";
import MyBookService from "../services/myBook.service";
import BookService from "../services/book.service";
import ReviewService from "../services/review.service";
import BookshelvesService from "../services/bookshelves.service";
export default {
    data() {
        return{
            user: {},
            myBook: [],
            Book: [],
            reviews: [],
            filterType: 'All',
            rating: 0,
            currentPage: 1,
            itemsPerPage: 5,
            addShelf: false,
            shelfName: '',
            shelfs:[],
            selectedShelf: '',
            selectedStatus: '',
            contentReview: '',
            
        } 
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredBooks().length / this.itemsPerPage);
        },
        paginatedBooks() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredBooks().slice(startIndex, endIndex);
        },
    },
    methods: {
        async getUser(){
            try {
                AuthService.checkAuthentication();
                const email = AuthService.user.email;
                this.user = await UserService.getUserByEmail(email);
                this.getMyBook(this.user.userId)
                this.getBookshelvesByUserId(this.user.userId);
            } catch (error) {
                console.log(error);
            }
        },
        async getMyBook(userId) {
            try {
                this.myBook = await MyBookService.getByUserId(userId);
                for (const book of this.myBook) {
                    await this.getBook(book.bookId);
                    await this.getReview(book.bookId);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getBook(id) {
            try {
                const book = await BookService.getByBookId(id);
                book["currentRating"] = 0;
                book["showDropdownMenu"]= false
                book["showEditReview"] = ''
                book["review"] = ''
                this.Book.push(book);
            } catch (error) {
                console.error(error);
            }
        },
        async getReview(id) {
            try {
                const reviews = await ReviewService.getByBookId(id);
                this.reviews.push(...reviews);
            } catch (error) {
                console.error(error);
            }
        },
        async getBookshelvesByUserId(userId){
            try {
                this.shelfs = await BookshelvesService.getByUserId(userId);
            } catch (error) {
                
            }
        },
        getReviewByUserIdAndBookId(userId, bookId) {
            return this.reviews.find(review => (review.bookId === bookId && review.userId === userId));
        },
        getMyBookByBookId(id) {
            return this.myBook.find(book => book.bookId === id);
        },
        avgRating(id) {
            const relevantReviews = this.reviews.filter(review => review.bookId === id);
            if (relevantReviews.length === 0) return 0;
            const totalRating = relevantReviews.reduce((acc, curr) => acc + curr.rating, 0);
            return totalRating / relevantReviews.length;
        },
        countStatusBook(status){
            if (status === 'all') {
                return this.myBook;
            } else {
                return this.myBook.filter(book => book.status === status)
            }
        },
        countBookshelves(bookshelvesName) {
            return this.myBook.filter(book => book.bookshelves === bookshelvesName)
        },
        filteredBooks() {
            if(this.selectedShelf === ''){
                if (this.filterType === 'All') {
                    return this.Book;
                } else if (this.filterType === 'Want To Read') {
                    const booksWantToRead = this.myBook.filter(book => book.status === 'Want To Read');
                    return this.Book.filter(book => booksWantToRead.some(item => item.bookId === book.bookId));
                } else if (this.filterType === 'Currently Reading') {
                    const booksCurrentlyReading = this.myBook.filter(book => book.status === 'Currently Reading');
                    return this.Book.filter(book => booksCurrentlyReading.some(item => item.bookId === book.bookId));
                } else if (this.filterType === 'Read') {
                    const booksRead = this.myBook.filter(book => book.status === 'Read');
                    return this.Book.filter(book => booksRead.some(item => item.bookId === book.bookId));
                } 
            } else {
                const bookshelves = this.myBook.filter(book => book.bookshelves === this.selectedShelf);
                return this.Book.filter(book => bookshelves.some(item => item.bookId === book.bookId));
            }
        },
        hoverRating(book,star) {
            book.currentRating = star;
        },
        resetRating(book) {
            book.currentRating = this.rating; 
        },
        async setRating(rating, userId, book) {
           try {
                book.currentRating = rating;
                const date = new Date()
                const timestamp = date.getTime();
                const randomString = Math.random().toString(36).substring(5);
                const result = randomString + '_' + timestamp;
                const data = {
                    bookId: book.bookId,
                    userId: userId,
                    rating: book.currentRating,
                    review: "",
                    createdAt: timestamp,
                    reviewId: result,
                    likes: [],
                    comments: []
                }
                const message = await ReviewService.create(data);
                alert(message.message);
                location.reload();
           } catch (error) {
            
           }
        },
         prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        showAddShelf(){
            this.addShelf = !this.addShelf;
        },
        async handleAddShelf(){
            try {
                const currentTime = new Date().getTime().toString();
                const randomString = Math.random().toString(36).substring(2, 8);
                const randomId = currentTime + randomString;
                const timestamp = new Date().getTime();
                const data = {
                    userId: this.user.userId,
                    name: this.shelfName,
                    bookshelvesId: randomId,
                    createdAt: timestamp
                }
                const addShelf = await BookshelvesService.create(data);
                if (addShelf) {
                    alert("AddShelf successfully!")
                    window.location.reload();
                } else {
                    alert("AddShelf failed!")
                }
            } catch (error) {
                console.log(error);
            }
        },
        goToDetailBook(bookId){
            this.$router.push({name: "book.detail", params:{id: bookId}})
        },
        goToDetailAuthor(author){
            this.$router.push({ name: "author.detail", params: { name: author } })
        },
        toggleDropdownMenu(book) {
            book.showDropdownMenu = !book.showDropdownMenu;
        },
        async handleChangeStatusBook(userId, bookId, status){
            try {
                const date = new Date()
                const timestamp = date.getTime()
                const myBook = this.getMyBookByBookId(bookId)
                const data = {
                    userId: userId,
                    bookId: bookId,
                    bookshelves: myBook.bookshelves,
                    status: status,
                    createdAt: timestamp
                }
                const update = await MyBookService.update(userId, bookId, data)
                alert(update.message);
                window.location.reload();
                console.log('data:', update);
            } catch (error) {
                console.log(error);
            }
        },
        async handleChangeBookshelves(userId, bookId, bookshelves) {
            try {
                const date = new Date()
                const timestamp = date.getTime()
                const myBook = this.getMyBookByBookId(bookId)
                const data = {
                    userId: userId,
                    bookId: bookId,
                    bookshelves: bookshelves,
                    status: myBook.status,
                    createdAt: timestamp
                }
                const update = await MyBookService.update(userId, bookId, data)
                alert(update.message);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        },
        async handleEditReview(userId, book){
            try {
                const date = new Date()
                const timestamp = date.getTime()
                const randomString = Math.random().toString(36).substring(5);
                const result = randomString + '_' + timestamp;
                const review = this.reviews.find(review => review.userId == userId && review.bookId == book.bookId)
                if (review) {
                    const data = {
                        reviewId: review.reviewId,
                        bookId: book.bookId,
                        userId: userId,
                        rating: review.rating,
                        review: book.review,
                        createdAt: timestamp,
                        likes: review.likes,
                        comments: review.comments
                    }
                    const updateReview = await ReviewService.updateReview(review.reviewId, data);
                    console.log(updateReview);
                    if (updateReview) {
                        alert("Review updated successfully!")
                        window.location.reload();
                    } else {
                        alert("Review not updated successfully!")
                    }
                } else {
                    alert('Please rating the book!')
                    book.showEditReview = '';
                }
            } catch (error) {
                console.log(error);
            }
        },
        handleShowEditReview(book){
            book.showEditReview = book.showEditReview === book.bookId ? '' : book.bookId
        },
        async deleteMyBook(userId, bookId){
            const confirmDelete = confirm("Do you want delete book ?"); 
            const book = this.myBook.find(book => book.userId === userId && book.bookId === bookId);
            if (confirmDelete) {
                const deleteMyBook = await MyBookService.delete(book._id)
                window.location.reload();
            }
        }
    },
    mounted() {
        this.getUser();
    }

}
</script>
<style scoped>
.dropdown-menu {
    font-size: 14px;
    position: absolute;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 8px 0;
    width: 150px;
    z-index: 2; /* Adjust width as needed */
}

.dropdown-menu p {
    color: #333333;
    padding: 8px 16px;
    cursor: pointer;
}

.dropdown-menu p:hover {
    background-color: #f2f2f2;
}

.edit-icon {
    position: relative;
    font-size: 12px;
    display: block;
    margin-top: 5px;
    cursor: pointer;
}
.edit-icon > p:hover{
    text-decoration: underline;
}
.pagination {
    float: right;
  margin-top: 20px;
  font-size: 14px;
}

.pagination button {
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
    font-size: 11px;
    background-color: #F4F1EA;
    border-radius: 3px;
    border: 1px solid #D6D0C4;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
    .fa-star.fa-solid {
    color: gold;
    }
        table {
        border-collapse: collapse;
        width: 100%;
    }
    th, td {
        padding: 10px;
    }
    th {
        text-align: left;
    }
    .container-my-books{
        margin: 0 100px;
    }
    td > p:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    .container-my-books > h2 {
        padding: 10px 0;
        border-bottom: 1px solid #ebe8d5;
    }
    .container-bookshelves-and-table-books{
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
    }
    .bookshelves{
        width: 200px;
        height: 1000px;
    }
    .bookshelves-status-book{
        padding: 10px 0;
        border-bottom: 1px solid #ebe8d5;
    }
    .bookshelves-add-book p, .bookshelves-status-book p {
        cursor: pointer;
        color: #00635d;
        font-size: 14px;
    } 
    .bookshelves-add-book p:hover, .bookshelves-status-book p:hover {
        text-decoration: underline;
    } 
    .bookshelves-add-book{
        padding: 10px 0;
        border-bottom: 1px solid #ebe8d5;
    }
    .bookshelves-add-book > button{
        cursor: pointer;
        font-size: 11px;
        margin-top: 10px;
        background-color: #F4F1EA;
        padding: 4px 12px;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
    }
    .bookshelves-add-book > button:hover{
        color: #333333;
        background-color: #ede6d6;
        text-decoration: none;
    }
    .add-shelves{
        margin-top: 10px;
    }
    .input-add-shelves{
        width: 120px;
        margin-right: 5px;
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        padding: 5px;
        height: 20px;
    }
    .form-add-shelves{
        margin-top: 5px;
        display: flex;
        align-items: center;
    }
    .input-add-shelves:focus{
        box-shadow: 0 0 4px rgba(185,173,153,0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .submit-add-shelves{
        margin-right: 15px;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        text-decoration: none;
        color: #333333;
        background-color: #F4F1EA;
        font-size: 11px;
        padding: 3px 12px;
        cursor: pointer;
    }
    .submit-add-shelves:hover{
        color: #333333;
        background-color: #ede6d6;
        text-decoration: none;
    }
    .form-add-shelves > i {
        cursor: pointer;
    }
    .table-books{
        width: 850px;
        height: 1000px;
    }
    .form-edit-review > textarea{
        background: #FFFFFF;
        border-radius: 3px;
        border: #DCD6CC 1px solid;
        color: #333333;
        padding: 5px;
        font-size: 14px;
        font-family: 'Times New Roman', Times, serif;
    }
    .form-edit-review > textarea:focus{
        box-shadow: 0 0 4px rgba(185, 173, 153, 0.5);
        border-color: #B9AD99;
        outline: 0px;
    }
    .form-edit-review > div {
        align-items: center;
        display: flex;
    }
    .form-edit-review > div > input{
        border-radius: 3px;
        border: 1px solid #D6D0C4;
        text-decoration: none;
        color: #333333;
        background-color: #F4F1EA;
        font-size: 12px;
        padding: 3px 12px;
        font-family: 'Times New Roman', Times, serif;
        cursor: pointer;
    }


    .form-edit-review > div > input:hover{
        color: #333333;
        background-color: #ede6d6;
    }

</style>