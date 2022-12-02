export const API_BASE_URL = "https://nf-api.onrender.com/api/v1/auction";
export const urlFlags = `?sort=created&sortOrder=desc&_seller=true&_bids=true`
export const listingsUrl = `${API_BASE_URL}/listings/`;
export const allEntriesUrl = `${API_BASE_URL}/listings${urlFlags}`;
export const registerUrl = `${API_BASE_URL}/auth/register`;
export const loginUrl = `${API_BASE_URL}/auth/login`;

export const token = localStorage.getItem("accessToken");
export const credits = localStorage.getItem("credits");
export const username = localStorage.getItem("username");
