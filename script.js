document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MULTI-PAGE (TAB) TIZIMI
    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".page-section");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            // Aktiv navbar elementini o'zgartirish
            document.querySelector(".nav-item.active").classList.remove("active");
            item.classList.add("active");

            // Sahifani o'zgartirish
            const targetPage = item.getAttribute("data-target");
            sections.forEach(section => {
                section.classList.remove("active");
                if(section.id === targetPage) {
                    section.classList.add("active");
                    // Agar skills sahifasiga o'tsa, progress barlarni tozalab turadi (qayta bosish uchun)
                    if(targetPage === 'skills') { resetSkills(); }
                }
            });
        });
    });

    // 2. SKILLS INTERAKTIV FOIZ TO'LISH TIZIMI
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const percent = card.getAttribute('data-percent');
            const progressBar = card.querySelector('.progress-bar span');
            const percentText = card.querySelector('.skill-percentage');
            
            // Chiziq kengligini o'rnatish
            progressBar.style.width = `${percent}%`;
            
            // Raqamlarni 0 dan o'sha foizgacha o'stirib chiqarish animatsiyasi
            let currentPercent = 0;
            const interval = setInterval(() => {
                if (currentPercent >= percent) {
                    clearInterval(interval);
                } else {
                    currentPercent++;
                    percentText.innerText = `${currentPercent}%`;
                }
            }, 12); // Tezlik darajasi
        });
    });

    function resetSkills() {
        document.querySelectorAll('.progress-bar span').forEach(el => el.style.width = '0%');
        document.querySelectorAll('.skill-percentage').forEach(el => el.innerText = '0%');
    }
});

// Tugmalar orqali sahifa almashtirish funksiyasi (Hero qismidagi tugmalar uchun)
function switchPage(pageId) {
    const triggerMenu = document.querySelector(`[data-target="${pageId}"]`);
    if(triggerMenu) triggerMenu.click();
}
