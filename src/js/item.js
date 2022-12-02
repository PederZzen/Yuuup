import { listingsUrl } from "./api.js";
import { urlFlags } from "./api.js";
import { token } from "./api.js";
import { username } from "./api.js";
import { deleteListing } from "./delete.js";

const output = document.getElementById("singleItem");
const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");

const mediaPlaceholder = "../../img/noMedia.png";
const profileImage = "../../img/ProfileImage.png";

const itemUrl = listingsUrl + id + urlFlags;


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


    let media;
    if (item.media.length > 1) {
        media = item.media[0]
    } else if (item.media.length == 0) {
        media = "../../img/noMedia.png"
    } else {
        media = item.media;
    }
    
    const canBid = `
        <div class="flex">
            <input class="p-2 border-2 rounded-l" type="text" placeholder="${highestBid + 10}">
            <button class="cursor-pointer rounded-r bg-main text-secondary p-2 font-bold">Place bid</button>
        </div>
    `
    const cannotBid = `
        <div>
            <p class="font-bold text-gray">You must be logged in to place bid. <a class="text-accent" href="./login.html">Login?</a></p>
        </div>
    `

    let deleteButton;
    
    if (item.seller.name === username) {
        deleteButton = `
            <button class="bg-main rounded p-1 mt-2 font-bold text-secondary" id="deleteButton">Delete</button>
        `
    } else {
        deleteButton = ""
    }

    output.innerHTML = `
    <div class="grid grid-cols-2 gap-10">
        <div class="">
            <img class="" src="${media}" alt="">
            ${deleteButton}
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
                <div class="flex items-center mt-2">
                    <div class="">
                        <img style="height: 2rem; width: 2rem; object-fit: cover; border-radius: 100%" src="${item.seller.avatar}" alt="${item.seller.name}">
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
    
    const deleteBtn = document.querySelector("#deleteButton");
    
    deleteBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this listing?") == true) {
            deleteListing(listingsUrl + id)
            output.innerHTML = `
            <div class="mx-auto text-center">
                <h1 class="text-4xl font-bold">Listing was deleted successfully!</h1>
                <h2 class=""text-xl mt-4 font bold text-gray>Redirecting to auction site...</h2>
            </div>`
        }
    })

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
