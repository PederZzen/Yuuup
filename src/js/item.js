import { itemUrl } from "./api.js";

const output = document.getElementById("singleItem");
const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");

const url = itemUrl + id

console.log(id);


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
