import { listingsUrl } from "./api.js";
import { urlFlag } from "./api.js";

const output = document.getElementById("singleItem");
const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");

const itemUrl = listingsUrl + id + urlFlag

let listItem = (item) => {
    document.title = `Yup! | ${item.title}`

    let created = new Date(item.created).toLocaleString("default", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

    let deadline = new Date(item.endsAt).toLocaleString("default", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

    let allBids = [];

    if(item.bids.length == 0) {
        allBids.push(0)
    } else {
        item.bids.forEach(e => {
            allBids.push(e.amount)
        });
    }

    let highestBid = Math.max(...allBids);

    output.innerHTML = `
    <div>
        <img src="${item.media}" alt="${item.title}">
    </div>
    <div class="">
        <h1 class="">${item.title}</h1>
        <h2>Current Bid</h2>
        <h3>${highestBid}</h3>
        <p>${item.bids.length} bids</p>
        <p>You must be logged in to place bid. <a href="./login.html" class="text-accent">Login?</a></p>
        <h4>Listed</h4>
        <p>${created}</p>
        <h4>Ends at</h4>
        <p>${deadline}</p>
        <h4>Seller</h4>
        <div class="flex">
            <img src="${item.seller.avatar}" alt="Profile picture of ${item.seller.name}" class="profile_picture_thumbnail">
            <p>${item.seller.name}</p>
        </div>
    </div>
    `

}

fetch (itemUrl, {
    method: "GET"
})
 .then((response) => response.json())
 .then((data) => {
    console.log(data);
    listItem(data)
 })
 .catch((error) => {
    console.error(error);
 });
