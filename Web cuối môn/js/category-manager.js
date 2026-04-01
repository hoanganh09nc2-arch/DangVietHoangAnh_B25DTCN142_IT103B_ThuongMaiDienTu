let btnAdd = document.getElementById("modalOverlay");
let btnUp = document.getElementById("modalOverlay-up")
function renderFormAdd(){
    btnAdd.classList.add("active");
}
function closeFormAdd(){
    btnAdd.classList.remove("active");
}
function renderFormUp(){
    btnUp.classList.add("active");
}
function closeFormUp(){
    btnUp.classList.remove("active");
}