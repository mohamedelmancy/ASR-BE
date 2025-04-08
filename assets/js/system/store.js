setTimeout(() => {
    function loadContent(url, targetElementId) {
        console.log('targetElementId', targetElementId)
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error loading ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                // console.log('html', html)
                document.getElementById(targetElementId).innerHTML = html;
            })
            .catch(error => console.error("Fetch Error:", error));
    }

    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

    loadContent("/pages/system/store/system-store-settings.html", "store-content");
    setTimeout(() => {
        document.getElementById('settings-setup').addEventListener("click", function () {
            const store_type_dropdown = document.querySelector('.store_type_dropdown');
            if (store_type_dropdown) {
                store_type_dropdown.style.display = 'none'; // Hides the element
            }
            console.log('ddddd')
            loadContent("/pages/system/store/system-store-setup.html", "store-content");
            setTimeout(() => {
                console.log('backkkkk')
                document.getElementById('back').addEventListener("click", function () {
                    loadContent("/pages/system/store/system-store-settings.html", "store-content");
                    store_type_dropdown.style.display = 'block'; // Hides the element
                });
            }, 1000)
        });
    }, 1000)
    document.querySelector("#type").addEventListener("change", function () {
        console.log('change')
        const selectedValue = this.value; // Get selected value
        if (selectedValue === "settings") {
            console.log("Loading Settings Page...");
            loadContent("/pages/system/store/system-store-settings.html", "store-content");
            setTimeout(() => {
                document.getElementById('settings-setup').addEventListener("click", function () {
                    console.log('ddddd')
                    const store_type_dropdown = document.querySelector('.store_type_dropdown');
                    if (store_type_dropdown) {
                        store_type_dropdown.style.display = 'none'; // Hides the element
                    }
                    loadContent("/pages/system/store/system-store-setup.html", "store-content");
                    setTimeout(() => {
                        console.log('backkkkk')
                        document.getElementById('back').addEventListener("click", function () {
                            loadContent("/pages/system/store/system-store-settings.html", "store-content");
                            store_type_dropdown.style.display = 'block'; // Hides the element
                        });
                    }, 1000)
                });
            }, 1000)
        } else if (selectedValue === "operations") {
            console.log("Loading Operations Page...");
            loadContent("/pages/system/store/system-store-operations.html", "store-content");
            setTimeout(() => {
                document.getElementById('operation-add-order').addEventListener("click", function () {
                    console.log('ddddd')
                    const store_type_dropdown = document.querySelector('.store_type_dropdown');
                    if (store_type_dropdown) {
                        store_type_dropdown.style.display = 'none'; // Hides the element
                    }
                    loadContent("/pages/system/store/add-order-store-operations.html", "store-content");
                });
            }, 1000)
        }
    });
}, 1000)
