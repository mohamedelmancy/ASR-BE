setTimeout(() => {
    console.log('zzzzzzzzzzz')
    window.toggleDropdown = toggleDropdown;
    window.submit = submit;
    window.removeTag = removeTag;

    function submit(form, event) {
        event.preventDefault();
        console.log('form', form)
    }

    function toggleDropdown() {
        document.querySelector(".dropdown_history").style.display =
            document.querySelector(".dropdown_history").style.display === "block" ? "none" : "block";
    }

    document.querySelectorAll(".dropdown_history input").forEach(input => {
        input.addEventListener("change", function () {
            console.log('inputt', input)
            let selectedDiv = document.querySelector(".selected-items");
            let existingTags = document.querySelectorAll(".tag");

            if (this.checked) {
                let tag = document.createElement("div");
                tag.className = "tag";
                tag.innerHTML = `${this.value} <img src="../../assets/images/iconoir_cancel.svg" onclick="removeTag(this, '${this.value}')">`;
                selectedDiv.appendChild(tag);
            } else {
                existingTags.forEach(tag => {
                    if (tag.textContent.includes(this.value)) {
                        tag.remove();
                    }
                });
            }
        });
    });

    function removeTag(element, value) {
        element.parentElement.remove();
        document.querySelectorAll(".dropdown_history input").forEach(input => {
            if (input.value === value) {
                input.checked = false;
            }
        });
    }

    document.addEventListener("click", function (e) {
        if (!document.querySelector(".multi-select").contains(e.target)) {
            document.querySelector(".dropdown_history").style.display = "none";
        }
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // normal select dropdown with search
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    document.querySelectorAll("select.input-select").forEach(originalSelect => {
        // Hide original select
        originalSelect.classList.add("hidden-select");

        // Create custom wrapper
        const wrapper = document.createElement("div");
        wrapper.classList.add("searchable-select");

        // Create input
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = originalSelect.options[originalSelect.selectedIndex]?.text || "Select...";

        // Create options container
        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("searchable-options");

        // Fill options
        Array.from(originalSelect.options).forEach((option, index) => {
            const optDiv = document.createElement("div");
            optDiv.textContent = option.text;
            optDiv.dataset.value = option.value;

            // First option acts as placeholder — don't add it to dropdown
            if (index === 0) {
                input.placeholder = option.text;
                return; // skip adding to custom dropdown
            }

            optionsDiv.appendChild(optDiv);
        });

        // Events
        input.addEventListener("click", () => {
            optionsDiv.style.display = optionsDiv.style.display === "block" ? "none" : "block";
            input.removeAttribute("readonly");
            input.focus();
        });

        input.addEventListener("input", () => {
            const filter = input.value.toLowerCase();
            optionsDiv.querySelectorAll("div").forEach(opt => {
                opt.style.display = opt.textContent.toLowerCase().includes(filter) ? "block" : "none";
            });
        });

        optionsDiv.addEventListener("click", (e) => {
            if (e.target.dataset.value !== undefined) {
                input.value = e.target.textContent;
                originalSelect.value = e.target.dataset.value;
                optionsDiv.style.display = "none";
                input.setAttribute("readonly", true);
            }
        });

        // Close on outside click
        document.addEventListener("click", (e) => {
            if (!wrapper.contains(e.target)) {
                optionsDiv.style.display = "none";
                input.setAttribute("readonly", true);
            }
        });

        // Assemble DOM
        wrapper.appendChild(input);
        wrapper.appendChild(optionsDiv);
        originalSelect.parentNode.insertBefore(wrapper, originalSelect);
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // multiple select dropdown with search
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    document.querySelectorAll("select.multi-select").forEach(originalSelect => {
        originalSelect.classList.add("hidden-select");

        const wrapper = document.createElement("div");
        wrapper.className = "multi-select-wrapper";

        const input = document.createElement("div");
        input.className = "multi-select-input";
        input.textContent = "Select...";

        const dropdown = document.createElement("div");
        dropdown.className = "multi-select-dropdown";

        const search = document.createElement("input");
        search.type = "text";
        search.placeholder = "Search...";
        search.className = "multi-select-search";
        dropdown.appendChild(search);

        const selectedValues = new Set();

        // Build options (skip first placeholder)
        Array.from(originalSelect.options).forEach((option, index) => {
            if (index === 0) {
                if (originalSelect.selectedIndex === 0) {
                    input.textContent = option.text;
                    input.style.opacity = "0.4";
                }
                return;
            }

            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = option.value;

            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    selectedValues.add(checkbox.value);
                } else {
                    selectedValues.delete(checkbox.value);
                }

                // Update original <select>
                Array.from(originalSelect.options).forEach(opt => {
                    opt.selected = selectedValues.has(opt.value);
                });

                // Update display text
                if (selectedValues.size > 0) {
                    input.textContent = Array.from(selectedValues).map(value => {
                        const option = originalSelect.querySelector(`option[value='${value}']`);
                        return option ? option.text : value;
                    }).join(", ");
                    input.style.opacity = "1"; // set full opacity when something is selected
                } else {
                    input.textContent = originalSelect.options[0].text;
                    input.style.opacity = "0.4"; // back to faded when nothing is selected
                }

            });

            label.appendChild(checkbox);
            label.append(" " + option.text);
            dropdown.appendChild(label);
        });

        input.addEventListener("click", () => {
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
            search.focus();
        });

        search.addEventListener("input", () => {
            const term = search.value.toLowerCase();
            dropdown.querySelectorAll("label").forEach(label => {
                const text = label.textContent.toLowerCase();
                label.style.display = text.includes(term) ? "flex" : "none";
            });
        });

        document.addEventListener("click", (e) => {
            if (!wrapper.contains(e.target)) {
                dropdown.style.display = "none";
            }
        });

        wrapper.appendChild(input);
        wrapper.appendChild(dropdown);
        originalSelect.parentNode.insertBefore(wrapper, originalSelect);
    });


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // radio select dropdown with search
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    document.querySelectorAll("select.radio-select").forEach(originalSelect => {
        originalSelect.classList.add("hidden-select");

        const wrapper = document.createElement("div");
        wrapper.className = "radio-select-wrapper";

        const input = document.createElement("div");
        input.className = "radio-select-input";
        input.textContent = "Select...";

        const dropdown = document.createElement("div");
        dropdown.className = "radio-select-dropdown";

        const search = document.createElement("input");
        search.type = "text";
        search.placeholder = "Search...";
        search.className = "radio-select-search";
        dropdown.appendChild(search);

        const name = `radio_${Math.random().toString(36).substr(2, 9)}`;

        Array.from(originalSelect.options).forEach((option, index) => {
            if (index === 0) {
                if (originalSelect.selectedIndex === 0) {
                    input.textContent = option.text;
                    input.style.opacity = "0.4";
                }
                return;
            }

            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = name;
            radio.value = option.value;

            radio.addEventListener("change", () => {
                if (radio.checked) {
                    originalSelect.value = radio.value;
                    input.textContent = option.text;
                    input.style.opacity = "1";
                    dropdown.style.display = "none";
                }
            });

            label.appendChild(radio);
            label.append(" " + option.text);
            dropdown.appendChild(label);
        });

        input.addEventListener("click", () => {
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
            search.focus();
        });

        search.addEventListener("input", () => {
            const term = search.value.toLowerCase();
            dropdown.querySelectorAll("label").forEach(label => {
                const text = label.textContent.toLowerCase();
                label.style.display = text.includes(term) ? "flex" : "none";
            });
        });

        document.addEventListener("click", (e) => {
            if (!wrapper.contains(e.target)) {
                dropdown.style.display = "none";
            }
        });

        wrapper.appendChild(input);
        wrapper.appendChild(dropdown);
        originalSelect.parentNode.insertBefore(wrapper, originalSelect);
    });
}, 1000);
