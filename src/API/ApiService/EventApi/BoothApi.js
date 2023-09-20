import { instance } from "../../Interceptor/Intercepter";
const BASE_URL = import.meta.env.VITE_API_URL;

// Create booth
export function boothAddApi(formData) {
  return instance.post(`${BASE_URL}booths`, formData);
}

// Booth list of a particular event
export function boothListApi(id, Page) {
  return instance.get(`${BASE_URL}booths`, {
    params: {
      id: id,
      size: 18,
      page: Page,
    },
  });
}

// Delete Booth
export function deleteBoothAPI(id) {
  return instance.delete(`${BASE_URL}booths/` + id);
}

//Update booth
export function boothEditApi(id, formData) {
  return instance.put(`${BASE_URL}booths/${id}`, formData);
}
