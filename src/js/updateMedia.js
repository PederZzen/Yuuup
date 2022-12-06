import { profileUrl } from "./api.js";
import { token } from "./api.js";
import { username } from "./api.js";

const updateMediaUrl = `${profileUrl}/media`;

export let updateMedia = (e) => {
    e.preventDefault();
    
    const mediaInput = document.getElementById("editMediaInput");
    const avatar = mediaInput.value.trim()
    
    const data = {
        avatar,
    }
    update(updateMediaUrl, data)
}

async function update (url, data) {
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
        const response = await fetch (url, options)
        const json = response.json()
        console.log(response.headers);
        location.reload()
    } catch (error) {
        console.log(error);
    }
}
