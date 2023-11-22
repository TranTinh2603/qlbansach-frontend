import createApiClient from "./api.service";

class LoginService{
    constructor(baseUrl = "/api/login") {
        this.api = createApiClient(baseUrl);
    }

    async findOne(email) {
        return (await this.api.post("/", email)).data;
    }
}

export default new LoginService();