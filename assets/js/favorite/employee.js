setTimeout(() => {
    const all_employee = document.getElementById("all_employee");
    const engineering = document.getElementById("engineering");
    const design = document.getElementById("design");
    const marketing = document.getElementById("marketing");
    const allEmployeeSvg = document.querySelector("#all_employee object"); // Select the <object> inside the filter item
    const designSvg = document.querySelector("#design object"); // Select the <object> inside the filter item
    const engineeringSvg = document.querySelector("#engineering object"); // Select the <object> inside the filter item
    const marketingSvg = document.querySelector("#marketing object"); // Select the <object> inside the filter item

    all_employee.addEventListener("click", function () {
        this.classList.toggle("active");
        const svgDocument = allEmployeeSvg.contentDocument; // Get the embedded SVG document
        const pathElement = svgDocument.querySelector("path"); // Select the <path> inside the SVG
        if (pathElement) {
            pathElement.setAttribute("fill", "#1B3664"); // Change the fill color
        }
    });
    engineering.addEventListener("click", function () {
        const svgDocument = engineeringSvg.contentDocument; // Get the embedded SVG document
        const pathElement = svgDocument.querySelector("path"); // Select the <path> inside the SVG
        if (pathElement) {
            pathElement.setAttribute("fill", "#1B3664"); // Change the fill color
        }
        this.classList.toggle("active");
    });
    design.addEventListener("click", function () {
        const svgDocument = designSvg.contentDocument; // Get the embedded SVG document
        const pathElement = svgDocument.querySelector("path"); // Select the <path> inside the SVG
        if (pathElement) {
            pathElement.setAttribute("fill", "#1B3664"); // Change the fill color
        }
        this.classList.toggle("active");
    });
    marketing.addEventListener("click", function () {
        const svgDocument = marketingSvg.contentDocument; // Get the embedded SVG document
        const pathElement = svgDocument.querySelector("path"); // Select the <path> inside the SVG
        if (pathElement) {
            pathElement.setAttribute("fill", "#1B3664"); // Change the fill color
        }
        this.classList.toggle("active");
    });


}, 1000)
