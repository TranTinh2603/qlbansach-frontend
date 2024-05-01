import createApiClient from "./api.service";

class BookService {
    constructor(baseUrl = "/api/books") {
        this.api = createApiClient(baseUrl);
    }
    // async getByEmail(email) {
    //     return (await this.api.post("/email/", email)).data;
    // }
    // async create(data) {
    //     return (await this.api.post("/", data)).data;
    // }
    // async deleteAll() {
    //     return (await this.api.delete("/")).data;
    // }
    async getALl() {
        return (await this.api.get('/')).data;
    }
    async getByBookId(id) {
        return (await this.api.get(`/find/${id}`)).data;
    }
    async getByLiveSearch(searchText) {
        return (await this.api.get(`/live-search/${searchText}`)).data;
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
export default new BookService();