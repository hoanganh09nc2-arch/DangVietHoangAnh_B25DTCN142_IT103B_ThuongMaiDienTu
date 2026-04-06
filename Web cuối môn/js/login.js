let emailLogin = document.getElementById("email");
let passwordLogin = document.getElementById("password");
let loginForm = document.getElementById("login");

loginForm.addEventListener("submit", checkLogin);

function checkLogin(e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("myUsers")) || [];

    clearError(emailLogin, "emailErr");
    clearError(passwordLogin, "passwordErr");

    const email = emailLogin.value.trim();
    const password = passwordLogin.value.trim();

    let isValid = true;

    if (!email) {
        showError(emailLogin, "emailErr", "Email không được để trống");
        isValid = false;
    }

    if (!password) {
        showError(passwordLogin, "passwordErr", "Mật khẩu không được để trống");
        isValid = false;
    }

    if (!isValid) return;

    const foundUser = users.find(user => 
        user.inputEmail === email && user.inputPassword === password
    );

    if (foundUser) {
        window.location.href = "statistical-manager.html";
    } else {
        showError(emailLogin, "emailErr", "Email hoặc mật khẩu không đúng");
        showError(passwordLogin, "passwordErr", "Email hoặc mật khẩu không đúng");
    }
}

function showError(valueInput, errorId, message = "") {
    valueInput.classList.add("validate");
    let valueError = document.getElementById(errorId);
    if (message) valueError.textContent = message;
    valueError.classList.add("show");
}

function clearError(valueInput, errorId) {
    valueInput.classList.remove("validate");
    let valueError = document.getElementById(errorId);
    valueError.classList.remove("show");
}