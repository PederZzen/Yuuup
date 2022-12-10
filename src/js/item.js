import { listingsUrl } from "./api.js";
import { listingsFlag } from "./api.js";
import { token } from "./api.js";
import { username } from "./api.js";
import { deleteListing } from "./delete.js";
import { placeBid } from "./bid.js";

const output = document.getElementById("singleItem");
const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");
const profileImage = "../../img/ProfileImage.png";
const itemUrl = listingsUrl + id + listingsFlag;
const errorMsg = document.querySelector("#errorMsg");
const loadingSpinner = document.querySelector("#loadingSpinner");
const breadcrumbs = document.querySelector("#breadcrumbs");

let listItem = (item) => {
    document.title = `Yuuup! | ${item.title}`;
    breadcrumbs.innerHTML = item.title;
    
    const created = new Date(item.created).toLocaleString("default", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
    const ends = new Date(item.endsAt);
    const deadline = ends.toLocaleString("default", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
    const now = new Date();

    let allBids = [];
    let highestBidder;
    let isOwner = false;

    if (item.seller.name === username) {
        isOwner = true;
    }

    if(item.bids.length == 0) {
        allBids.push({
            amount: 0, 
            bidder: "No bids! Be the first to place a bid on this item?"
        })
        highestBidder = allBids
    } else {
        item.bids.forEach(e => {
            const amount = e.amount;
            const bidder = e.bidderName;
            allBids.push({
                amount, bidder
            })
        });
        highestBidder = allBids.slice(-1)
    }

    const highestBidAmount = highestBidder[0].amount;
    const highestBidName = highestBidder[0].bidder;

    let bidHistory = "";
    if (highestBidAmount != 0) {
        allBids.forEach(bid => {
            bidHistory += `
                <li><span class="font-bold">${bid.bidder}</span> placed a bid on ${bid.amount}</li>
            `
        })
    } else if (isOwner) {
        bidHistory = `<li><span class="font-bold">Sorry, no bids yet..</li>`
    }else {
        bidHistory = `<li><span class="font-bold">No bids! Be the first to place a bid on this item?</li>`;

    }

    let media;
    if (item.media.length > 1) {
        media = item.media[0]
    } else if (item.media.length == 0) {
        media = "../../img/noMedia.png"
    } else {
        media = item.media;
    }

    const bids = `        
    <div class="mt-4 flex justify-between">
        <div>
            <h2 class="font-bold text-gray">${ends < now ? "Sold for" : "Current bid"}</h2>
            <p class="text-xl font-bold">${highestBidAmount} Credit${highestBidAmount > 1 ? "s" : ""}</p>
        </div>
        <div class="flex flex-col justify-end">
            <p class="font-bold text-gray">${item.bids.length} bids</p>
        </div>
    </div>`

    let itemHasBids = `
    <div class="mt-8">
        <h2 class="font-bold text-gray">Bid history</h2>
        <ul class="flex flex-col-reverse mt-1 gap-1">
            ${bidHistory}
        </ul>
    </div>`

    let canBid = `
        ${bids}
        <div class="flex mt-4 ${highestBidName == username ? "hidden" : highestBidName}">
            <input class="p-2 border-2 rounded-l" type="text" value="${highestBidAmount + 10}" id="bidInput">
            <button class="cursor-pointer rounded-r bg-main text-secondary p-2 font-bold" id="bidButton">Place bid</button>
        </div>
        ${itemHasBids}
    `

    const cannotBid = `
        <div>
            <p class="font-bold text-gray">You must be logged in to place bid. <a class="text-accent" href="./login.html">Login?</a></p>
        </div>
    `
    let deleteButton;
    
    if (isOwner) {
        deleteButton = `
            <button class="bg-main rounded p-1 mt-2 font-bold text-secondary" id="deleteButton">Delete</button>
        `
        canBid = `
            ${bids}
            ${itemHasBids}
        `;
    } else {
        deleteButton = ""
    }

    output.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">    
        <div>
            <img class="w-full object-cover rounded" src="${media}" alt="A picture of ${item.title}">
            ${deleteButton}
        </div>
        <div>
            <h1 class="text-2xl font-bold">${item.title}</h1>
            <div class="mt-8">${token ? canBid : cannotBid}</div>
            <div class="mt-8">
                <h2 class="font-bold text-gray">Listed</h2>
                <p>${created}</p>
            </div>
            <div class="mt-8">
                <h2 class="font-bold text-gray">${ends < now ? "Ended" : "Ends at"}</h2>
                <p>${deadline}</p>
            </div>
            <div class="mt-8">
                <h2 class="font-bold text-gray">Seller</h2>
                <div class="flex grid-2 items-center mt-2 gap-2">
                    <div>
                        <img class="w-10 h-10 object-cover rounded-full" src="${item.seller.avatar ? item.seller.avatar : profileImage}" alt="${item.seller.name}">
                    </div>
                    <div class="flex flex-col justify-center">
                        <p class="">${item.seller.name}</p>
                    </div>
                </div>
            </div>
            <div class="mt-8 ${ends < now ? "block" : "hidden"}">
                <h2 class="font-bold text-gray">Sold to</h2>
                <p>${highestBidder[0].bidder}</p>
            </div>
        </div>
    </div>
    <div class="mt-20">
        <h1 class="text-2xl font-bold">Description</h1>
        <div class="mt-4">${item.description}</div>
    </div>
    `

    const deleteBtn = document.querySelector("#deleteButton");
    
    if (isOwner) {
        deleteBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this listing?") == true) {
                deleteListing(listingsUrl + id)
                output.innerHTML = `
                <div class="mx-auto text-center">
                    <h1 class="text-4xl font-bold">Listing was deleted successfully!</h1>
                    <h2 class="text-xl mt-4 font bold text-gray">Redirecting to auction site...</h2>
                </div>`
            }
        })
    }
    
    const bidButton = document.getElementById("bidButton");
    bidButton.addEventListener("click", placeBid)

}

fetch (itemUrl, {
    method: "GET"
})
 .then((response) => response.json())
 .then((data) => {
    console.log(data);
    listItem(data);
})
.catch((error) => {
    console.error(error);
    if (!error.message.includes("bidButton")) {
        errorMsg.innerHTML = `
        <div class="font-extrabold font-montserrat flex flex-col items-center text-center gap-4">
            <h2 class="text-4xl">1+1=11</h2>
            <h3 class="text-xl">Sorry, an error has occured</h3>
            <p class="text-gray w-1/2">Most likely you have been fiddeling with something you should not fiddle with. Or maybe there is an actual error? Dont ask me, i am just an error message.</p>
        </div>`
    }
})
.finally(() => {
    loadingSpinner.classList.add("hidden")
 });



