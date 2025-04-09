setTimeout(() => {
    const links = document.querySelectorAll(".nav-link");
    const contentDiv = document.getElementById("inner_content");
    const all_drops = document.querySelectorAll(".collapse.list-unstyled");
    const all_labels = document.querySelectorAll(".nested-nav-link label");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            console.log('wwww', link)
            const parentLi = link.closest("li"); // Get the closest <li> ancestor
            console.log('parentLi', parentLi);
            if (parentLi) {
                document.querySelectorAll("nav li").forEach(li => li.classList.remove("parent"));
                parentLi.classList.add("parent"); // Add class to apply styles
            }
            var is_drop_down = false;
            if (this.classList.contains('dropdown-toggle')) {
                console.log('is drop down*************', this);
                is_drop_down = true;
                const nested = parentLi.querySelectorAll(".nested-nav-link");
                console.log('nested', nested);
                nested.forEach(nested_link => {
                    nested_link.addEventListener("click", function (e) {
                        // e.preventDefault();
                        console.log('nested_link', this);
                        nested.forEach(l => l.classList.remove("active"));
                        nested_link.classList.add("active");
                        const page = nested_link.getAttribute("href");
                        window.location.href = page;
                        // updateContent(nested, contentDiv, page)
                    });
                });
            }
            links.forEach(l => l.classList.remove("active"));
            all_drops.forEach(l => l.classList.remove("show"));
            this.classList.add("active");
            if (!is_drop_down) {
                console.log('not drop down')
                const page = this.getAttribute("href");
                window.location.href = page;
                // updateContent(links, contentDiv, page)
            }
        });
    });

    function updateContent(links, contentDiv, page) {
        // Load the content inside #inner_content
        fetch(page)
            .then(response => response.text())
            .then(data => {
                contentDiv.innerHTML = data;
                window.history.pushState({page: page}, "", page);
                console.log('page', page)
                if (page.includes('system-store.html')) {
                    loadScript("/assets/js/system/store.js");
                }
                if (page.includes('dashboard.html')) {
                    loadScript("/assets/js/dashboard.js");
                }
                if (page.includes('add-new-employee.html')) {
                    loadScript("/assets/js/favorite/add-new-employee.js");
                }
            })
            .catch(error => console.error("Error loading page:", error));
    }

    // Function to dynamically load an external script
    function loadScript(src) {
        const script = document.createElement("script");
        script.src = src;
        script.async = true; // Ensures the script loads asynchronously
        script.onload = () => console.log(`${src} loaded successfully.`);
        script.onerror = () => console.error(`Failed to load script: ${src}`);
        document.body.appendChild(script);
    }

    // Handle back/forward navigation
    window.addEventListener("popstate", function (event) {
        if (event.state && event.state.page) {
            fetch(event.state.page)
                .then(response => response.text())
                .then(data => {
                    contentDiv.innerHTML = data;
                });
        }
    });


    // open the opened href in the side nav
    var is_nested = true;
    const current_path = window.location.pathname.split('/').pop();
    console.log('current_path', current_path);
    links.forEach(l => l.classList.remove("active"));
    links.forEach(link => {
        const page = link.getAttribute("href").split('/').pop();
        if (page && current_path === page) {
            link.classList.add("active");
            is_nested = false;
        }
    });
    if (is_nested) {
        const nested = document.querySelectorAll(".nested-nav-link");
        nested.forEach(l => l.classList.remove("active"));
        document.querySelectorAll("nav li").forEach(li => li.classList.remove("parent"));
        nested.forEach(nested_link => {
            const page = nested_link.getAttribute("href").split('/').pop();
            console.log('nested_link page', page);

            if (page && current_path === page) {
                console.log('nested_link opening', nested_link);
                nested_link.classList.add("active");
                const parentLi = nested_link.closest("ul");
                const top_parent = parentLi.closest("li");
                console.log('top_parent', top_parent);
                if (top_parent) {
                    top_parent.classList.add("parent");
                    const parent_dropdown = top_parent.querySelector(".dropdown-toggle");
                    const parent_list = top_parent.querySelector(".list-unstyled");
                    parent_dropdown.classList.add("active");
                    parent_list.classList.add("show");
                    const radio_label = nested_link.querySelector("label");
                    radio_label.click()
                }
            }
        });
    }
    all_labels.forEach(label => {
        label.addEventListener("click", function (e) {
            const parentA = label.closest("a"); // Get the closest <a> ancestor
            console.log('**********************************************')
            parentA.click();
        });
    })
}, 1000);
