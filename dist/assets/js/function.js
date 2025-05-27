// Toggle dropdown visibility
function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('hidden');
}
// Toggle dropdown visibility
function toggleDropdown2() {
    const menu = document.getElementById('dropdownMenu2');
    menu.classList.toggle('hidden');
}
// Toggle dropdown visibility
function toggleDropdownNavbar() {
    const menu = document.getElementById('dropdownMenuNavbar');
    menu.classList.toggle('hidden');
}

document.getElementById('dropdownButton').addEventListener('click', toggleDropdown);
document.getElementById('dropdownButton2').addEventListener('click', toggleDropdown2);
document.getElementById('dropdownButtonNavbar').addEventListener('click', toggleDropdownNavbar);


function showPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// To open popups on click
document.querySelector('.material-icons.add_circle').onclick = function () {
    showPopup('reminderPopup');
};

document.querySelector('.notifications').onclick = function () {
    const popup = document.getElementById('notificationsPopup');
    popup.classList.toggle('hidden');
};

document.addEventListener('click', function (event) {
    const popup = document.getElementById('notificationsPopup');
    const notificationIcon = document.querySelector('.notifications');

    if (!popup.contains(event.target) && !notificationIcon.contains(event.target)) {
        popup.classList.add('hidden');
    }
});


function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.querySelector('div').classList.remove('translate-y-[-100%]');
    }, 10);
}


function closeModal(event) {
    const modal = event.currentTarget.closest('.modal');
    modal.classList.add('opacity-0');
    modal.querySelector('div').classList.add('translate-y-[-100%]');

    document.querySelectorAll('input, textarea').forEach(element => {
        element.value = null;
    });


    setTimeout(() => {
        modal.classList.remove('opacity-100');
        modal.querySelector('div').classList.remove('-translate-y-full');
        modal.classList.add('hidden');
    }, 300);
}

document.querySelectorAll('.open-modal-button').forEach(button => {
    button.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal-id');
        openModal(modalId);
    });
});

document.querySelectorAll('.close-modal-button').forEach(button => {
    button.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal-id');
        closeModal(modalId);
    });
});
