import client from "./clients/clients";

const apiCallPost = async (url: string, data: any) => {
    const response = await client.post(url, data);
    return response.data;
}

const apiCallGet = async (url: string) => {
    const response = await client.get(url);
    return response.data;
}
const apiCallPut = async (url: string, data: any) => {
    const response = await client.put(url, data);
    return response.data;
}
const apiCallDel = async (url: string) => {
    const response = await client.delete(url);
    return response.data;
}
const apiCallPatch = async (url: string, data: any) => {
    const response = await client.patch(url, data);
    return response.data;
}

export { apiCallPost, apiCallGet, apiCallPut, apiCallDel, apiCallPatch };