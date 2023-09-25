import { userInstance } from "../../Interceptor/IntercepterUser";
import { instance } from "../../Interceptor/Intercepter";

const BASE_URL = import.meta.env.VITE_API_URL;

export function questionListApi() {
  return userInstance.get(`${BASE_URL}candidate/Questions`);
}

export function questionListApiForAdmin() {
  return instance.get(`${BASE_URL}questinare`);
}

export function deleteQuestion(questionId) {
  return instance.delete(`${BASE_URL}questinare/${questionId}`);
}

export function questionListApiForAdminById(questionId) {
  return instance.get(`${BASE_URL}questinare/${questionId}`);
}

export function currentScoreApi() {
  return userInstance.get(`${BASE_URL}candidate/totalpoint`);
}

export function answersSubmitApi(formData) {
  let url = `${BASE_URL}candidate`;

  return userInstance.post(url, formData);
}

export function questionSubmitApi(questionId, formData, isEdit) {
  let url = isEdit
    ? `${BASE_URL}questinare/${questionId}`
    : `${BASE_URL}questinare`;

  return isEdit ? instance.put(url, formData) : instance.post(url, formData);
}
export function questionEditSubmitApi(questionId, formData) {
  let url = `${BASE_URL}questinare/${questionId}`;

  return instance.post(url, formData);
}

export function resetScoreApi() {
  return userInstance.delete(`${BASE_URL}candidate/allprogress`);
}
