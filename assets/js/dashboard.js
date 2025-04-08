setTimeout(() => {
    // Select the canvas element
    var ctx = document.getElementById("myBarChart").getContext("2d");

    // Define the data
    var data = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Revenues",
                data: [50, 20, 80, 40, 54, 70, 50, 20, 80, 40, 54, 70], // Bar values
                backgroundColor: ["#89CFF0"],
                borderWidth: 1,
                barThickness: 10, // Force bars to be 50 pixels wide
                grouped: false, // Required for barThickness to take effect
                stack: "combined",

            },
            {
                label: "Expenses",
                data: [50, 80, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10], // Bar values
                backgroundColor: ["#14CC26"],
                borderWidth: 1,
                barThickness: 10, // Force bars to be 50 pixels wide
                grouped: false, // Required for barThickness to take effect
                stack: "combined",
                borderRadius: {
                    topLeft: 10, // Rounded top-left corner
                    topRight: 10, // Rounded top-right corner
                    bottomLeft: 0, // Keep bottom square
                    bottomRight: 0, // Keep bottom square
                },
            },
        ],
    };

    // Define chart options
    var options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom", // Moves the legend to the bottom
                labels: {

                    font: {
                        size: 12, // Change font size
                        weight: "400", // Make text bold
                        family: "Inter", // Change font family
                    },
                    usePointStyle: true,
                    boxWidth: 10,
                    boxHeight: 10,
                },
            },
        },
        scales: {
            y: {
                min: 0, // Minimum value
                max: 100, // Maximum value
                ticks: {
                    stepSize: 20, // Labels at intervals of 10
                    callback: function (value) {
                        return value + "%"; // Display values with "%"
                    },
                },
                grid: {
                    display: true, // Keep horizontal grid lines
                    color: "#F4F4F4", // Customize grid line color
                    lineWidth: 1, // Set grid line thickness
                },

            },
            x: {
                grid: {
                    display: false, // Hide vertical grid lines
                },
            },
        },
    };

    // Create the bar chart
    new Chart(ctx, {
        type: "bar",
        data: data,
        options: options,
    });
    var ctx = document.getElementById("myPieChart").getContext("2d");
    console.log('ctx', ctx)
    var data = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
        datasets: [
            {
                data: [30, 20, 15, 25, 10], // Values
                backgroundColor: [
                    "rgba(255, 99, 132, 0.7)",
                    "rgba(54, 162, 235, 0.7)",
                    "rgba(255, 206, 86, 0.7)",
                    "rgba(75, 192, 192, 0.7)",
                    "rgba(153, 102, 255, 0.7)",
                ],
                borderColor: "#ffffff",
                borderWidth: 2,
            },
        ],
    };

    var options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%", // Size of the hole
        plugins: {
            legend: {
                display: false,
            },
        },
        animation: {
            onComplete: function () {
                var chartInstance = this,
                    ctx = chartInstance.ctx;

                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.font = "bold 18px Arial";
                ctx.fillStyle = "#000"; // Text color
                var centerX =
                    chartInstance.chartArea.left +
                    (chartInstance.chartArea.right - chartInstance.chartArea.left) / 2;
                var centerY =
                    chartInstance.chartArea.top +
                    (chartInstance.chartArea.bottom - chartInstance.chartArea.top) / 2;

                // Define the lines of text
                var lines = ["456", "Result"];

                // Set font sizes
                ctx.fillStyle = "#3A6FF8"; // Text color (Red-Orange)
                ctx.font = "700 28px Inter"; // Font weight, size, and family
                ctx.fillText(lines[0], centerX, centerY - 10); // First line

                ctx.fillStyle = "#676767"; // Text color (Red-Orange)
                ctx.font = "400 12px Inter"; // Font weight, size, and family
                ctx.fillText(lines[1], centerX, centerY + 15); // Second line
            },
        },
    };

    new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: options,
    });
}, 1000)
