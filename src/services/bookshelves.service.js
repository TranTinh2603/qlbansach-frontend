import createApiClient from "./api.service";

class BookshelvesService {
    constructor(baseUrl = "/api/bookshelves") {
        this.api = createApiClient(baseUrl);
    }
    // async getByEmail(email) {
    //     return (await this.api.post("/email/", email)).data;
    // }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    // async deleteAll() {
    //     return (await this.api.delete("/")).data;
    // }
    async getByUserId(userId) {
        return (await this.api.get(`/${userId}`)).data;
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
export default new BookshelvesService();