// language.js - Version unifiée et persistante corrigée

function setLanguage(lang) {
    const frElements = document.querySelectorAll('.lang-fr');
    const enElements = document.querySelectorAll('.lang-en');
    const btnFr = document.getElementById('btn-fr');
    const btnEn = document.getElementById('btn-en');

    // Réinitialise d'abord tous les boutons
    if (btnFr) btnFr.classList.remove('active');
    if (btnEn) btnEn.classList.remove('active');

    if (lang === 'en') {
        frElements.forEach(el => el.style.display = 'none');
        enElements.forEach(el => el.style.display = (el.tagName === 'P') ? 'block' : 'inline');
        if (btnEn) btnEn.classList.add('active'); // Active EN
        localStorage.setItem('preferred_lang', 'en');
    } else {
        frElements.forEach(el => el.style.display = (el.tagName === 'P') ? 'block' : 'inline');
        enElements.forEach(el => el.style.display = 'none');
        if (btnFr) btnFr.classList.add('active'); // Active FR
        localStorage.setItem('preferred_lang', 'fr');
    }
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    if (document.body.classList.contains('high-contrast')) {
        localStorage.setItem('preferred_contrast', 'enabled');
    } else {
        localStorage.setItem('preferred_contrast', 'disabled');
    }
}

function changeFontSize(direction) {
    let currentFontSize = parseInt(localStorage.getItem('preferred_font_size'), 10) || 100;
    currentFontSize += direction * 10;
    
    if (currentFontSize < 80) currentFontSize = 80;
    if (currentFontSize > 150) currentFontSize = 150;
    
    document.documentElement.style.fontSize = currentFontSize + '%';
    localStorage.setItem('preferred_font_size', currentFontSize);
}

// Restauration automatique immédiate au chargement de chaque page
document.addEventListener('DOMContentLoaded', () => {
    // 1. Restauration de la langue et de l'état des boutons
    const savedLang = localStorage.getItem('preferred_lang') || 'fr';
    setLanguage(savedLang);

    // 2. Restauration du contraste élevé
    const savedContrast = localStorage.getItem('preferred_contrast');
    if (savedContrast === 'enabled') {
        document.body.classList.add('high-contrast');
    }

    // 3. Restauration de la taille de police
    const savedFontSize = localStorage.getItem('preferred_font_size');
    if (savedFontSize) {
        document.documentElement.style.fontSize = savedFontSize + '%';
    }
	// 4. FERMETURE AUTO DU MENU ACCESSIBILITÉ SUR MOBILE
    const accessMenu = document.getElementById('accessMenu');
    if (accessMenu) {
        const accessItems = accessMenu.querySelectorAll('.access-item');
        accessItems.forEach(item => {
            item.addEventListener('click', () => {
                // Sur mobile (écran <= 992px), on cache le menu après un clic sur une option
                if (window.innerWidth <= 992) {
                    accessMenu.style.display = 'none';
                    // On retire le style inline après un court instant pour laisser le hover PC intact
                    setTimeout(() => {
                        accessMenu.style.display = '';
                    }, 300);
                }
            });
        });
    }
});