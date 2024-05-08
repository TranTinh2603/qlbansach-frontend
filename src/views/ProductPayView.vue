<template>
    <div class="container">
        <h2>Đặt hàng</h2>
        <form @submit.prevent="handleSubmit()" class="form-container">
            <div class="info-customer">
                <div class="delivery-address-content">
                    <div class="header-delivery-address-content">
                        <h4>Địa chỉ nhận hàng</h4>
                    </div>
                    <div class="body-delivery-address-content">
                        <div class="field-delivery-address">
                            <label for="name">Họ tên người nhận</label>
                            <input type="text" id="name" v-model="name">
                        </div>
                        <div class="field-delivery-address">
                            <label for="email">Email</label>
                            <input type="text" id="email" v-model="user.email">
                        </div>
                        <div class="field-delivery-address">
                            <label for="phone">Số điện thoại</label>
                            <input type="text" id="phone" v-model="user.phone">
                        </div>
                        <div class="field-delivery-address">
                            <label for="address">Địa chỉ nhận hàng</label>
                            <input type="text" id="address" v-model="user.address">
                        </div>
                    </div>
                </div>
                <div class="other-info-content">
                    <div class="header-other-info-content">
                        <h4>Thông tin khác</h4>
                    </div>
                    <div class="body-other-info-content">
                        <div class="field-other-info">
                            <label for="note">Ghi chú</label>
                            <textarea id="note" rows="5" v-model="note"></textarea>
                        </div>
                    </div>
                </div>
                <div class="check-order-content">
                    <div class="header-check-other-content">
                        <h4>Kiểm tra lại đơn hàng</h4>
                    </div>
                    <div class="body-check-other-content">
                        <div class="header-product-list">
                            <p>Sản phẩm</p>
                            <p>Đơn giá</p>
                            <p>Số lượng</p>
                            <p>Thành tiền</p>
                        </div>
                        <div class="product-list">
                            <div v-for="(product, index) in products" :key="index" class="product-item">
                                <div>
                                    <img :src="product.product.image" alt="">
                                    <p>{{ product.product.name }}</p>
                                </div>
                                <p>{{ product.product.price }}</p>
                                <p>{{ product.quantity }}</p>
                                <p>{{ totalUnitPrice(product.product.price, product.quantity)  }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="methods">
                <div class="method-delivery-content">
                    <div class="header-method-delivery-content">
                        <h4>Phương thức vận chuyển</h4>
                    </div>
                    <div class="body-method-delivery-content">
                        <div class="field-method-delivery">
                            <input type="radio" name="method-delivery" id="fast-delivery" value="fast" v-model="methodDelivery">
                            <label for="fast-delivery" >Giao hàng nhanh</label>
                        </div>
                        <div class="field-method-delivery">
                            <input type="radio" name="method-delivery" id="standard-delivery" value="standard" v-model="methodDelivery">
                            <label for="standard-delivery">Giao hàng tiêu chuẩn</label>
                        </div>
                    </div>
                </div>
                <div class="method-payment-content">
                    <div class="header-method-payment-content">
                        <h4>Phương thức thanh toán</h4>
                    </div>
                    <div class="body-method-payment-content">
                        <div class="field-method-payment">
                            <input type="radio" name="method-payment" id="vnpay" value="vnpay" v-model="methodPayment">
                            <label for="vnpay">
                                <img src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_vnpay.svg?q=105636" alt="">
                                VNPAY
                            </label>
                        </div>
                        <div class="field-method-payment">
                            <input type="radio" name="method-payment" id="cod" value="cod" v-model="methodPayment">
                            <label for="cod"><img src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_cashondelivery.svg?q=105636" alt="">Thanh toán khi nhận hàng</label>
                        </div>
                    </div>
                </div>
                <div class="promotional-code-content">
                    <div class="header-promotional-code-content">
                        <h4>Mã khuyến mãi</h4>
                    </div>
                    <div class="body-promotional-code-content">
                        <div class="field-promotional-code">
                            <input type="text" id="promotional-code" v-model="promotionalCode">
                            <button>Áp dụng</button>
                        </div>
                    </div>
                </div>
                <div class="confirm-pay-content">
                    <div class="billing-information">
                        <div>
                            <p>Thành tiền</p>
                            <p>{{ totalPrice }}đ</p>
                        </div>
                        <div>
                            <p>Phí vận chuyển</p>
                            <p>{{ handleMethodDelivery }}đ</p>
                        </div>
                        <div>
                            <p>Tổng số tiền</p>
                            <p style="color: #F39801;">{{ total(totalPrice, handleMethodDelivery) }}đ</p>
                        </div>
                    </div>
                    <button type="submit">Xác nhận thanh toán</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import AuthService from "../services/AuthService"
import UserService from "../services/user.service"
import OrderService from "../services/order.service"
export default {
    data() {
        return {
           user: {},
           products:[],
           name: "",
           note: "",
           methodDelivery: "",
           methodPayment: "",
           totalAmount: 0,
           promotionalCode: "",
           transportFee: "",
        };
    },
    computed: {
        totalPrice() {
            return this.products.reduce((total, item) => total +  item.product.price * item.quantity , 0).toFixed(3);
        },
        handleMethodDelivery() {
            if (this.methodDelivery === 'fast') {
                this.transportFee = '36.000'
                return this.transportFee
            } else if (this.methodDelivery === 'standard') {
                this.transportFee = '23.000'
                return this.transportFee
            } else {
                return '0'
            }
        }
    },
    methods: {
        async getUser(){
            AuthService.checkAuthentication();
            const email = AuthService.user.email;
            this.user = await UserService.getUserByEmail(email)
            this.getName(this.user)
        },
        getName(user){
            this.name = user.firstName + ' ' + user.lastName;
        },
        loadOrderFromLocalStorage() {
            const savedOrder = localStorage.getItem('order');
            this.products = savedOrder ? JSON.parse(savedOrder) : [];
        },
        totalUnitPrice(price, quantity) {
            return (quantity * price).toFixed(3);
        },
        total(totalPrice, transportFee) {
            console.log(totalPrice, transportFee);
            this.totalAmount = parseInt(transportFee) + parseInt(totalPrice)
            return this.totalAmount.toFixed(3)
            // return (transportFee +  totalPrice).toFixed(3);
        },
        generateRandomString(length) {
            const date = new Date()
            const timestamp = date.getTime()
            let result = '';
            const characters = '0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result + timestamp;
        },

        async handleSubmit() {
            const products = []
            for (const product of this.products) {
                const data = {
                    product: product.product,
                    quantity: product.quantity
                }
                products.push(data)
            }
            const date = new Date()
            const timestamp = date.getTime()
            const data = {
                orderId: this.generateRandomString(5),
                userId: this.user.userId,
                orderDate: timestamp,
                status: 0,
                deliveryDate: "",
                infoDelivery: {
                    name: this.name,
                    phone: this.user.phone,
                    email: this.user.email,
                    address: this.user.address
                },
                methodDelivery: this.methodDelivery,
                methodPayment: this.methodPayment,
                note: this.note,
                products: products,
                promotionalCode: this.promotionalCode,
                totalPrice: this.totalPrice,
                transportFee: this.transportFee,
                totalAmount: this.totalAmount.toFixed(3)
                
            }
            const createOrder = await OrderService.create(data)
            if (createOrder) {
                localStorage.removeItem('order');
                localStorage.removeItem('cart')
                alert("Order successfully!")
                this.$router.push({name: 'shop.cart'})

            }
        }
    },
    mounted(){
        this.loadOrderFromLocalStorage()
        this.getUser()
    }

}
</script>
<style scoped>
    .container{
        margin: 20px 100px;
    }
    .form-container{
        display: grid;
        grid-template-columns: 750px auto;
        gap: 20px;
    }
    .delivery-address-content{
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        padding: 10px;
        border-radius: 5px;
    }
    .header-delivery-address-content{
        padding: 10px;
        border-bottom: 1px solid #ced4da;
        text-transform: uppercase;
    }
    .body-delivery-address-content{
        margin-top: 10px;
    }
    .field-delivery-address{
        margin-bottom: 10px;
        display: grid;
        grid-template-columns: 150px auto;
        align-items: center;
    }
    .field-delivery-address > input {
        border: 1px solid #ced4da;
        width: 300px;
        border-radius: 3px;
        padding: 5px 10px;
        outline: none;
        font-family: 'Times New Roman', Times, serif;
        font-weight: bold;
    }
    .field-delivery-address > input:focus{
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, .25);
    }
    .method-delivery-content{
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        padding: 10px;
        border-radius: 5px;
    }
    .header-method-delivery-content{
        padding: 10px;
        border-bottom: 1px solid #ced4da;
        text-transform: uppercase;
    }
    .body-method-delivery-content{
        margin-top: 10px;
    }
    .field-method-delivery{
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .other-info-content{
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        padding: 10px;
        border-radius: 5px;
    }
    .header-other-info-content {
        padding: 10px;
        border-bottom: 1px solid #ced4da;
        text-transform: uppercase;
    }
    .body-other-info-content{
        margin-top: 10px;
    }
    .field-other-info{
        margin-bottom: 10px;
        display: grid;
        grid-template-columns: 150px auto;
        align-items: center;
    }
    .field-other-info > textarea{
        border: 1px solid #ced4da;
        width: 300px;
        border-radius: 3px;
        padding: 5px 10px;
        outline: none;
        font-family: 'Times New Roman', Times, serif;
    }
    .field-other-info> textarea:focus{
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, .25);
    }
    .check-order-content{
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        padding: 10px;
        border-radius: 5px;
    }
    .header-check-other-content{
        padding: 10px;
        border-bottom: 1px solid #ced4da;
        text-transform: uppercase;
    }
    .body-check-other-content{
        margin-top: 10px;
    }
    .header-product-list{
        display: grid;
        grid-template-columns: 400px 125px 100px auto;
        align-items: center;
        font-weight: bold
    }
    .product-list{
        margin-top: 20px;
    }
    .product-item{
        display: grid;
        grid-template-columns: 400px 125px 100px auto;
        margin-bottom: 10px;
    }
    .product-item > div {
        display: flex;
    }
    .product-item > div > img {
        height: 145px;
        width: 100px;
        margin-right: 10px;
    }
    .method-payment-content{
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        padding: 10px;
        border-radius: 5px;
    }
    .header-method-payment-content{
        padding: 10px;
        border-bottom: 1px solid #ced4da;
        text-transform: uppercase;
    }
    .body-method-payment-content{
        margin-top: 10px;
    }
    .field-method-payment{
        display: flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 5px;
    }
    .field-method-payment > label {
        display: grid;
        align-items: center;
        grid-template-columns: 40px auto;
        gap: 5px;
    }
    .promotional-code-content{
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        padding: 10px;
        border-radius: 5px;
    }
    .header-promotional-code-content{
        padding: 10px;
        text-transform: uppercase;
        border-bottom: 1px solid #ced4da;
    }
    .body-promotional-code-content{
        margin-top: 10px;
    }
    .field-promotional-code{
        display: flex;
    }
    .field-promotional-code > input {
        border: 1px solid #ced4da;
        border-radius: 3px;
        padding: 5px 10px;
        outline: none;
        font-family: 'Times New Roman', Times, serif;
    }
    .field-promotional-code > input:focus{
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, .25);
    }
    .field-promotional-code > button{
        margin-left: 10px;
        border: none;
        cursor: pointer;
        padding: 5px 10px;
        background-color: #2F80ED;
        border-radius: 3px;
        color: #ffffff;
    }
    .confirm-pay-content{
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        padding: 10px;
        border-radius: 5px;
    }
    .billing-information > div {
        display: grid;
        grid-template-columns: 150px auto;
        margin-bottom: 5px;
    }
    .billing-information > div:last-child{
        font-weight: bold;
    }
    .confirm-pay-content > button {
        margin-top: 5px;
        width: 100%;
        border: none;
        background: #C92127;
        color: white;
        font-weight: bold;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
    }

</style>