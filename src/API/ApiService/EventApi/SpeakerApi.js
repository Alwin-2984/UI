import { instance } from "../../Interceptor/Intercepter";
const BASE_URL = import.meta.env.VITE_API_URL;

// Create speaker
export function speakerAddApi(formData) {
  return instance.post(`${BASE_URL}speakers`, formData);
}

// Speakers list of a particular event
export function speakersListApi(id, isNextPage, Page) {
  return instance.get(`${BASE_URL}speakers`, {
    params: {
      id: id,
      size: 20,
      page: isNextPage ? Page : 1,
    },
  });
}

// Delete Speaker
export function deleteSpeakerAPI(id) {
  return instance.delete(`${BASE_URL}speakers/` + id);
}
export function speakerEditApi(id, formData) {
  return instance.put(`${BASE_URL}speakers/${id}`, formData);
}
