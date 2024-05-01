import createApiClient from "./api.service";

class GroupService {
    constructor(baseUrl = "/api/groups") {
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
    async getByUserId(userId) {
        return (await this.api.get(`/${userId}`)).data;
    }
    async getByMemberId(memberId) {
        return (await this.api.get(`/member-id/${memberId}`)).data;
    }
    async getByGroupId(groupId) {
        return (await this.api.get(`/group-id/${groupId}`)).data;
    }
    // async getByName(name) {
    //     return (await this.api.get(`/search/?text=${name}`)).data;
    // }
    // async getMSHH(id) {
    //     return (await this.api.get(`/mshh/${id}`)).data;
    // }
    async updateDiscussion(groupId, data) {
        return (await this.api.put(`/group-id/${groupId}`, data)).data;
    }
    async updateTopic(groupId, folderId, data) {
        return (await this.api.put(`/topic/group-id/${groupId}&${folderId}`, data)).data;
    }
    async updateComment(groupId, folderId, topicId, data) {
        return (await this.api.put(`/comment/group-id/${groupId}&${folderId}&${topicId}`, data)).data;
    }
    async updateMember(groupId, data) {
        return (await this.api.put(`/update/group/member/${groupId}`, data)).data;
    }
    // async delete(id) {
    //     return (await this.api.delete(`/${id}`)).data;
    // }
}
export default new GroupService();