<template>
    <header>
        <div class="container">
            <div class="logo">
                <router-link to="/"> 
                    <h3>Book</h3>
                    <p>Social Network</p>
                </router-link>
            </div>
            <nav>
                <ul>
                    <li><router-link to="/shop">Trang chủ</router-link></li>
                    <li><a href="#">Sản phẩm</a></li>
                    <li><a href="#">Giới thiệu</a></li>
                    <li><a href="#">Liên hệ</a></li>
                </ul>
            </nav>
            <div class="search">
                <form class="form-search">
                    <input type="text" placeholder="Search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </form>
            </div>
            <div class="cart-icon">
                <i class="fa-solid fa-bell"></i>
                <router-link to="/shop/cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                </router-link>
                <i class="fa-solid fa-user"></i>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    // Component logic
}
</script>

<style scoped>
header {
    background-color: #f4f1ea;
    padding: 10px;
    position: fixed;
    width: 100%;
    top: 0;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.form-search{   
    display: flex;
    align-items: center;
    background-color: #ffffff;
}
.form-search > input {
    border: none;
    background-color: transparent;
    padding: 5px 3px;
    width: 200px;
    font-family: 'Times New Roman', Times, serif;
    outline: none;
}
.form-search > i {
    color: #65676b;
    margin-right: 5px;
}
nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

nav ul li {
    display: inline-block;
    margin-right: 20px;
}

nav ul li:last-child {
    margin-right: 0;
}

nav ul li a {
    text-decoration: none;
}

.cart-icon > a {
    width: 30px;
    height: 30px;
    cursor: pointer;
}
.cart-icon > i {
    margin-left: 20px;
    margin-right: 20px;
}
</style>
