
var ctx = document.getElementById('analyticsChart').getContext('2d');
var chart; // Store chart instance

// Initial load with total patients data
function loadTotalPatientsData() {
    if (chart) chart.destroy(); // Clear previous chart
    document.getElementById('analyticsChart').setAttribute('style', 'width: 697px; height: 400px;');
    document.getElementById('analyticsChart').setAttribute('width', '697');

    var gradient = ctx.createLinearGradient(0, 0, 0, 400); // Create a linear gradient
    gradient.addColorStop(0, '#00AEEF'); // Start color
    gradient.addColorStop(1, '#1E5FAC'); // End color

    var gradient2 = ctx.createLinearGradient(0, 0, 0, 400); // Create a linear gradient2
    gradient2.addColorStop(0, '#FBB040'); // Start color
    gradient2.addColorStop(1, '#EF4126'); // End color


    chart = new Chart(ctx, {
        type: 'bar', // Changed from 'line' to 'bar'
        data: {
            labels: ['Sep 10', 'Sep 11', 'Sep 12', 'Sep 13', 'Sep 14', 'Sep 15', 'Sep 16'],
            datasets: [{
                label: 'Returning Patients',
                backgroundColor: gradient2, // Example color for the second bar
                data: [80, 90, 85, 100, 95, 80, 120], // Data for the second bar
                fill: true, // Set fill to true for bar chart
            }, {
                label: 'Total Patients',
                backgroundColor: gradient, // Use the gradient color
                data: [100, 120, 105, 140, 115, 100, 150],
                fill: true, // Set fill to true for bar chart
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false // Hide legend to differentiate between bars
                }
            },
            scales: {
                y: {
                    beginAtZero: true, // Changed to true for better representation in bar chart
                    min: 80,
                    max: 160
                }
            }
        }
    });

    setTimeout(() => {
        document.getElementById('analyticsChart').setAttribute('style', 'width: 697px; height: 400px;');
        document.getElementById('analyticsChart').setAttribute('width', '697');
        document.getElementById('analyticsChart').setAttribute('height', '400');
    }, 1);
}

var ctx2 = document.getElementById('analyticsChart2').getContext('2d');
var chart2; // Store chart instance

// Initial load with total patients data
function loadTotalPatientsData2() {
    if (chart2) chart2.destroy(); // Clear previous chart
    document.getElementById('analyticsChart2').setAttribute('style', 'width: 697px; height: 400px;');
    document.getElementById('analyticsChart2').setAttribute('width', '697');

    chart2 = new Chart(ctx2, {
        type: 'line', // Set to 'line'
        data: {
            labels: ['Sep 10', 'Sep 11', 'Sep 12', 'Sep 13', 'Sep 14', 'Sep 15', 'Sep 16'],
            datasets: [{
                label: 'Total Patients',
                borderColor: 'red', // Set line color to red
                data: [100, 120, 105, 140, 115, 100, 150],
                fill: false, // No fill for line chart
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false // Hide legend
                }
            },
            scales: {
                y: {
                    beginAtZero: true, // Start y-axis at zero
                    min: 80,
                    max: 160
                }
            }
        }
    });

    setTimeout(() => {
        document.getElementById('analyticsChart2').setAttribute('style', 'width: 697px; height: 400px;');
        document.getElementById('analyticsChart2').setAttribute('width', '697');
        document.getElementById('analyticsChart2').setAttribute('height', '400');
    }, 1);
}

// Load new patients data
function loadNewPatientsData() {
    if (chart) chart.destroy(); // Clear previous chart

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sep 10', 'Sep 11', 'Sep 12', 'Sep 13', 'Sep 14', 'Sep 15', 'Sep 16'],
            datasets: [{
                label: 'New Patients',
                backgroundColor: 'green',
                data: [30, 40, 25, 50, 45, 60, 75],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Weekly, Monthly, Yearly data loaders
function loadWeeklyData() {
    document.getElementById('dropdownButton').innerText = 'Weekly';
    loadTotalPatientsData();
    toggleDropdown(); // Close dropdown
}

function loadMonthlyData() {
    document.getElementById('dropdownButton').innerText = 'Monthly';
    loadTotalPatientsData();
    toggleDropdown(); // Close dropdown
}

function loadYearlyData() {
    document.getElementById('dropdownButton').innerText = 'Yearly';
    loadTotalPatientsData();
    toggleDropdown(); // Close dropdown
}

// Weekly, Monthly, Yearly data loaders
function loadWeeklyData2() {
    document.getElementById('dropdownButton2').innerText = 'Weekly';
    loadTotalPatientsData2();
    toggleDropdown2(); // Close dropdown
}

function loadMonthlyData2() {
    document.getElementById('dropdownButton2').innerText = 'Monthly';
    loadTotalPatientsData2();
    toggleDropdown2(); // Close dropdown
}

function loadYearlyData() {
    document.getElementById('dropdownButton2').innerText = 'Yearly';
    loadTotalPatientsData2();
    toggleDropdown2(); // Close dropdown
}

// Event listeners for buttons
document.getElementById('totalPatientsBtn').addEventListener('click', function () {
    loadTotalPatientsData();
    this.classList.add('bg-primary', 'text-white');
    document.getElementById('newPatientsBtn').classList.remove('bg-primary', 'text-white');
});

document.getElementById('newPatientsBtn').addEventListener('click', function () {
    loadTotalPatientsData();
    this.classList.add('bg-primary', 'text-white');
    document.getElementById('totalPatientsBtn').classList.remove('bg-primary', 'text-white');
});

// Event listeners for buttons
document.getElementById('totalPatientsBtn2').addEventListener('click', function () {
    loadTotalPatientsData2();
    this.classList.add('bg-primary', 'text-white');
    document.getElementById('newPatientsBtn2').classList.remove('bg-primary', 'text-white');
});

document.getElementById('newPatientsBtn2').addEventListener('click', function () {
    loadTotalPatientsData2();
    this.classList.add('bg-primary', 'text-white');
    document.getElementById('totalPatientsBtn2').classList.remove('bg-primary', 'text-white');
});

// Initial load of the total patients chart
loadTotalPatientsData();
loadTotalPatientsData2();



// Toggle dropdown visibility
function toggleRangeDropdown() {
    const menu = document.getElementById('rangeDropdownMenu');
    menu.classList.toggle('hidden');
}

document.getElementById('rangeDropdownButton').addEventListener('click', toggleRangeDropdown);

