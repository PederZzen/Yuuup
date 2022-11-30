import { listingsUrl } from "./api.js";
import { urlFlag } from "./api.js";
import { token } from "./api.js";

const output = document.getElementById("singleItem");
const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");

const mediaPlaceholder = "../../img/noMedia.png";
const profileImage = "../../img/ProfileImage.png";

const itemUrl = listingsUrl + id + urlFlag;


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

    let isLoggedIn = false;
    
    if (token) {
        isLoggedIn = true;
    }
    
    const canBid = `
        <div class="flex border-2">
            <input class="p-2" type="text" placeholder="${highestBid + 10}">
            <input class="hover:cursor-pointer bg-main text-secondary p-2 font-bold" type="submit" value="Place Bid"
        </div>
    `
    const cannotBid = `
        <div>
            <p class="font-bold text-gray">You must be logged in to place bid. <a class="text-accent" href="./login.html">Login?</a></p>
        </div>
    `

    output.innerHTML = `
    <div class="grid grid-cols-2 gap-10">
        <div class="">
            <img class="" src="${item.media}" alt="">
        </div>
        <div class="">
            <h1 class="text-2xl font-bold">${item.title}</h1>
            <div class="mt-4 flex justify-between">
                <div>
                    <h2 class="font-bold text-gray">Current bid</h2>
                    <p class="text-xl font-bold">${highestBid} Credit${highestBid > 1 ? "s" : ""}</p>
                </div>
                <div class="flex flex-col justify-end">
                    <p class="font-bold text-gray">${item.bids.length} bids</p>
                </div>
            </div>
            <div class="mt-4">${isLoggedIn ? canBid : cannotBid}</div>
            <div class="mt-4">
                <h2 class="font-bold text-gray">Listed</h2>
                <p>${created}</p>
            </div>
            <div class="mt-4">
                <h2 class="font-bold text-gray">Ends at</h2>
                <p>${deadline}</p>
            </div>
            <div class="mt-4">
                <h2 class="font-bold text-gray">Seller</h2>
                <div class="flex content-center mt-2">
                    <div>
                        <img class="w-10" src="${item.seller.avatar}" alt="">
                    </div>
                    <div class="flex flex-col justify-center m-2">
                        <p class="font-bold">${item.seller.name}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-20">
        <h1 class="text-2xl font-bold">Description</h1>
        <div class="mt-4">${item.description}</div>
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
