<template>
    <div>
        <h3>Giỏ hàng ({{ totalProduct }} sản phẩm)</h3>
        <div class="row bg-white rounded-2 p-2 mb-2">
            <div class="col-7 d-flex">
                <input type="checkbox" v-model="selectedAll">
                <p class="m-0 ms-2">Chọn tất cả ({{ totalProduct }} sản phẩm)</p>
            </div>
            <div class="col-2">
                <p class="m-0">Số lượng</p>
            </div>
            <div class="col-3">
                <p class="m-0">Thành tiền</p>
            </div>
        </div>
        <div class="row bg-white rounded-2 p-2" v-for="(product, index) in cart" :key="index">
            <div class="col-7 d-flex">
                <input type="checkbox" v-model="product.selected">
                <img :src="product.product.HinhHH" alt="" class="w-25">
                <div class="d-flex flex-column justify-content-between">
                    <p class="m-0">{{ product.product.TenHH }}</p>
                    <strong class="m-0">{{ product.product.Gia }}đ</strong>
                </div>
            </div>
            <div class="col-2 d-flex align-items-center">
                <div class="d-flex">
                    <button class="btn btn-sm btn-light" @click="reduceQuantity(index)"><i
                            class="fa-solid fa-minus"></i></button>
                    <input class="quantity text-center mx-2" v-model="product.quantity" @input="updateQuantity(index)">
                    <button class="btn btn-sm btn-light" @click="increaseQuantity(index)"><i
                            class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <div class="col-3 d-flex align-items-center">
                <strong class="m-0 text-danger">{{ totalAmount(index) }}đ</strong>
                <button class="btn btn-danger btn-sm ms-5" @click="removeProduct(index)">Xóa</button>
            </div>
            <hr class="mt-2">
        </div>
        <div class="mt-3">
           
            <div class="row bg-white rounded-2 p-2 mb-2">
                    <div class="col-12">
                        <h4>Hình thức thanh toán và phí vận chuyển</h4>
                    </div>
                    <div class="col-4">
                        <label for="paymentMethod">Hình thức thanh toán:</label>
                        <select v-model="selectedPaymentMethod" id="paymentMethod">
                            <option value="cash">Thanh toán khi nhận hàng</option>
                            <option value="bankTransfer">Chuyển khoản ngân hàng</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <p for="shippingFee">Phí vận chuyển: <strong>{{ totalSelectedAmount===0? 0 :this.shippingFee }}đ</strong></p>
                    </div>
                    <div class="col-4">
                        <h4>Thông tin nhận hàng</h4>
                        <p>Họ Tên: <strong>{{ this.user.HoTenKH }}</strong></p>
                        <p>Địa Chỉ: <strong>{{ this.user.DiaChi }}</strong></p>
                        <p>Số điện thoại: <strong>{{ this.user.SoDienThoai }}</strong></p>
                    </div>
                </div>
            <p class="m-0">Tổng tiền các sản phẩm đã chọn: <strong>{{ totalSelectedAmount===0 ? totalSelectedAmount : totalSelectedAmount + this.shippingFee }}đ</strong></p>
            <button class="btn btn-primary mt-2" @click="placeOrder">Đặt hàng</button>
        </div>
        
    </div>
</template>

<script>
import OrderDetailService from "../services/orderDetail.service";
import CustomerService from "../services/customer.service";
import OrderService from "../services/order.service";
export default {
    data() {
        return {
            cart: [],
            totalProduct: 0,
            selectedAll: false,
            user: "",
            selectedPaymentMethod: "cash",
            shippingFee: 23000,
        };
    },
     computed: {
        totalSelectedAmount() {
            return this.cart.reduce((total, product) => {
                if (product.selected) {
                    const donGia = parseInt(product.product.Gia.replace(".", ""));
                    total += parseInt(product.quantity) * donGia;
                }
                return total;
            }, 0);
        },
    },

    methods: {
        async getUser(){
            const getEmail = localStorage.getItem('authState');
            if (getEmail){
            const result = getEmail ? JSON.parse(getEmail) : {};
            this.user =  await CustomerService.getByEmail(result.user);
            console.log(this.user);
            }
        },
        async placeOrder() {
            const selectedProducts = this.cart.filter((product) => product.selected);
            console.log(selectedProducts);

            if (selectedProducts.length === 0) {
                alert('Vui lòng chọn sản phẩm để đặt hàng.');
                return;
            };
            
            const orderNumber = Date.now().toString() + Math.floor(Math.random() * 1000);
            const date = new Date();
            const formattedDate = date.toLocaleDateString('en-GB')
            const orderData = {
                SoDonDH: orderNumber,
                HH: selectedProducts.map((product) => ({
                    MSHH: product.product.MSHH,
                    GiaDatHang: this.totalSelectedAmount,
                    SoLuong: product.quantity,
                }))
            };
            console.log(this.user.MSKH);
            const orderInfor = {
                SoDonDH: orderNumber,
                MSKH: this.user.MSKH,
                NgayDH: formattedDate,
                TrangThaiDH: 0
            };
            console.log(orderInfor.NgayDH);
            try {
                const response = await OrderDetailService.create(orderData);
                console.log(orderData.HH);
                    console.log(response);
                const response1 = await OrderService.create(orderInfor);
                this.removeSelectedProducts();
                alert('Đặt hàng thành công!');
            } catch (error) {
                console.error('Đặt hàng thất bại:', error.message);
            }
        },
        removeSelectedProducts() {
            this.cart = this.cart.filter((product) => !product.selected);
            this.handleTotalProduct();
            this.saveCartToLocalStorage();
        },
        loadCartFromLocalStorage() {
            const savedCart = localStorage.getItem('cart');
            this.cart = savedCart ? JSON.parse(savedCart) : [];
        },
        saveCartToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },

        handleTotalProduct() {
            this.totalProduct = this.cart.length;
        },

        increaseQuantity(index) {
            this.cart[index].quantity++;
        },

        reduceQuantity(index) {
            if (this.cart[index].quantity > 1) {
                this.cart[index].quantity--;
            }
        },

        totalAmount(index) {
            const product = this.cart[index];
            const donGia = product.product.Gia.replace(".","");
            return parseInt(product.quantity) * parseInt(donGia);
        },

        updateQuantity(index) {
             const newQuantity = parseInt(this.cart[index].quantity);

            if (isNaN(newQuantity) || newQuantity <= 0) {
                this.cart[index].quantity = 1;
                console.error('Số lượng không hợp lệ.');
                return;
            }
        },
        removeProduct(index) {
            if(confirm('Bạn có chắc chắn muốn xóa?')){
            this.cart.splice(index, 1);
            this.handleTotalProduct();
            this.saveCartToLocalStorage();}
        },
    },

    watch: {
        selectedAll(newVal) {
            this.cart.forEach((item) => {
                item.selected = newVal;
            });
        },
    },

    mounted() {
        this.loadCartFromLocalStorage();
        this.handleTotalProduct();
        this.getUser();
    },
};
</script>

<style scoped>
.quantity {
    width: 40px;
}
</style>
