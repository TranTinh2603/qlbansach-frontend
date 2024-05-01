<template>
    <header>
        <div class="container">
            <div class="logo">
                <!-- Đặt logo của bạn ở đây -->
                <router-link to="/"> 
                    <h3>Book</h3>
                    <p>Social Network</p>
                </router-link>
            </div>
            <nav>
                <ul>
                    <li><a href="#">Trang chủ</a></li>
                    <li><a href="#">Sản phẩm</a></li>
                    <li><a href="#">Giới thiệu</a></li>
                    <li><a href="#">Liên hệ</a></li>
                </ul>
            </nav>
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
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo img {
    max-width: 100px;
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
