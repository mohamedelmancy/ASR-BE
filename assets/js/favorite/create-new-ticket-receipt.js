setTimeout(() => {
    const select = document.getElementById("jobHistorySelect");
    const selectedOptionsContainer = document.getElementById("selectedOptions");

    select.addEventListener("change", function () {
        selectedOptionsContainer.innerHTML = "";
        Array.from(select.selectedOptions).forEach(option => {
            const tag = document.createElement("div");
            tag.classList.add("selected-option");
            tag.innerHTML = `${option.text} <span class="remove-btn" data-value="${option.value}">&times;</span>`;
            selectedOptionsContainer.appendChild(tag);
        });

        // Remove tag when clicking "×"
        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const valueToRemove = this.getAttribute("data-value");
                Array.from(select.options).forEach(opt => {
                    if (opt.value === valueToRemove) {
                        opt.selected = false;
                    }
                });
                this.parentElement.remove();
            });
        });
    });
}, 2000);
