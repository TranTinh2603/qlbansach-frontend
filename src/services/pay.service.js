import createApiClient from "./api.service";

class PayService {
    constructor(baseUrl = "/api/pay") {
        this.api = createApiClient(baseUrl);
    }
    async getUrl(data) {
        return (await this.api.post("/", data)).data;
    }
    // async create(data) {
    //     return (await this.api.post("/", data)).data;
    // }
    // async deleteAll() {
    //     return (await this.api.delete("/")).data;
    // }
    // async get(id) {
    //     return (await this.api.get(`/${id}`)).data;
    // }
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
export default new PayService();