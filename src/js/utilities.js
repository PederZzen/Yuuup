export const navbar = document.getElementById("navbar").innerHTML = `
<div class="bg-main fixed w-full top-0">
    <div class="max-w-7xl mx-auto block px-2 md:px-8 items-center font-medium text-secondary py-4 font-montserrat">
        <div class="flex justify-between">
            <div class="flex items-center space-x-5">
                <div>
                    <a href="./index.html" class="font-bold text-lg">Yup!</a>
                </div>
                <div class="space-x-2 hidden md:flex">
                    <a href="./auction.html" class="hover:text-gray">Auction</a>
                    <a href="./sell.html" class="hover:text-gray">Sell</a>
                    <a href="/profile.html" class="hover:text-gray">Profile</a>
                </div>
            </div>
            <div class="space-x-3 items-center hidden md:flex">
                <a href="./login.html" class="hover:text-gray">Login</a>
                <a href="./register.html" class="bg-secondary font-bold text-main px-2 py-1 rounded">Register</a>
            </div>
            <div class="md:hidden flex items-center">
                <button>
                    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="7" width="32" height="5" rx="2.5" fill="#F5F5F5"/>
                        <rect y="15" width="17" height="5" rx="2.5" fill="#F5F5F5"/>
                        <rect x="15" width="17" height="5" rx="2.5" fill="#F5F5F5"/>
                    </svg>                        
                </button>
            </div>
        </div>
    </div>
</div>
`

