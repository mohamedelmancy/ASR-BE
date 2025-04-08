setTimeout(() => {
    $("#footer").load("pages/layout/footer.html");
    const dashboard = document.getElementById("dashboard");
    dashboard?.click();
    const sidebar = document.getElementById("sidebar");
    const content = document.querySelector(".content");
    const kse_logo = document.querySelector(".kse-logo");
    const toggleSidebar = document.getElementById("toggleSidebar");
    const englishBtn = document.getElementById("en");
    const arabicBtn = document.getElementById("ar");

    toggleSidebar.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
        content.classList.toggle("expanded");
        // Change logo source based on sidebar state
        if (sidebar.classList.contains("collapsed")) {
            kse_logo.src = "../assets/images/small-h-logo.png";  // Small logo
        } else {
            kse_logo.src = "../assets/images/h-logo.png";  // Full logo
        }
    });


    console.log('englishBtn*********************', englishBtn)
    // Event Listeners for Language Buttons
    if (englishBtn && arabicBtn) {
        englishBtn.addEventListener("click", () => window.setLanguage("en"));
        arabicBtn.addEventListener("click", () => window.setLanguage("ar"));
    }

    // update ui
    const language = localStorage.getItem('appLanguage');
    if (language === 'en') {
        englishBtn.classList.add('active')
        arabicBtn.classList.remove('active')
    } else {
        arabicBtn.classList.add('active')
        englishBtn.classList.remove('active')
    }


}, 1000000)
