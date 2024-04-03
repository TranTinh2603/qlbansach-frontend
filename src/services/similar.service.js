import createApiClient from "./api.service";

class SimilarService {
    constructor(baseUrl = "http://localhost:5000/api/similars") {
        this.api = createApiClient(baseUrl);
    }
    // async getAll() {
    //     return (await this.api.get("/")).data;
    // }
    // async create(data) {
    //     return (await this.api.post("/", data)).data;
    // }
    // async deleteAll() {
    //     return (await this.api.delete("/")).data;
    // }
    async get(bookId) {
        return (await this.api.get(`/${bookId}`)).data;
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
export default new SimilarService();