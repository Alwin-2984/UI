import { userInstance } from "../../Interceptor/IntercepterUser";
import { instance } from "../../Interceptor/Intercepter";

const BASE_URL = import.meta.env.VITE_API_URL;

export function questionListApi() {
  return userInstance.get(`${BASE_URL}candidate/Questions`);
}

export function currentScoreApi() {
  return userInstance.get(`${BASE_URL}candidate/totalpoint`);
}

export function answersSubmitApi(formData) {
  let url = `${BASE_URL}candidate`;

  return userInstance.post(url, formData);
}

export function questionSubmitApi(formData) {
  let url = `${BASE_URL}questinare`;

  return instance.post(url, formData);
}

export function resetScoreApi() {
  return userInstance.delete(`${BASE_URL}candidate/allprogress`);
}
