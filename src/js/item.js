import { listingsUrl } from "./api.js";
import { urlFlag } from "./api.js";

const output = document.getElementById("singleItem");
const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");

const mediaPlaceholder = "../../img/noMedia.png"
const profileImage = "../../img/ProfileImage.png"

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
    <div class="grid grid-cols-2 gap-10 font-montserrat">
        <div class="">
            <img class="" src="${item.media}" alt="">
        </div>
        <div class="">
            <h1 class="text-2xl font-bold">Selling all my money</h1>
            <div class="mt-4 flex justify-between">
                <div>
                    <h2 class="font-bold text-gray">Current bid</h2>
                    <p class="text-xl font-bold">50 Credits</p>
                </div>
                <div class="flex flex-col justify-end">
                    <p class="font-bold text-gray">8 bids</p>
                </div>
            </div>
            <div class="mt-4">
                <p class="font-bold text-gray">You must be logged in to place bid. <a class="text-accent" href="#">Login?</a></p>
            </div>
            <div class="mt-4">
                <h2 class="font-bold text-gray">Listed</h2>
                <p>8. November at 10:22</p>
            </div>
            <div class="mt-4">
                <h2 class="font-bold text-gray">Ends at</h2>
                <p>10. November at 10:22</p>
            </div>
            <div class="mt-4">
                <h2 class="font-bold text-gray">Seller</h2>
                <div class="flex content-center">
                    <div>
                        <img class="w-10" src="./img/ProfileImage.png" alt="">
                    </div>
                    <div class="flex flex-col justify-center m-2">
                        <p class="font-bold">Burt Macklin</p>
                    </div>
                </div>
            </div>
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
