let categories = [];
let editingId = null; 

// Phân trang
let currentPage = 1;
let PAGE_SIZE = 8;

let modalAdd = document.getElementById("modalOverlay");
let modalEdit = document.getElementById("modalOverlay-up");


let idAdd = document.querySelector("#modalOverlay .form-input");
let nameAdd = document.querySelectorAll("#modalOverlay .form-input")[1];


let idEdit = document.querySelector("#modalOverlay-up .form-input");           
let nameEdit = document.querySelectorAll("#modalOverlay-up .form-input")[1];   

let radiosAdd = document.querySelectorAll("#modalOverlay input[type='radio']");
let radiosEdit = document.querySelectorAll("#modalOverlay-up input[type='radio']");

let btnAddSubmit = document.querySelector("#modalOverlay .btn-submit");
let btnEditSubmit = document.querySelector("#modalOverlay-up .btn-submit");

let searchInput = document.querySelector(".search-input");
let filterSelect = document.querySelector(".select-filter");

// Lấy dữ liệu từ localStorage
function loadData() {
    let saved = localStorage.getItem('categories');
    if (saved) {
        categories = JSON.parse(saved);
    } else {
        categories = [
            { id: "DM001", name: "Quần áo", status: "active" },
            { id: "DM002", name: "Kính mắt", status: "inactive" },
            { id: "DM003", name: "Giày dép", status: "active" },
            { id: "DM004", name: "Thời trang nam", status: "inactive" },
            { id: "DM005", name: "Thời trang nữ", status: "inactive" },
            { id: "DM006", name: "Hoa quả", status: "inactive" },
            { id: "DM007", name: "Rau", status: "active" },
            { id: "DM008", name: "Điện thoại", status: "inactive" }
        ];
        localStorage.setItem('categories', JSON.stringify(categories));
    }
    currentPage = 1;
    renderTable(categories);
}

// Render 
function renderTable(data = categories) {
    const tbody = document.querySelector('.table tbody');
    tbody.innerHTML = '';

    let start = (currentPage - 1) * PAGE_SIZE;

    let currentData = data.slice(start, start + PAGE_SIZE);

    currentData.forEach(cat => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cat.id}</td>
            <td>${cat.name}</td>
            <td>
                <span class="badge ${cat.status === 'active' ? 'badge-active' : 'badge-inactive'}">
                    ● ${cat.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                </span>
            </td>
            <td class="actions">
                <button class="btn-delete" onclick="deleteCategory('${cat.id}')">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
                <button class="btn-edit" onclick="editCategory('${cat.id}')">
                    <i class="fa-solid fa-pencil"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    

    renderPagination(data.length);
}

// Mở modal Thêm
function showAddModal() {
    modalAdd.classList.add("active");
    idAdd.value = '';
    nameAdd.value = '';
    radiosAdd.forEach(r => r.checked = false);
    btnAddSubmit.textContent = "Thêm";
    editingId = null;
}

function closeAddModal() {
    modalAdd.classList.remove("active");
}

// Mở modal Sửa
function editCategory(id) {
    let cat = categories.find(item => item.id === id);
    if (!cat) return;

    editingId = id;

    idEdit.value = cat.id;
    nameEdit.value = cat.name;

    radiosEdit[0].checked = cat.status === "active";
    radiosEdit[1].checked = cat.status === "inactive";

    btnEditSubmit.textContent = "Cập nhật";

    modalEdit.classList.add("active");

    // Focus vào ô mã để dễ sửa
    setTimeout(() => idEdit.focus(), 100);
}

function closeEditModal() {
    modalEdit.classList.remove("active");
}

// Thêm và Cập nhật
function saveCategory() {
    let isAdding = editingId === null;

    let id = isAdding ? idAdd.value.trim() : idEdit.value.trim();
    let name = isAdding ? nameAdd.value.trim() : nameEdit.value.trim();

    let radios = isAdding ? radiosAdd : radiosEdit;
    let statusRadio = Array.from(radios).find(r => r.checked);
    let status = statusRadio && statusRadio.parentElement.textContent.trim().includes("Đang hoạt động") 
        ? "active" 
        : "inactive";

    if (!id) return alert("Mã danh mục không được để trống!");
    if (!name) return alert("Tên danh mục không được để trống!");

    if (isAdding) {
        if (categories.some(c => c.id === id)) return alert("Mã danh mục không được phép trùng!");
        if (categories.some(c => c.name === name)) return alert("Tên danh mục không được phép trùng!");

        categories.unshift({ id, name, status });
        alert("Thêm danh mục thành công!");
        closeAddModal();
    } else {
        let index = categories.findIndex(c => c.id === editingId);
        if (index === -1) return;

        if (categories.some((c, i) => i !== index && c.id === id)) 
            return alert("Mã danh mục không được phép trùng!");

        if (categories.some((c, i) => i !== index && c.name === name)) 
            return alert("Tên danh mục không được phép trùng!");

        categories[index].id = id;      // Cho phép sửa mã
        categories[index].name = name;
        categories[index].status = status;

        alert("Cập nhật danh mục thành công!");
        closeEditModal();
        editingId = null;
    }

    localStorage.setItem('categories', JSON.stringify(categories));
    currentPage = 1;
    renderTable(categories);
}

// Xóa 
function deleteCategory(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) return;

    categories = categories.filter(c => c.id !== id);
    localStorage.setItem('categories', JSON.stringify(categories));
    currentPage = 1;
    renderTable(categories);
}

// Tìm kiếm 
function handleSearchCategory() {
    currentPage = 1;
    let keyword = searchInput.value.toLowerCase().trim();
    let searched = categories.filter(cat => cat.name.toLowerCase().includes(keyword));
    renderTable(searched);
}

// Lọc
function handleFilterCategory() {
    let value = filterSelect.value;
    let filtered = categories;

    if (value === "Đang hoạt động") {
        filtered = categories.filter(c => c.status === "active");
    } else if (value === "Ngừng hoạt động") {
        filtered = categories.filter(c => c.status === "inactive");
    }

    currentPage = 1;
    renderTable(filtered);
}

// Phân trang
function renderPagination(totalItems) {
    const container = document.querySelector('.number-pages');
    container.innerHTML = '';

    const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;
    if (totalPages <= 1) return;

    

    let prevBtn = document.createElement('button');
    prevBtn.className = `page-btn ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
    prevBtn.onclick = () => goToPage(currentPage - 1, totalItems);
    container.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        let btn = document.createElement('button');
        btn.className = `page-btn ${i === currentPage ? 'page-btn-active' : ''}`;
        btn.textContent = i;
        btn.onclick = () => goToPage(i, totalItems);
        container.appendChild(btn);
    }

    let nextBtn = document.createElement('button');
    nextBtn.className = `page-btn ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
    nextBtn.onclick = () => goToPage(currentPage + 2, totalItems);
    container.appendChild(nextBtn);


}

function goToPage(page, totalItems) {
    const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTable();
}

// Khởi tạo sự kiện
document.addEventListener('DOMContentLoaded', () => {
    btnAddSubmit.addEventListener('click', saveCategory);
    btnEditSubmit.addEventListener('click', saveCategory);

    searchInput.addEventListener("input", handleSearchCategory);
    filterSelect.addEventListener("change", handleFilterCategory);

    loadData();
});