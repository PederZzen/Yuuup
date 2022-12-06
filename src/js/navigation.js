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

// export const navbar = document.getElementById("navbar").innerHTML = `
// <section class="bg-main">
//     <div class="flex justify-between max-w-7xl mx-auto md:px-8 p-2 text-secondary font-montserrat">
//         <div class="flex gap-3 items-center">
//             <div>
//                 <a class="font-bold text-xl" href="./index.html">Yup!</a>
//             </div>
//             <div class="hidden md:flex gap-2">
//                 <a href="./auction.html" class="hover:text-gray">Auction</a>
//                 <a href="${sellLink}" class="hover:text-gray">Sell</a>
//                 <a href="${profileLink}" class="hover:text-gray">Profile</a>
//             </div>
//         </div>
//         <div class="hidden md:flex items-center gap-2">
//             ${navElement}
//         </div>
//         <div class="block md:hidden">
//             <button>
//                 <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <rect y="7" width="32" height="5" rx="2.5" fill="#F5F5F5"/>
//                     <rect y="15" width="17" height="5" rx="2.5" fill="#F5F5F5"/>
//                     <rect x="15" width="17" height="5" rx="2.5" fill="#F5F5F5"/>
//                 </svg>  
//             </button>
//         </div>
//     </div>
// </section>
// `
export const navbar = document.getElementById("navbar").innerHTML = `
<section class="bg-main">
    <div class="max-w-7xl mx-auto md:px-8 p-2 text-secondary font-montserrat">
        <div class="flex justify-between gap-3 ">
            <div>
                <a class="font-bold text-xl" href="./index.html">Yup!</a>
            </div>
            <div class="block">
                <button>
                    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="7" width="32" height="5" rx="2.5" fill="#F5F5F5"/>
                        <rect y="15" width="17" height="5" rx="2.5" fill="#F5F5F5"/>
                        <rect x="15" width="17" height="5" rx="2.5" fill="#F5F5F5"/>
                    </svg>  
                </button>
            </div>
        </div>
        <div class="flex items-center flex-col gap-4 mt-20">
            <a href="./auction.html" class="hover:text-gray">Auction</a>
            <a href="${sellLink}" class="hover:text-gray">Sell</a>
            <a href="${profileLink}" class="hover:text-gray">Profile</a>
        </div>
        <div class="flex mt-20 justify-center items-center gap-2">
            ${navElement}
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