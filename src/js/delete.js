import { token } from "./api.js";

export async function deleteListing (url) {
    try {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
        await fetch (url, options);
        setTimeout(function(){window.location.href = "./auction.html"}, 2000)
    } catch (error) {
        console.log(error);
    }
}