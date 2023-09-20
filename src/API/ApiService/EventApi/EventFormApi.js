import { instance } from "../../Interceptor/Intercepter";
import { userInstance } from "../../Interceptor/IntercepterUser";

const BASE_URL = import.meta.env.VITE_API_URL;

// Create event
export function eventAddApi(formData) {
  return instance.post(`${BASE_URL}events`, formData);
}

// List category API call
export const categoryListApi = (params) => {
  return instance.get(`${BASE_URL}admin/categories?size=${params.size}`);
};

// List themes API call
export const themeListApi = (params) => {
  return instance.get(`${BASE_URL}themes`, params);
};

// Event edit API
export function eventEditApi(formData, id) {
  return instance.put(`${BASE_URL}events/${id}`, formData);
}

// Get event details
export function eventDetailsByIdApi(id,isOrganizer) {
  if (isOrganizer) {
    return instance.get(`${BASE_URL}events/${id}`);
  } else {
    return userInstance.get(`${BASE_URL}user/events/${id}`);
  }
 
}

// Get unfinished events
export function unfinishedEventApi() {
  return instance.get(`${BASE_URL}events/unsubmitted`);
}
