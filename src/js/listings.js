import { allEntriesUrl } from "./api.js";

const output = document.getElementById("listings");

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
 });
