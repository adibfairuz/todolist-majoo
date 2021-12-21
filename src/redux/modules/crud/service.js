import axios from "axios";

export const getAllItemsWithApiService = () =>
    axios.get(`https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list`)