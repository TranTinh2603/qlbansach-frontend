<template>
    <div>
        <h3>Thông tin đơn hàng</h3>
        <table class="table">
            <thead class="text-center">
                <tr>
                    <th scope="col">Mã đơn hàng</th>
                    <th scope="col">Thời gian đặt</th>
                    <th scope="col">Thời gian nhận</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody class="table-group-divider text-center">
                <tr v-for="order in orders" :key="order.SoDonDH">
                    <td>{{ order.SoDonDH }}</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>{{ (order.TrangThaiDH === 0) ? 'Chưa xác nhận': 'Đã xác nhận' }}</td>
                    <td><button @click="handleOrderDetail(order.SoDonDH)" class="btn btn-sm btn-primary"><i class="fa-solid fa-circle-info"></i></button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import CustomerService from '../services/customer.service';
import OrderService from '../services/order.service';

export default {
    data() {
        return {
            orders: [],
            customer: {},
        };
    },
    methods: {
        async getMSKH() {
            const user = localStorage.getItem('authState');
            if (user) {
                const result = user ? JSON.parse(user) : {};
                this.customer = await CustomerService.getByEmail(result.user);
                console.log(this.customer);
                this.getOrder(this.customer)
            }
        },
        async getOrder(data) {
            try {
                console.log("data", data);
                this.orders = await OrderService.getByMSKH(data);
            } catch (error) {
                console.error('Error fetching orders:', error.message);
            }
        },
        handleOrderDetail(id){
            this.$router.push({name:"customer.order.detail", params: {msdh: id}})
        }
    },
    mounted() {
        this.getMSKH();
    },

};
</script>
