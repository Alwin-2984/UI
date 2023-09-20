import { userInstance } from "../../Interceptor/IntercepterUser";

const BASE_URL = import.meta.env.VITE_API_URL;

export function questionListApi() {
  return userInstance.get(`${BASE_URL}candidate/Questions`);
}

export function answersSubmitApi(formData) {
  let url = `${BASE_URL}candidate`;

  return userInstance.post(url, formData);
}
