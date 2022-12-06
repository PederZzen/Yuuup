import { token } from "./api.js"
import { username } from "./api.js"

let navElement;
let sellLink = "./login.html";
let profileLink = "./login.html";

if (token) {
    navElement = `            
    <a href="./profile.html" class="text-gray">${username}</a>
    <a href="/" class="bg-secondary font-bold text-main px-2 py-1 rounded" id="logOutBtn">Logout</a>
    `
    sellLink = "./sell.html";
    profileLink = "./profile.html";
} else {
    navElement = `            
    <a href="./login.html" class="hover:text-gray">Login</a>
    <a href="./register.html" class="bg-secondary font-bold text-main px-2 py-1 rounded">Register</a>
    `
}



export const navbar = document.getElementById("navbar").innerHTML = `
<section class="bg-main">
    <div class="flex justify-between max-w-7xl mx-auto md:px-8 p-2 text-secondary font-montserrat">
        <div class="flex gap-3 items-center">
            <div>
                <a class="font-bold text-xl" href="./index.html">Yup!</a>
            </div>
            <div class="hidden md:flex">
                <button class="bg-secondary p-1 rounded-l">
                    <svg width="22" height="22" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.4654 2.79779e-05C22.4544 2.76287e-05 28.9308 6.47641 28.9308 14.4654C28.9308 22.4545 22.4544 28.9308 14.4654 28.9308C6.47638 28.9308 -2.83092e-07 22.4545 -6.32303e-07 14.4654C-9.81514e-07 6.47641 6.47638 2.83271e-05 14.4654 2.79779e-05ZM14.4654 22.8464C19.0941 22.8464 22.8464 19.0941 22.8464 14.4654C22.8464 9.83676 19.0941 6.08448 14.4654 6.08448C9.83674 6.08448 6.08445 9.83676 6.08445 14.4654C6.08446 19.0941 9.83674 22.8464 14.4654 22.8464Z" fill="#373737"/>
                        <path d="M19.0082 23.6578L24.7896 17.8764L32.1275 25.2143C33.724 26.8108 33.724 29.3992 32.1275 30.9957V30.9957C30.531 32.5922 27.9426 32.5922 26.3461 30.9957L19.0082 23.6578Z" fill="#373737"/>
                    </svg>                      
                </button>
                <input class="bg-secondary rounded-r" type="text" placeholder="Search for seller or item..">
            </div>
            <div class="hidden md:flex gap-2">
                <a href="./auction.html" class="hover:text-gray">Auction</a>
                <a href="${sellLink}" class="hover:text-gray">Sell</a>
                <a href="${profileLink}" class="hover:text-gray">Profile</a>
            </div>
        </div>
        <div class="hidden md:flex items-center gap-2">
            ${navElement}
        </div>
        <div class="block md:hidden">
            <button>
                <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="7" width="32" height="5" rx="2.5" fill="#F5F5F5"/>
                    <rect y="15" width="17" height="5" rx="2.5" fill="#F5F5F5"/>
                    <rect x="15" width="17" height="5" rx="2.5" fill="#F5F5F5"/>
                </svg>  
            </button>
        </div>
    </div>
</section>
`

if (token) {
    const logOutButton = document.getElementById("logOutBtn");
    
    logOutButton.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "/"
    })
}