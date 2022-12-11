import { listingsUrl } from "./api.js";
import { token } from "./api.js";

const titleInput = document.getElementById("titleInput");
const tagsInput = document.getElementById("tagsInput");
const mediaInput = document.getElementById("mediaInput");
const descriptionInput = document.getElementById("description");
const endsAtInput = document.getElementById("endsAt");
const publishBtn = document.querySelector("input[type=submit]");

const endsAtInputValue = new Date().toISOString().slice(0, -8);
endsAtInput.setAttribute("value", endsAtInputValue)

async function newListing (url) {
    const title = titleInput.value;
    const tags = tagsInput.value.split(" ");
    const media = mediaInput.value.split(" ");
    const description = descriptionInput.value;
    const endsAt = endsAtInput.value;

    const entry = {
        title,
        endsAt
    }

    if (tags != "") {
        entry["tags"] = tags;
    }
    if (media != "") {
        entry["media"] = media;
    }
    if (description != "") {
        entry["description"] = description;
    }

    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(entry)    
        }
        await fetch (url, options)
        window.location.href = "./auction.html"
    } catch (error) {
        console.log(error);
    }
}

publishBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (titleInput.value && endsAtInput.value) {
        newListing(listingsUrl);
        titleInput.value = "";
        tagsInput.value = "";
        mediaInput.value = "";
        descriptionInput.value = "";
        endsAtInput.value = "";
    } else {
        const errorMessage = document.getElementById("newListingError");
        errorMessage.innerHTML = "Title and deadline is required to publish";
    }
})