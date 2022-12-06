import { allEntriesUrl } from "./api.js";

const output = document.getElementById("listings");
const loadingSpinner = document.querySelector("#loadingSpinner");
const errorMsg = document.querySelector("#errorMsg");
const auctionHero = document.querySelector("#auctionHero");

let displayListings = (items) => {
    let newItem = "";

    items.forEach(item => {
        let date = new Date(item.endsAt);
        let deadline = date.toLocaleString("default", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

        let allBids = [];
        
        if(item.bids.length == 0) {
            allBids.push(0)
        } else {
            item.bids.forEach(e => {
                allBids.push(e.amount)
            });
        }
        
        let highestBid = Math.max(...allBids);
        
        let media;
        if (item.media.length > 1) {
            media = item.media[0]
        } else if (item.media.length == 0) {
            media = "../../img/noMedia.png"
        } else {
            media = item.media;
        }
        
        newItem += `
        <div class="font-montserrat">
            <a href="./item.html?id=${item.id}">
                <div class="">
                    <img class="" src="${media}" alt="${item.title}">
                </div>
                <h2 class="font-bold py-1">${item.title}</h2>
                <p class="text-gray">Current Bid<p/>
                <h2 class="font-bold">${highestBid}</h2>
                <p class="text-gray">Auction ends at<p/>
                <p class="font-bold">${deadline}</p>
            </a>
        </div>`
    });

    output.innerHTML = newItem;

}

fetch (allEntriesUrl, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
 .then((response) => response.json())
 .then((data) => {
    displayListings(data)
 })
 .catch((error) => {
    console.error(error);
    auctionHero.classList.add("hidden")
    errorMsg.innerHTML = `
    <div class="font-extrabold font-montserrat flex flex-col items-center text-center gap-4">
        <h2 class="text-4xl">1+1=11</h2>
        <h3 class="text-xl">Sorry, an error has occured</h3>
        <p class="text-gray w-1/2">Most likely you have been fiddeling with something you should not fiddle with. 
        Or maybe there is an actual error? 
        Dont ask me, i am just an error message.</p>
    </div>`
 })
 .finally(() => {
    loadingSpinner.classList.add("hidden")
 });
