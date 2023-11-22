import createApiClient from "./api.service";

class LoginService{
    constructor(baseUrl = "/api/register") {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }
}

export default new LoginService();