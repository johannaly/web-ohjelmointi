let myChart;
let fordAmount = 0;
let opelAmount = 0;
let toyotaAmount = 0;
let myChartData = [fordAmount, opelAmount, toyotaAmount];
drawchart();

function drawchart() {
    let ctx = document.getElementById("myChart");
    myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Ford", "Opel", "Toyota"],
        datasets: [{
            label: 'Autojen lukumäärät',
            data: myChartData,
            backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(75, 192, 192, 0.5)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        tooltips: {
            callbacks: {
                label: function(tooltipItem) {
                    return "Lukumäärä (kpl): " + Number(tooltipItem.yLabel);
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
})
}

document.getElementById("clear").addEventListener("click", nollaa);

function nollaa() {
    myChart.data.datasets[0].data = [0, 0, 0];
    fordAmount = 0;
    opelAmount = 0;
    toyotaAmount = 0;
    myChart.update();
    }

document.getElementById("ford").addEventListener("click", function() {
    addcar(1);
});
document.getElementById("opel").addEventListener("click", function() {
    addcar(2);
});
document.getElementById("toyota").addEventListener("click", function() {
    addcar(3);
});

function addcar(carnumber) {
    if (carnumber == 1) {
        fordAmount = fordAmount + 1;
    }
    else if ( carnumber == 2) {
        opelAmount = opelAmount + 1;
    }
    else if (carnumber == 3) {
        toyotaAmount = toyotaAmount +1;
    }
    myChart.data.datasets[0].data = [fordAmount, opelAmount, toyotaAmount];
    myChartData = [fordAmount, opelAmount, toyotaAmount];
    myChart.update();
}
