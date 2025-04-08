setTimeout(() => {
    const savedLanguage = localStorage.getItem("appLanguage") || "en"; // Default to English
    const englishBtn = document.getElementById("english");
    const arabicBtn = document.getElementById("arabic");

    // Event Listeners for Language Buttons
    if (englishBtn && arabicBtn) {
        englishBtn.addEventListener("click", () => window.setLanguage("en"));
        arabicBtn.addEventListener("click", () => window.setLanguage("ar"));
    }

    // update UI
    if (savedLanguage === "ar") {
        arabicBtn.classList.add("active");
        englishBtn.classList.remove("active");
        englishBtn.classList.add("not_active");
    } else {
        englishBtn.classList.add("active");
        arabicBtn.classList.remove("active");
        arabicBtn.classList.add("not_active");
    }

    // toggle password icons
    $(document).on("click", "#togglePassword", function () {
        const passwordInput = $("#passwordInput");

        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");
            $(this).removeClass("fa-eye-slash").addClass("fa-eye");
        } else {
            passwordInput.attr("type", "password");
            $(this).removeClass("fa-eye").addClass("fa-eye-slash");
        }
    });

    const emailInput = document.querySelector("input[name='email']");
    const passwordInput = document.querySelector("input[name='password']");
    const loginBtn = document.querySelector(".login_btn");

    // Function to check if both fields are filled
    function validateInputs() {
        if (emailInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
            loginBtn.removeAttribute("disabled"); // Enable button
        } else {
            loginBtn.setAttribute("disabled", "true"); // Disable button
        }
    }

    // Attach event listeners to input fields
    emailInput.addEventListener("input", validateInputs);
    passwordInput.addEventListener("input", validateInputs);


    $(document).on("click", ".login_btn", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const email = document.querySelector("input[name='email']").value.trim();
        const password = document.querySelector("input[name='password']").value.trim();
        const rememberMe = document.querySelector("input[name='remember_me']").checked;

        // Call the login function
        login(email, password, rememberMe);
    });

    // Login function
    function login(email, password, rememberMe) {
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        console.log("Logging in with:", {email, password, rememberMe});

        // Example: Make an API call (Replace with your actual API)
        fetch("https://your-api.com/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password, rememberMe}),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Login successful!");
                    window.location.href = "/dashboard"; // Redirect to dashboard
                } else {
                    alert("Invalid credentials. Please try again.");
                }
            })
            .catch(error => console.error("Error:", error));
    }

}, 1000)
