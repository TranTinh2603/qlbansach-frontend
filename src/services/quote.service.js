import createApiClient from "./api.service";

class TagService {
    constructor(baseUrl = "/api/quotes") {
        this.api = createApiClient(baseUrl);
    }
    // async getAll() {
    //     return (await this.api.get("/")).data;
    // }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    // async deleteAll() {
    //     return (await this.api.delete("/")).data;
    // }
    async getByUserId(userId) {
        return (await this.api.get(`/${userId}`)).data;
    }
    async getByQuoteId(quoteId) {
        return (await this.api.get(`/find-by-quote-id/${quoteId}`)).data;
    }
    async deleteQuoteId(quoteId) {
        return (await this.api.delete(`/find-by-quote-id/${quoteId}`)).data;
    }
    // async getByName(name) {
    //     return (await this.api.get(`/search/?text=${name}`)).data;
    // }
    // async getMSHH(id) {
    //     return (await this.api.get(`/mshh/${id}`)).data;
    // }
    // async update(id, data) {
    //     return (await this.api.put(`/${id}`, data)).data;
    // }
    // async delete(id) {
    //     return (await this.api.delete(`/${id}`)).data;
    // }
}
export default new TagService();