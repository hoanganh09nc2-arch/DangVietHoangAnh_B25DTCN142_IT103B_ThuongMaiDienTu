let users = JSON.parse(localStorage.getItem("myUsers")) || [];
// localStorage.clear();
let inputFName = document.getElementById("fmame");
let inputName = document.getElementById("name");
let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let inputConfirmPass = document.getElementById("confirm-password");
let checkbox = document.getElementById("agree");
let form = document.getElementById("form-submit")


form.addEventListener("submit", addInfor);


function addInfor(e) {
    e.preventDefault();
    if(!validateRegister()) return;
    let newUser = {
        id: users.length !== 0 ? users[users.length - 1].id + 1 : 1,
        inputFName: inputFName.value.trim(), 
        inputName: inputName.value.trim(),
        inputEmail: inputEmail.value,
        inputPassword: inputPassword.value,
        inputConfirmPass: inputConfirmPass.value,
    };

    users.push(newUser);
    localStorage.setItem("myUsers", JSON.stringify(users));
    form.reset();
}

function validateRegister() {
    let check = true;
    // FName
    if(inputFName.value.trim() === "") {
        showError(inputFName, "fname-error");
        check = false;
    } else {
        clearError(inputFName, "fname-error");
    }

    // Name
    if(inputName.value.trim() === "") {
        showError(inputName, "name-error");
        check = false;
    } else {
        clearError(inputName, "name-error");
    }

    // Email
    if(inputEmail.value.trim() === "") {
        showError(inputEmail, "email-error");
        check = false;
    } else {
        clearError(inputEmail, "email-error");
    }

    // Password
    if(inputPassword.value.length < 8) {
        showError(inputPassword, "password-error");
        check = false;
    } else {
        clearError(inputPassword, "password-error");
    }

    // Confirm password
    if(inputConfirmPass.value === "") {
        showError(inputConfirmPass, "confirm-error");
        check = false;
    } else if(inputConfirmPass.value !== inputPassword.value) {
        showError(inputConfirmPass, "confirm-error");
        document.getElementById("confirm-error").innerText = "Mật khẩu không khớp";
        check = false;
    } else {
        clearError(inputConfirmPass, "confirm-error");
    }

    // Checkbox
    if(!checkbox.checked) {
        document.getElementById("check-error").classList.add("show");
        check = false;
    } else {
        document.getElementById("check-error").classList.remove("show");
    }

    if(check) {
        setTimeout(() => {
            window.location.href = "login.html"
        }, 1800)
    }

    return check;
}
function showError(valueInput, errorId) {
    valueInput.classList.add("validate");
    let valueError = document.getElementById(errorId);
    valueError.classList.add("show")
}

function clearError(valueInput, errorId) {
    valueInput.classList.remove("validate");
    let valueError = document.getElementById(errorId);
    valueError.classList.remove("show");
}

