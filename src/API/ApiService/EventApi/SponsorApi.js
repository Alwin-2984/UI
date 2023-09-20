import { instance } from "../../Interceptor/Intercepter";
const BASE_URL = import.meta.env.VITE_API_URL;

// Create sponsor
export function sponsorAddApi(formData) {
  return instance.post(`${BASE_URL}sponsors`, formData);
}

// Sponsors list of a particular event
export function sponsorsListApi(id, isNextPage, Page) {
  return instance.get(`${BASE_URL}sponsors`, {
    params: {
      id: id,
      size: 20,
      page: isNextPage ? Page : 1,
    },
  });
}

// Delete sponsor
export function deleteSponsorAPI(id) {
  return instance.delete(`${BASE_URL}sponsors/` + id);
}

// Edit sponsor
export function sponsorEditApi(id, formData) {
  return instance.put(`${BASE_URL}sponsors/${id}`, formData);
}

// Sponsor submit
export function eventFinalSubmitApi(id) {
  return instance.put(`${BASE_URL}events/submit/${id}`);
}
