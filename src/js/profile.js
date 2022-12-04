import { API_BASE_URL } from "./api.js";
import { username } from "./api.js";
import { token } from "./api.js";

const profileUrl = `${API_BASE_URL}/profiles/${username}?_listings=true`;
const hero = document.querySelector("#hero");
const listings = document.querySelector("#listings");
const wins = document.querySelector("#wins");
const profileImage = "../../img/ProfileImage.png"

let listProfile = (profile) => {
    document.title = `Yup | ${profile.name}`

    let heroOutput = `
    <section class="bg-main">
        <div class="flex gap-4 font-montserrat py-4 max-w-7xl mx-auto px-2 md:px-8">
            <img src="${profile.avatar == null ? profileImage : profile.avatar }" style="width: 20rem; border-radius: 50%; height: 20rem; object-fit: cover;"alt="">
            <div class="flex flex-col justify-center gap-2">
                <h1 class="text-secondary text-2xl font-bold">${profile.name}</h1>
                <h2 class="text-gray">${profile.email}</h2>
            </div>
        </div>
    </section>
        `
    hero.innerHTML = heroOutput;

    for (let item of profile.listings) {
        let newItem = `
        <div>
        ${item.title}
        </div>
        `
        return newItem
    }

    console.log(newItem);

    let listingsOutput = `
    <section>
        <div class="py-4 font-montserrat max-w-7xl mx-auto px-2 md:px-8">
            <h2 class="font-bold text-xl text-gray">Active Listings</h2>
            <a>
                <div>
                </div>
            </a>
        <div>
        </div>
    </section>
    `;

    listings.innerHTML = listingsOutput;

    let winsOutput = `
    <section>
        <div class="py-4 max-w-7xl mx-auto px-2 md:px-8">
            <h2>Collection</h2>
            <a>
                <div>
                </div>
            </a>
        <div>
        </div>
    </section>
    `;

    wins.innerHTML = winsOutput;
    
}

fetch (profileUrl, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
})
 .then((response) => response.json())
 .then((profile) => {
    console.log(profile);
    listProfile(profile)
 })
 .catch((error) => {
    console.log(error);
 })
