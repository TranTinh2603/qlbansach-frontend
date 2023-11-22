import createApiClient from "./api.service";

class CategoryService{
    constructor(baseUrl = "/api/categorys"){
        this.api = createApiClient(baseUrl);
    }

    async getAll(){
        return (await this.api.get("/")).data;
    }
    async getByMa(id){
        return (await this.api.get(`/${id}`)).data;
    }
    async getTenByMa(id){
        return (await this.api.get(`/detail/${id}`)).data;
    }
}

export default new CategoryService();