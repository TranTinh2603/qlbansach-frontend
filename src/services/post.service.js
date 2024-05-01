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
    async updateLikeComment(postId, commentId, data) {
        return (await this.api.put(`/update/comment/like/${postId}&${commentId}`, data)).data;
    }
    async updateReplyComment(id, userId, createdAt, data) {
        return (await this.api.put(`/update-reply-comment/${id}&${userId}&${createdAt}`, data)).data;
    }
    async deleteComment(postId, commentId) {
        return (await this.api.delete(`/comment/${postId}&${commentId}`)).data;
    }
    async deleteReplyComment(postId, commentId, replyId) {
        return (await this.api.delete(`/comment/reply/${postId}&${commentId}&${replyId}`)).data;
    }
}
export default new ProductService();