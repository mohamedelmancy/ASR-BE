$(document).ready(async function () {
    // Apply the saved language settings
    const savedLanguage = localStorage.getItem("appLanguage") || "en"; // Default to English
    const rtlStylesheet = document.getElementById("rtlStylesheet");
    console.log('savedLanguage', savedLanguage)
    document.documentElement.setAttribute("dir", savedLanguage === 'ar' ? 'rtl' : 'ltr'); // Set document to RTL
    if (savedLanguage  === 'en' ) {
        rtlStylesheet.setAttribute("disabled", "true"); // Disable RTL styles
    } else {
        rtlStylesheet.removeAttribute("disabled"); // Enable RTL styles
    }

    // wait till the document fully rendered
    setTimeout(async () => {
        // async function loadTranslations(savedLanguage) {
        //     try {
        //         const response = await fetch(`../assets/i18n/${savedLanguage}.json`);
        //         if (!response.ok) throw new Error("Translation file not found");
        //         console.log('sss', response)
        //         return await response.json();
        //     } catch (error) {
        //         console.error("Error loading translation:", error);
        //         return {}; // Return empty object on error
        //     }
        // }

        // const translations = await loadTranslations(savedLanguage);
        // // Update text content based on translations
        // document.querySelectorAll("[data-i18n]").forEach(el => {
        //     let key = el.getAttribute("data-i18n");
        //     if (translations[key]) {
        //         el.textContent = translations[key];
        //     }
        // });

        // Update placeholders
        // document.querySelectorAll("[placeholder]").forEach(el => {
        //     let key = el.getAttribute("placeholder");
        //     if (translations[key]) {
        //         el.setAttribute("placeholder", translations[key]);
        //     }
        // });
    }, 1000)


    // Function to set language
    function setLanguage(lang) {
        localStorage.setItem("appLanguage", lang);
        if (savedLanguage === lang) return
        location.reload(); // Reload app to apply changes
    }

    window.setLanguage = setLanguage;
});
