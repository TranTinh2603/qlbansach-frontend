import createApiClient from "./api.service";

class TagService {
    constructor(baseUrl = "/api/tags") {
        this.api = createApiClient(baseUrl);
    }
    // async getByEmail(email) {
    //     return (await this.api.post("/email/", email)).data;
    // }
    // async create(data) {
    //     return (await this.api.post("/", data)).data;
    // }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    // async deleteAll() {
    //     return (await this.api.delete("/")).data;
    // }
    // async get(id) {
    //     return (await this.api.get(`/${id}`)).data;
    // }
    // async getUserByEmail(email) {
    //     return (await this.api.get(`/find-by-email/${email}`)).data;
    // }
    // async updateFriends(userId, data) {
    //     return (await this.api.put(`/${userId}`, data)).data;
    // }
    // async delete(id) {
    //     return (await this.api.delete(`/${id}`)).data;
    // }
}
export default new TagService();