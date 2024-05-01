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
    async getByReviewId(reviewId) {
        return (await this.api.get(`/review/${reviewId}`)).data;
    }
    async getReviewByUserId(userId) {
        return (await this.api.get(`/find-by-user-id/${userId}`)).data;
    }
    // async getByStatus(data) {
    //     return (await this.api.post("/find", data)).data;
    // }
    async updateReview(reviewId, data) {
        return (await this.api.put(`/review/${reviewId}`, data)).data;
    }
    async deleteReview(reviewId) {
        return (await this.api.delete(`/review/${reviewId}`)).data;
    }
}
export default new ReviewService();