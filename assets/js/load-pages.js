//setTimeout(() => {
//    const links = document.querySelectorAll(".nav-link");
//    const contentDiv = document.getElementById("inner_content");
//    const all_drops = document.querySelectorAll(".collapse.list-unstyled");

//    links.forEach(link => {
//        link.addEventListener("click", function (e) {
//            e.preventDefault();
//            console.log('wwww', link)
//            const parentLi = link.closest("li"); // Get the closest <li> ancestor
//            console.log('parentLi', parentLi);
//            if (parentLi) {
//                document.querySelectorAll("nav li").forEach(li => li.classList.remove("parent"));
//                parentLi.classList.add("parent"); // Add class to apply styles
//            }
//            var is_drop_down = false;
//            if (this.classList.contains('dropdown-toggle')) {
//                console.log('is drop down*************', this);
//                is_drop_down = true;
//                const nested = parentLi.querySelectorAll(".nested-nav-link");
//                console.log('nested', nested);
//                nested.forEach(nested_link => {
//                    nested_link.addEventListener("click", function (e) {
//                        // e.preventDefault();
//                        console.log('this', this);
//                        nested.forEach(l => l.classList.remove("active"));
//                        nested_link.classList.add("active");
//                        const page = nested_link.getAttribute("data-url");
//                        updateContent(nested, contentDiv, page)
//                    });
//                });
//            }
//            links.forEach(l => l.classList.remove("active"));
//            all_drops.forEach(l => l.classList.remove("show"));
//            this.classList.add("active");
//            if (!is_drop_down) {
//                const page = this.getAttribute("href");
//                updateContent(links, contentDiv, page)
//            }
//        });
//    });

//    function updateContent(links, contentDiv, page) {
//        // Load the content inside #inner_content
//        fetch(page)
//            .then(response => response.text())
//            .then(data => {
//                contentDiv.innerHTML = data;
//                window.history.pushState({page: page}, "", page);
//                console.log('page', page)
//                if (page.includes('system-store.html')) {
//                    loadScript("/assets/js/system/store.js");
//                }
//                if (page.includes('dashboard.html')) {
//                    loadScript("/assets/js/dashboard.js");
//                }
//                if (page.includes('add-new-employee.html')) {
//                    loadScript("/assets/js/favorite/add-new-employee.js");
//                }
//            })
//            .catch(error => console.error("Error loading page:", error));
//    }

//    // Function to dynamically load an external script
//    function loadScript(src) {
//        const script = document.createElement("script");
//        script.src = src;
//        script.async = true; // Ensures the script loads asynchronously
//        script.onload = () => console.log(`${src} loaded successfully.`);
//        script.onerror = () => console.error(`Failed to load script: ${src}`);
//        document.body.appendChild(script);
//    }

//    // Handle back/forward navigation
//    window.addEventListener("popstate", function (event) {
//        if (event.state && event.state.page) {
//            fetch(event.state.page)
//                .then(response => response.text())
//                .then(data => {
//                    contentDiv.innerHTML = data;
//                });
//        }
//    });
//}, 1000);
