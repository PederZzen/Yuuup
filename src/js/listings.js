import { allEntriesUrl } from "./api.js";

const output = document.getElementById("auctionItems");

let displayListings = (items) => {
    output.innerHTML = "";
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

        newItem += `
        <div class="border mx-2 card font-montserrat">
            <a href="./item.html?id=${item.id}">
                <div class="relative h-2">
                    <img class="absolute h-full w-full" src="${item.media}" alt="${item.title}">
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
    console.log(data);
    displayListings(data)
 })
 .catch((error) => {
    console.error(error);
 });
