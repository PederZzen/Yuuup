import { loginUrl } from "./api.js";

const emailInput = document.querySelector("input#email");
const passwordInput = document.querySelector("input#password");
const loginButton = document.querySelector("input#submit");

const API_ERROR = document.getElementById("API_ERROR")

let loginUser = (e) => {
    e.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim()

    const userToLogin = {
        email,
        password
    }

    login(loginUrl, userToLogin)
}

loginButton.addEventListener("click", loginUser)

async function login(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }
        const response = await fetch(url, postData);
        const json = await response.json();
        const accessToken = json.accessToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("username", json.name)
        localStorage.setItem("credits", json.credits)
        if (response.ok == true) { 
            window.location.href = "../../index.html"; 
        } else { 
            API_ERROR.innerHTML = json.status;
        }
    } catch (error) {
        console.log(error);
    }
}