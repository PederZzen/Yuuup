import { profileUrl } from "./api.js";
import { token } from "./api.js";
import { updateMedia } from "./updateMedia.js";

const profileListings = profileUrl + "/listings?sort=created&sortOrder=desc&_seller=true&_bids=true";
const hero = document.querySelector("#hero");
const listingsOutput = document.querySelector("#listings");
const profileImage = "../../img/ProfileImage.png"

let listProfile = (data) => {
    document.title = `Yuuup! | ${data.name}`

    let heroOutput = `
    <section class="bg-main flex flex-col md:block">
        <div class="md:flex gap-4 font-montserrat py-4 max-w-7xl text-center mx-auto px-2 md:px-8">
            <button class="editMediaOpen">
                <img class="rounded-full h-40 w-40 object-cover" title="Edit profile image" src="${data.avatar == null ? profileImage : data.avatar }" alt="Profile picture of ${data.name}">
            </button>
            <div class="flex flex-col items-center md:items-start my-10 gap-2">
                <h1 class="text-secondary text-2xl font-bold">${data.name}</h1>
                <h2 class="text-gray">${data.email}</h2>
                <p class="text-accent font-bold">${data.credits} Credits</p>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-2 md:px-8 p-2 hidden" id="editMediaContainer" >
            <input type="text" id="editMediaInput" placeholder="Add link to new image" class=" w-1/2 rounded-l p-2">
            <button class="bg-accent px-2 font-bold text-main rounded-r" id="submitNewMedia">Update</button>
        </div>
    </section>
    `
    hero.innerHTML = heroOutput;

    let editMedia = document.querySelector(".editMediaOpen")
    editMedia.addEventListener("click", () => {
        let input = document.querySelector("#editMediaContainer")
        if (input.classList.contains("hidden")){
            input.classList.remove("hidden")
            input.classList.add("flex")

        } else {
            input.classList.add("hidden")
        }
    })
    const submitNewMedia = document.querySelector("#submitNewMedia");
    submitNewMedia.addEventListener("click", updateMedia)
    
}

let listProfileListings = (data) => {
    let listItem = "";

    data.forEach(listing => {
        let date = new Date(listing.endsAt);
        let deadline = date.toLocaleString("default", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
        const now = new Date();

        let allBids = [];
        
        if(listing.bids.length == 0) {
            allBids.push(0)
        } else {
            listing.bids.forEach(e => {
                allBids.push(e.amount)
            });
        }
        
        let highestBid = Math.max(...allBids);
        
        let media;
        if (listing.media.length > 1) {
            media = listing.media[0]
        } else if (listing.media.length == 0) {
            media = "../../img/noMedia.png"
        } else {
            media = listing.media;
        }

        let auctionStatus = `                    
        <h2 class="font-bold py-1">${listing.title}</h2>
        <p class="text-gray">Current Bid</p>
        <h2 class="font-bold">${highestBid}</h2>
        <p class="text-gray">Auction ends at<p/>
        <p class="font-bold">${deadline}</p>`

        if (date < now) {
            auctionStatus = `
            <h2 class="font-bold py-1">${listing.title}</h2>
            <p class="text-accent">Auction has ended</p>
            <p class="text-gray">Sold for<p/>
            <p class="font-bold">${highestBid}</p>
            `
        }    

        listItem += `
        <div class="font-montserrat bg-white rounded">
            <a href="./item.html?id=${listing.id}">
                <img class="h-64 w-full object-cover rounded-t" src="${media}" alt="${listing.title}">
                <div class="p-2">${auctionStatus}</div>
            </a>
        </div>
        `
    })

    if (data.length == 0) {
        listingsOutput.innerHTML = `<a href="./sell.html" class="font-bold text-gray">No listings yet.</a>`
    } else {
        listingsOutput.innerHTML = listItem;
    }
}

let fetchProfileData = (url, listData) => {
    fetch (url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
     .then((response) => response.json())
     .then((data) => {
        listData(data)
        console.log(data);
     })
     .catch((error) => {
        console.log(error);
     })
}

fetchProfileData(profileUrl, listProfile)
fetchProfileData(profileListings, listProfileListings)
