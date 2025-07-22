import { setLoader } from "../Redux/Slice/loaderSlice";
import { store } from "../Redux/store";
import client from "./clients/clients";

const apiCallPost = async (url: string, data: any) => {
  try {
    store.dispatch(setLoader(true));
    const response = await client.post(url, data);
    return {
      data: response.data,
      loader: false,
      success: true,
      error: false,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      data: null,
      loader: false,
      success: false,
      error: true,
      errorMessage: error,
    };
  } finally {
    store.dispatch(setLoader(false));
  }
};

const apiCallGet = async (url: string) => {
  try {
    store.dispatch(setLoader(true));
    const response = await client.get(url);
    return {
      data: response.data,
      loader: false,
      success: true,
      error: false,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      data: null,
      loader: false,
      success: false,
      error: true,
      errorMessage: error,
    };
  } finally {
    store.dispatch(setLoader(false));
  }
};

const apiCallPut = async (url: string, data: any) => {
  try {
    store.dispatch(setLoader(true));
    const response = await client.put(url, data);
    return {
      data: response.data,
      loader: false,
      success: true,
      error: false,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      data: null,
      loader: false,
      success: false,
      error: true,
      errorMessage: error,
    };
  } finally {
    store.dispatch(setLoader(false));
  }
};

const apiCallDel = async (url: string) => {
  try {
    store.dispatch(setLoader(true));
    const response = await client.delete(url);
    return {
      data: response.data,
      loader: false,
      success: true,
      error: false,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      data: null,
      loader: false,
      success: false,
      error: true,
      errorMessage: error,
    };
  } finally {
    store.dispatch(setLoader(false));
  }
};

const apiCallPatch = async (url: string, data: any) => {
  try {
    store.dispatch(setLoader(true));
    const response = await client.patch(url, data);
    return {
      data: response.data,
      loader: false,
      success: true,
      error: false,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      data: null,
      loader: false,
      success: false,
      error: true,
      errorMessage: error,
    };
  } finally {
    store.dispatch(setLoader(false));
  }
};

export { apiCallPost, apiCallGet, apiCallPut, apiCallDel, apiCallPatch };
