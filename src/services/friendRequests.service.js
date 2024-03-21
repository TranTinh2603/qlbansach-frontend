import createApiClient from "./api.service";

class FriendRequestsService {
    constructor(baseUrl = "/api/friend-requests") {
        this.api = createApiClient(baseUrl);
    }
    // async getAll() {
    //     return (await this.api.get("/")).data;
    // }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async getBySenderIdAndReceiverId(senderId, receiverId) {
        return (await this.api.get(`/${senderId}&${receiverId}`)).data;
    }
    async getByReceiverId(receiverId) {
        return (await this.api.get(`/find-by-receiver-id/${receiverId}`)).data;
    }
    // async deleteAll() {
    //     return (await this.api.delete("/")).data;
    // }
    // async get(id) {
    //     return (await this.api.get(`/${id}`)).data;
    // }
    async updateStatus(senderId, receiverId, data) {
        return (await this.api.put(`/${senderId}&${receiverId}`, data)).data;
    }
    async delete(senderId, receiverId) {
        return (await this.api.delete(`/${senderId}&${receiverId}`)).data;
    }
}
export default new FriendRequestsService();