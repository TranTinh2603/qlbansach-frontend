import createApiClient from "./api.service";

class ReviewService {
    constructor(baseUrl = "/api/reviews") {
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
    async getByUserIdAndBookId(userId, bookId) {
        return (await this.api.get(`/${userId}&${bookId}`)).data;
    }
    async getByBookId(bookId) {
        return (await this.api.get(`/${bookId}`)).data;
    }
    // async getByStatus(data) {
    //     return (await this.api.post("/find", data)).data;
    // }
    // async update(id, data) {
    //     return (await this.api.put(`/${id}`, data)).data;
    // }
    // async delete(id) {
    //     return (await this.api.delete(`/${id}`)).data;
    // }
}
export default new ReviewService();