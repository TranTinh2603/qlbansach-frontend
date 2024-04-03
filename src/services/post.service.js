import createApiClient from "./api.service";

class ProductService {
    constructor(baseUrl = "/api/posts") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    // async deleteAll() {
    //     return (await this.api.delete("/")).data;
    // }
    async getPostByUserId(userId) {
        return (await this.api.get(`/${userId}`)).data;
    }
    // async getByName(name) {
    //     return (await this.api.get(`/search/?text=${name}`)).data;
    // }
    // async getMSHH(id) {
    //     return (await this.api.get(`/mshh/${id}`)).data;
    // }
    async update(id, data) {
        return (await this.api.put(`/update/${id}`, data)).data;
    }
    async updateComment(id, data) {
        return (await this.api.put(`/update-comment/${id}`, data)).data;
    }
    async updateReplyComment(id, userId, createdAt, data) {
        return (await this.api.put(`/update-reply-comment/${id}&${userId}&${createdAt}`, data)).data;
    }
    // async delete(id) {
    //     return (await this.api.delete(`/${id}`)).data;
    // }
}
export default new ProductService();