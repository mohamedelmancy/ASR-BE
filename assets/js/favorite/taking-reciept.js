setTimeout(() => {
    const search_btn = document.querySelector(".search_btn object");
    const svgDocument = search_btn.contentDocument; // Get the embedded SVG document
    const pathElement = svgDocument.querySelector("path"); // Select the <path> inside the SVG
    if (pathElement) {
        pathElement.setAttribute("fill", "#fff"); // Change the fill color
    }
}, 1000);
