
var ctx = document.getElementById('analyticsChart').getContext('2d');
var chart; // Store chart instance

// Initial load with total patients data
function loadTotalPatientsData() {
    if (chart) chart.destroy(); // Clear previous chart
    document.getElementById('analyticsChart').setAttribute('style', 'width: 697px; height: 400px;');
    document.getElementById('analyticsChart').setAttribute('width', '697');

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sep 10', 'Sep 11', 'Sep 12', 'Sep 13', 'Sep 14', 'Sep 15', 'Sep 16'],
            datasets: [{
                label: 'Total Patients',
                borderColor: 'blue',
                data: [100, 120, 105, 140, 115, 100, 150],
                fill: false,
                tension: 0.1,
                pointBackgroundColor: 'white',
                pointBorderWidth: 2
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
                    beginAtZero: false,
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

// Event listeners for buttons
document.getElementById('totalPatientsBtn').addEventListener('click', function () {
    loadTotalPatientsData();
    this.classList.add('bg-primary', 'text-white');
    document.getElementById('newPatientsBtn').classList.remove('bg-primary', 'text-white');
});

document.getElementById('newPatientsBtn').addEventListener('click', function () {
    loadNewPatientsData();
    this.classList.add('bg-primary', 'text-white');
    document.getElementById('totalPatientsBtn').classList.remove('bg-primary', 'text-white');
});

// Initial load of the total patients chart
loadTotalPatientsData();


var diseasesCtx = document.getElementById('diseasesChartCanvas').getContext('2d');
var diseasesChart; // Store chart instance here

const chartData = {
    weekly: {
        labels: ['Cholesterol', 'Diabetic', 'Low Blood Pressure', 'Malaria', 'Others'],
        data: [100, 50, 40, 30, 10],
        totalPatients: 230
    },
    monthly: {
        labels: ['Cholesterol', 'Diabetic', 'Low Blood Pressure', 'Malaria', 'Others'],
        data: [420, 200, 180, 150, 50],
        totalPatients: 1000
    },
    yearly: {
        labels: ['Cholesterol', 'Diabetic', 'Low Blood Pressure', 'Malaria', 'Others'],
        data: [5000, 3000, 2500, 2000, 1000],
        totalPatients: 13500
    }
};

// Load the doughnut chart
function loadDiseasesChart(data, labels) {
    if (diseasesChart) diseasesChart.destroy(); // Clear previous chart
    // document.getElementById('diseasesChartCanvas').setAttribute('style', 'width: 697px !important; height: 400px;');
    // document.getElementById('diseasesChartCanvas').setAttribute('width', '697');

    diseasesChart = new Chart(diseasesCtx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF8C00', '#9ACD32'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            layout: {
                autoPadding: true,
                padding: {
                    top: 20,
                    bottom: 20,
                    left: 50,
                    right: 50
                }
            },
            plugins: {
                legend: {
                    display: false // Disable default legend
                },
                datalabels: {
                    color: '#000',  // Label text color
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    formatter: function (value, context) {
                        const dataset = context.chart.data.datasets[0];
                        const total = dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = (value / total * 100).toFixed(1) + '%';
                        return percentage;
                    },
                    anchor: 'end',  // Position the label outside the slice
                    align: 'end', // Align it on the outside of the slice
                }
            }
        },
        plugins: [ChartDataLabels],
    });

    updateLegend(labels, data);
}

// Update custom legend
function updateLegend(labels, data) {
    const legendContainer = document.getElementById('diseaseLegendList');
    legendContainer.innerHTML = ''; // Clear existing legend

    labels.forEach((label, index) => {
        legendContainer.innerHTML += `
        <li class="flex items-center mb-2">
            <span class="inline-block w-3 h-3 rounded-full" style="background-color: ${diseasesChart.data.datasets[0].backgroundColor[index]}; margin-right: 0.5rem;"></span>
            ${label} <span class="ml-auto text-gray-500">${data[index]} (${((data[index] / data.reduce((a, b) => a + b)) * 100).toFixed(2)}%)</span>
        </li>
    `;
    });
}

// Update diseases chart based on time period
function updateChartData(period) {
    const { labels, data, totalPatients } = chartData[period];

    // Update the chart with new data
    document.getElementById('patientCountDisplay').innerText = totalPatients;
    loadDiseasesChart(data, labels);

    document.getElementById('patientCountDisplay').classList.add('2xl:text-xl', 'text-sm');

    // Update the dropdown button text with the selected period
    const dropdownButton = document.getElementById('rangeDropdownButton');
    if (period === 'weekly') {
        dropdownButton.innerHTML = 'This Week <span class="material-icons ml-1">expand_more</span>';
    } else if (period === 'monthly') {
        dropdownButton.innerHTML = 'This Month <span class="material-icons ml-1">expand_more</span>';
    } else if (period === 'yearly') {
        dropdownButton.innerHTML = 'Yearly <span class="material-icons ml-1">expand_more</span>';
    }

    toggleRangeDropdown(); // Close dropdown after selection
}

// Toggle dropdown visibility
function toggleRangeDropdown() {
    const menu = document.getElementById('rangeDropdownMenu');
    menu.classList.toggle('hidden');
}

document.getElementById('rangeDropdownButton').addEventListener('click', toggleRangeDropdown);


// Initial load of the diseases chart (monthly)
setTimeout(() => {
    updateChartData('monthly');
}, 100)

