document.addEventListener('DOMContentLoaded', function() {

    let avatarTrigger = document.getElementById('avatarTrigger');
    let logoutMenu = document.getElementById('logoutMenu');
    let btnLogout = document.getElementById('btnLogout');

    // Click vào Avatar để bật/tắt Menu Log out
    avatarTrigger.addEventListener('click', function(e) {
        e.stopPropagation();        
        logoutMenu.classList.toggle('show');
    });

    // Click ra ngoài vùng avatar thì tự động đóng menu
    document.addEventListener('click', function() {
        logoutMenu.classList.remove('show');
    });

    // Xử lý logic Đăng xuất
    btnLogout.addEventListener('click', function(e) {
        e.preventDefault();
               
        let confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất không?");
                
        if (confirmLogout) {
            localStorage.removeItem('currentUser');
            window.location.href = '../pages/login.html';
        }
    });

});