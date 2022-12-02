import { registerUrl } from "./api.js";

const nameInput = document.querySelector("input#name");
const emailInput = document.querySelector("input#email");
const passwordInput = document.querySelector("input#password");
const repeatPasswordInput = document.querySelector("input#repeatPassword");
const registerButton = document.querySelector("input#submit");

const API_ERROR = document.getElementById("API_ERROR")
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const repeatPasswordError = document.querySelector("#repeatPasswordError");

let formIsValid = false;

let validateForm = (e) => {
    e.preventDefault();

    let validName = false;
    let validEmail = false;
    let validPassword = false;

    const name = nameInput.value.trim().toLowerCase();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();
    const repeatPassword = repeatPasswordInput.value.trim();

    const userToRegister = {
        name,
        email,
        password,
    }

    const nameRegex = /^[a-z0-9_]{3,16}$/; //https://www.technicalbikash.com/2021/08/regex-for-username-validation.html

    if (name !== "") {
        if (nameRegex.test(name)) {
            validName = true;
            nameError.innerHTML = "&nbsp;";
        } else {
            nameError.innerHTML = "* The name value must not contain punctuation symbols apart from underscore (_)"
        }
    } else {
        nameError.innerHTML = "* Please fill in username"
    }

    if (email !== ""){
        if (email.includes("@stud.noroff.no") || email.includes("@noroff.no")) {
            validEmail = true;
            emailError.innerHTML = "&nbsp;"
        } else {
            emailError.innerHTML = "* The email value must be a valid stud.noroff.no or noroff.no email address";
        } 
    } else {
        emailError.innerHTML = "* Please fill in email"
    }

    if (password.length >= 8) {
        passwordError.innerHTML = "&nbsp;";
        if (repeatPassword === password) {
            repeatPasswordError.innerHTML = "&nbsp;";
            validPassword = true;
        } else {
            repeatPasswordError.innerHTML = "* Passwords do not match";
        }
    } else {
        passwordError.innerHTML = "* Password must be longer than 8 characters";
    }

    if (validName && validEmail && validPassword) {
        formIsValid = true;
        registerUser(registerUrl, userToRegister)
    }
}

registerButton.addEventListener("click", validateForm)

async function registerUser(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }
        const response = await fetch(url, postData);
        const data = await response.json();
        console.log(data);
        if (data.statusCode == 400) {
            API_ERROR.innerHTML = `<a href="../../login.html">Profile already exists. Log in instead</a>`
        } 
        if (response.ok == true) { window.location.href = "../../login.html"; }
    } catch (error) {
        console.log(error);
    }
}