const form = document.getElementById('form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmpasswordInput = document.getElementById('confirmpassword');


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control-error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control-success';
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
        return true;

        //saveInput(input);
    }
}

function checkEmail(email) {
    const reg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (reg.test(email.value.trim())) {
        showSuccess(email);
        return true;
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

        //saveInput(input);
    }
}

function checkPasswordMatch(password1, password2, passwordcheck) {
    //console.log(password2.value);
    if (password2.value === password1.value && passwordcheck) {
        showSuccess(password2);
    } else {
        showError(
            password2,
            'Password do not match'
        );
    }
}

function checkRequired(event) {
    event.preventDefault();

    checkUsername(usernameInput, 3, 15);
    checkEmail(emailInput);
    let passwordcheck = checkPassword(passwordInput, 6, 20);
    checkPasswordMatch(passwordInput, confirmpasswordInput, passwordcheck);
}

function init() {
    form.addEventListener('submit', checkRequired);
}

init();