import { listingsUrl } from "./api.js";
import { token } from "./api.js";

const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");

const bidUrl = `${listingsUrl}${id}/bids`

export let placeBid = (e) => {
    e.preventDefault();
    const bid = document.getElementById("bidInput").value.trim();

    const amount = parseInt(bid);

    const data = {
        amount,
    }

    if (isNaN(amount)) {
        console.log("Must be a number, dipshit..");
    } else {
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
        const response = await fetch (url, options)
        console.log(response);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}

