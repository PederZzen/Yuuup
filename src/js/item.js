const output = document.getElementById("singleItem");
const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");

console.log(id);

const API_BASE_URL = "https://nf-api.onrender.com/api/v1/auction";
const itemUrl = `${API_BASE_URL}/listings/${id}`;

let listItem = (item) => {
    document.title = `Yup! | ${item.title}`
    console.log(item.id);
}

fetch (itemUrl, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
 .then((response) => response.json())
 .then((data) => {
    console.log(data);
    listItem(data)
 })
 .catch((error) => {
    console.error(error);
 });