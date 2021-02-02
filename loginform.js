const form = document.getElementById('form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmpasswordInput = document.getElementById('confirmpassword');

const LOGINREG = "login_reg";

function saveInput(inputarr) {
    localStorage.setItem(LOGINREG, JSON.stringify(inputarr));
}

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    const small = formControl.querySelector('small');
    small.innerText = 'Success';
}

function checkUsername(username, min, max) {

    //console.log(username.value.length);

    if (username.value.length < min) {
        showError(
            username,
            `${username.id} must be at least ${min} characters`
        );
    } else if (username.value.length > max) {
        showError(
            username,
            `${username.id} must be less than ${max} characters`
        );
    } else {
        showSuccess(username);
        return username.value;
    }
}

function checkEmail(email) {
    const reg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (reg.test(email.value.trim())) {
        showSuccess(email);
        return email.value;
    } else {
        showError(
            email,
            'Email is not valid'
        );
    }
}

function checkPassword(password, min, max) {

    //console.log(password.value.length);

    if (password.value.length < min) {
        showError(
            password,
            `${password.id} must be at least ${min} characters`
        );
    } else if (password.value.length > max) {
        showError(
            password,
            `${password.id} must be less than ${max} characters`
        );
    } else {
        showSuccess(password);
        return true;
    }
}

function checkPasswordMatch(password1, password2, passwordcheck) {
    //console.log(password2.value);
    if (password2.value === password1.value && passwordcheck) {
        showSuccess(password2);
        return password1.value;
    } else {
        showError(
            password2,
            'Password do not match'
        );
    }
}

function checkRequired(event) {
    event.preventDefault();

    const username = checkUsername(usernameInput, 3, 15);
    const email = checkEmail(emailInput);
    let passwordcheck = checkPassword(passwordInput, 6, 20);
    const password = checkPasswordMatch(passwordInput, confirmpasswordInput, passwordcheck);

    const inputarr = {
        username,
        email,
        password
    };

    saveInput(inputarr);
    //usernameInput.value = "";
    //emailInput.value = "";
    //passwordInput.value = "";
    //confirmpasswordInput.value = "";

}

function init() {
    form.addEventListener('submit', checkRequired);
}

init();