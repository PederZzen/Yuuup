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

let listItem = (item) => {
    document.title = `Yup! | ${item.title}`
    
    const created = new Date(item.created).toLocaleString("default", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
    const ends = new Date(item.endsAt)
    const deadline = ends.toLocaleString("default", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
    const now = new Date()

    let allBids = [];
    let highestBidder;

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

    const highestBid = highestBidder[0].amount;

    let media;
    if (item.media.length > 1) {
        media = item.media[0]
    } else if (item.media.length == 0) {
        media = "../../img/noMedia.png"
    } else {
        media = item.media;
    }

    let isLoggedIn = false;
    let isOwner = false;

    if (item.seller.name === username) {
        isOwner = true;
    }
    
    if (token) {
        isLoggedIn = true;
    }

    const bids = `        
    <div class="mt-4 flex justify-between">
        <div>
            <h2 class="font-bold text-gray">${ends < now ? "Sold for" : "Current bid"}</h2>
            <p class="text-xl font-bold">${highestBid} Credit${highestBid > 1 ? "s" : ""}</p>
        </div>
        <div class="flex flex-col justify-end">
            <p class="font-bold text-gray">${item.bids.length} bids</p>
        </div>
    </div>`

    let canBid = `
        ${bids}
        <div class="flex mt-4 ${highestBidder[0].bidder == username ? "hidden" : highestBidder[0].bidder}">
            <input class="p-2 border-2 rounded-l" type="text" value="${highestBid + 10}" id="bidInput">
            <button class="cursor-pointer rounded-r bg-main text-secondary p-2 font-bold" id="bidButton">Place bid</button>
        </div>
        <div class="mt-2"><span class="font-bold text-gray">${highestBidder[0].bidder == username ? "You" : highestBidder[0].bidder}</span> ${highestBidder[0].amount == 0 ? "" : "Currently have the highest bid"}</div>
    `

    const cannotBid = `
        <div>
            <p class="font-bold text-gray">You must be logged in to place bid. <a class="text-accent" href="./login.html">Login?</a></p>
        </div>
    `
    let deleteButton;
    
    if (item.seller.name === username) {
        isOwner = true;
        deleteButton = `
            <button class="bg-main rounded p-1 mt-2 font-bold text-secondary" id="deleteButton">Delete</button>
        `
        canBid = `
            ${bids}
            <div class="font-bold mt-4 text-gray">Would be a bit strange to bid on your own stuff, right?</div>
        `;
    } else {
        deleteButton = ""
    }

    const outputContent = `
    <div class="">
        <img class="" src="${media}" alt="">
        ${deleteButton}
    </div>
    <div>
        <h1 class="text-2xl font-bold">${item.title}</h1>
        <div class="mt-4">${isLoggedIn ? canBid : cannotBid}</div>
        <div class="mt-4">
            <h2 class="font-bold text-gray">Listed</h2>
            <p>${created}</p>
        </div>
        <div class="mt-4">
            <h2 class="font-bold text-gray">${ends < now ? "Ended" : "Ends at"}</h2>
            <p>${deadline}</p>
        </div>
        <div class="mt-4">
            <h2 class="font-bold text-gray">Seller</h2>
            <div class="flex grid-2 items-center mt-2">
                <div>
                    <img style="height: 2rem; width: 2rem; object-fit: cover; border-radius: 100%" src="${item.seller.avatar ? item.seller.avatar : profileImage}" alt="${item.seller.name}">
                </div>
                <div class="flex flex-col justify-center">
                    <p class="font-bold">${item.seller.name}</p>
                </div>
            </div>
        </div>
        <div class="mt-4 ${ends < now ? "block" : "hidden"}">
            <h2 class="font-bold text-gray">Sold to</h2>
            <p>${highestBidder[0].bidder}</p>
        </div>
    </div>`

    const outputDesktop = `
    <div class="grid grid-cols-2 gap-6">${outputContent}</div>
    <div class="mt-20">
        <h1 class="text-2xl font-bold">Description</h1>
        <div class="mt-4">${item.description}</div>
    </div>
    `

    const outputMobile = `
    <div class="">${outputContent}</div>
    <div class="mt-20">
        <h1 class="text-2xl font-bold">Description</h1>
        <div class="mt-4">${item.description}</div>
    </div>
    `

    
    let checkForScreenWidth = () => {
        const w = window.innerWidth;
        if (w < 768) {
            output.innerHTML = outputMobile;
        } else {
            output.innerHTML = outputDesktop;
        }
    }
    checkForScreenWidth()
    window.addEventListener("resize", checkForScreenWidth)

    
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



