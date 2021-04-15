import axios from "axios";

function createWithAuth(url, options) {
  const instance = axios.create(
    Object.assign(
      {baseURL: process.env.VUE_APP_API_URL + url},
      {
        ...options,
        timeout: 0
      }
    )
  );
  return instance;
}

const code = createWithAuth(`/api/v1/code`);

export default {
  apiCode(upperCode) {
    return code.get(`/${upperCode}`);
  },
  apiFile(pageName, data) {
    return code.post(`/${pageName}`, data);
  },
  apiContact(data) {
    return code.post(``, data);
  }
};
