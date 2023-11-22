import createApiClient from "./api.service";

class CustomerService {
    constructor(baseUrl = "/api/customers") {
        this.api = createApiClient(baseUrl);
    }
    async getByEmail(email) {
        return (await this.api.post("/email/", email)).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    // async deleteAll() {
    //     return (await this.api.delete("/")).data;
    // }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    // async delete(id) {
    //     return (await this.api.delete(`/${id}`)).data;
    // }
} 
export default new CustomerService();