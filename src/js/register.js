import { registerUrl } from "./endpoints.js";

const form = document.getElementById("registerForm");
const nameInput = document.querySelector("input#name");
const emailInput = document.querySelector("input#email");
const passwordInput = document.querySelector("input#password");
const repeatPasswordInput = document.querySelector("input#repeatPassword");
const registerButton = document.querySelector("input#submit");

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
    const password = passwordInput.value.trim().toLowerCase();
    const repeatPassword = repeatPasswordInput.value.trim().toLowerCase();

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

    if (validName) {
        formIsValid = true;
    }
}

registerButton.addEventListener("click", validateForm)