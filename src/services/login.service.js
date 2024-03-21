import createApiClient from "./api.service";

class LoginService {
    constructor(baseUrl = "/api/login") {
        this.api = createApiClient(baseUrl);
    }

    async findByEmail(data) {
        return (await this.api.post("/", data)).data;
    }
}

export default new LoginService();