import { listingsUrl } from "./api.js";
import { token } from "./api.js";
import { credits } from "./api.js";

const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");

const bidUrl = `${listingsUrl}${id}/bids`;

export let placeBid = (e) => {
    e.preventDefault();
    
    const bidInput = document.getElementById("bidInput");
    const bid = bidInput.value.trim()
    const amount = parseInt(bid);
    
    const data = {
        amount,
    }
    
    if (isNaN(amount) || amount.length == "") {
        bidInput.value = ""
        bidInput.setAttribute("placeholder", "Bid must be a number");
    } else if (confirm("Are you sure you wanna use your well earned, free credits on this item?") == true) {
        bidOnItem(bidUrl, data)
    }
}

async function bidOnItem (url, data) {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
        await fetch (url, options)
        location.reload()
    } catch (error) {
        console.log(error);
    }
}

