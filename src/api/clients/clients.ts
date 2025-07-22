import axios from "axios";
import { BASE_URL } from "../../constants";

const client = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
})
export default client