<template>
    <div>
        <h3>Chi tiết đơn hàng</h3>
        <div class="row bg-white rounded-2 p-2 mb-2">
            <div class="col-7">
                <p class="m-0 ms-2">Sản phẩm</p>
            </div>
            <div class="col-2">
                <p class="m-0">Số lượng</p>
            </div>
            <div class="col-3">
                <p class="m-0">Thành tiền</p>
            </div>
        </div>
        <div class="row bg-white rounded-2 p-2" v-for="(product, index) in orderDetail.HH" :key="index">
            <div class="col-7 d-flex">
                <img src="https://cdn0.fahasa.com/media/catalog/product/8/9/8934974178637.jpg" alt="" class="w-25">
                <div class="d-flex flex-column justify-content-between">
                    <p class="m-0">{{ product.product && product.product.TenHH ? product.product.TenHH : '' }}</p>
                    <strong class="m-0">{{ product.product && product.product.Gia ? product.product.Gia : '' }}đ</strong>
                </div>
            </div>
            <div class="col-2 d-flex align-items-center">
                <p class="text-center"> {{ product.SoLuong }}</p>
            </div>
            <div class="col-3 d-flex align-items-center">
                <strong class="m-0 text-danger">{{ product.product && product.GiaDatHang ? product.GiaDatHang : 0 }}đ</strong>
            </div>
        </div>
    </div>
</template>

<script>
import OrderDetailService from "../services/orderDetail.service";
import ProductService from "../services/product.service";

export default {
    data() {
        return {
            orderDetail: {
                HH: [],
            },
        };
    },
    props: {
        msdh: { type: String, default: "" },
    },
    methods: {
        async getOrderDetail(id) {
            try {
                this.orderDetail = await OrderDetailService.get(id);
                console.log(this.orderDetail);
                for (let i = 0; i < this.orderDetail.HH.length; i++) {
                    console.log(this.orderDetail.HH[i].MSHH);
                    await this.getProduct(this.orderDetail.HH[i].MSHH, i);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async getProduct(id, index) {
            try {
                console.log(id);
                this.orderDetail.HH[index].product = await ProductService.getMSHH(id);
                console.log(this.orderDetail.HH[index].product);
            } catch (error) {
                console.log(error);
            }
        },
        reduceQuantity(index) {
            if (this.orderDetail.HH[index].product.SoLuong > 1) {
                this.orderDetail.HH[index].product.SoLuong--;
            }
        },
        increaseQuantity(index) {
            this.orderDetail.HH[index].product.SoLuong++;
        },
        removeProduct(index) {
        },
    },
    mounted() {
        this.getOrderDetail(this.msdh);
    },
};
</script>
