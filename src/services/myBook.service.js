import createApiClient from "./api.service";

class MyBookService {
    constructor(baseUrl = "/api/my-books") {
        this.api = createApiClient(baseUrl);
    }
    // async getByEmail(email) {
    //     return (await this.api.post("/email/", email)).data;
    // }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    // async deleteAll() {
    //     return (await this.api.delete("/")).data;
    // }
    // async get(id) {
    //     return (await this.api.get(`/${id}`)).data;
    // }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getByStatus(data) {
        return (await this.api.post("/find", data)).data;
    }
    async getByUserId(userId) {
        return (await this.api.get(`/${userId}`)).data;
    }
    async getByUserIdAndBookId(userId, bookId) {
        return (await this.api.get(`/find/${userId}&${bookId}`)).data;
    }
    async update(userId, bookId, data) {
        return (await this.api.put(`/find/${userId}&${bookId}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/my-book/${id}`)).data;
    }
}
export default new MyBookService();