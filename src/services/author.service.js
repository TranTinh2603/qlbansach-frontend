import createApiClient from "./api.service";

class AuthorService {
    constructor(baseUrl = "/api/authors") {
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
    async getByName(name) {
        return (await this.api.get(`/${name}`)).data;
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
export default new AuthorService();