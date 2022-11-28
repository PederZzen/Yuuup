export const API_BASE_URL = "https://nf-api.onrender.com/api/v1/auction";
export const allEntriesUrl = `${API_BASE_URL}/listings?_seller=true&_bids=true`;
export const itemUrl = `${API_BASE_URL}/listings/`;
export const registerUrl = `${API_BASE_URL}/auth/register`;
export const loginUrl = `${API_BASE_URL}/auth/login`;

export const token = localStorage.getItem("accessToken");
export const credits = localStorage.getItem("credits");
