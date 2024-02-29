<template>
    <div class="container-my-books">
        <h2>My Books</h2>
        <hr>
        <div class="container-bookshelves-and-table-books">
            <div class="bookshelves">
                <h4>Bookshelves</h4>
                <div class="bookshelves-status-book">
                    <p>All <span>(7)</span></p>
                    <p>Read <span>(7)</span></p>
                    <p>Currently Reading <span>(7)</span></p>
                    <p>Want to Read <span>(7)</span></p>
                </div>
                <hr>
                <div class="bookshelves-add-book">
                    <p>Sách-Việt-Nam <span>(7)</span></p>
                    <button>Add shelf</button>
                </div>
                <hr>
            </div>
            <div class="table-books">
                <table>
                    <tr style="border-bottom: 1px solid;">
                        <th style="width: 60px;">Image</th>
                        <th  style="width: 90px;">Title</th>
                        <th  style="width: 60px;">Author</th>
                        <th  style="width: 30px;">Avg Rating</th>
                        <th  style="width: 90px;">Rating</th>
                        <th  style="width: 60px;">Shelves</th>
                        <th>Review</th>
                        <th  style="width: 30px;"></th>
                    </tr>
                    <tr style="border-bottom: 1px solid;">
                        <td><img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1630482892l/11378463._SY75_.jpg" alt=""></td>
                        <td><p>Dế Mèn Phiêu Lưu Kí</p></td>
                        <td>Tô Hoài</td>
                        <td>4.27</td>
                        <td>
                            <div style="font-size: 12px;">
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </td>
                        <td><span>want-to-read</span></td>
                        <td>
                            <div>Write a review</div>
                        </td>
                        <td><i class="fa-solid fa-xmark"></i></td>
                    </tr>
                    <tr style="border-bottom: 1px solid;">
                            <td><img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1630482892l/11378463._SY75_.jpg" alt=""></td>
                            <td><p>Dế Mèn Phiêu Lưu Kí</p></td>
                            <td>Tô Hoài</td>
                            <td>4.27</td>
                            <td>
                                <div style="font-size: 12px;">
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                            </td>
                            <td><span>want-to-read</span></td>
                            <td>
                                <div>Write a review</div>
                            </td>
                            <td><i class="fa-solid fa-xmark"></i></td>
                        </tr> 
                </table>
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style scoped>
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
    .container-my-books > h2 {
        margin: 10px 0;
    }
    .container-bookshelves-and-table-books{
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
    }
    .bookshelves{
        width: 200px;
        height: 1000px;
        background-color: aqua;
    }
    .bookshelves-status-book{
        margin: 10px 0;
    }
    .bookshelves-add-book{
        margin: 10px 0;
    }
    .bookshelves-add-book > button{
        font-size: 11px;
        margin-top: 10px;
        background-color: #F4F1EA;
        padding: 4px 12px;
        border-radius: 3px;
        border: 1px solid #D6D0C4;
    }
    .table-books{
        width: 850px;
        height: 1000px;
        background-color: aquamarine;
    }
</style>