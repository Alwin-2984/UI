import { instance } from "../../Interceptor/Intercepter";
import { userInstance } from "../../Interceptor/IntercepterUser";

const BASE_URL = import.meta.env.VITE_API_URL;

export function eventListApi(setSearchData, Page, isSearch) {
  // Create an empty params object
  const params = isSearch ? { size: 12 } : { size: 12, page: Page };

  // Conditionally add the 'search' parameter if setSearchData is truthy
  if (setSearchData.searchData) {
    params.search = setSearchData.searchData.searchData;
  }
  if (setSearchData.filterCategory) {
    params.categoryId = setSearchData.filterCategory.filterCategory;
  }
  if (setSearchData.filterDate.filterDate != "") {
    params.startDate = setSearchData.filterDate.filterDate;
  }
  if (setSearchData.filterVenue) {
    params.venue = setSearchData.filterVenue.filterVenue;
  }
  return userInstance.get(`${BASE_URL}user/events`, {
    params: params,
  });
}

export function eventListApiOrganizer(setSearchData, Page, isSearch) {
  // Create an empty params object
  const params = isSearch ? { size: 12 } : { size: 12, page: Page };

  // Conditionally add the 'search' parameter if setSearchData is truthy
  if (setSearchData.searchData) {
    params.search = setSearchData.searchData.searchData;
  }
  if (setSearchData.filterCategory) {
    params.categoryId = setSearchData.filterCategory.filterCategory;
  }
  if (setSearchData.filterDate) {
    params.startDate = setSearchData.filterDate.filterDate;
  }
  if (setSearchData.filterVenue) {
    params.venue = setSearchData.filterVenue.filterVenue;
  }
  return instance.get(`${BASE_URL}events`, {
    params: params,
  });
}

//Favorite toggle(add/remove) api
export function favoriteList(setSearchData, Page, isSearch) {
  // Create an empty params object
  const params = isSearch ? { size: 12 } : { size: 12, page: Page };

  // Conditionally add the 'search' parameter if setSearchData is truthy
  if (setSearchData.searchData) {
    params.search = setSearchData.searchData.searchData;
  }
  if (setSearchData.filterCategory) {
    params.categoryId = setSearchData.filterCategory.filterCategory;
  }
  if (setSearchData.filterDate.filterDate != "") {
    params.startDate = setSearchData.filterDate.filterDate;
  }
  if (setSearchData.filterVenue) {
    params.venue = setSearchData.filterVenue.filterVenue;
  }
  return userInstance.get(`${BASE_URL}user/favorites`, {
    params: params,
  });
}