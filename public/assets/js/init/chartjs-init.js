(function($) {
    "use strict";
    fetch("http://localhost:3000/orders", {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            var arr = []
            var donhang = []
            var month = 0
            var tien = 0
            var dh = 0
            for (var i = 0; i < data.length; i++) {
                var ngay = data[i].time_order.substr(0, 2)
                var thang = data[i].time_order.substr(3, 1)
                var nam = data[i].time_order.substr(-4, data[i].time_order.length)
                var day = ngay.replace(/\//g, ",")
                var date = new Date(nam, thang, ngay);
                var result = date.getMonth();
                if (month == result) {
                    if (i == (Number(data.length) - 1)) {
                        tien += Number(data[i].total_money)
                        dh++
                        donhang.push(dh)
                        arr.push(tien)
                    } else {
                        tien += Number(data[i].total_money)
                        dh++
                    }
                } else {
                    if (i == 0) {
                        tien = Number(data[i].total_money)
                        dh = 1
                    } else {
                        arr.push(tien)
                        donhang.push(dh)
                        tien = Number(data[i].total_money)
                        dh = 1
                        if (i == Number(data.length) - 1) {
                            arr.push(tien)
                            donhang.push(dh)
                        }
                    }
                }
                month = result
            }
            var ctx = document.getElementById("sales-chart");
            ctx.height = 150;
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    type: 'line',
                    defaultFontFamily: 'Montserrat',
                    datasets: [{
                        label: "Foods",
                        data: arr,
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(220,53,69,0.75)',
                        borderWidth: 3,
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointBorderColor: 'transparent',
                        pointBackgroundColor: 'rgba(220,53,69,0.75)',
                    }, {
                        label: "Electronics",
                        data: donhang,
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(40,167,69,0.75)',
                        borderWidth: 3,
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointBorderColor: 'transparent',
                        pointBackgroundColor: 'rgba(40,167,69,0.75)',
                    }]
                },
                options: {
                    responsive: true,

                    tooltips: {
                        mode: 'index',
                        titleFontSize: 12,
                        titleFontColor: '#000',
                        bodyFontColor: '#000',
                        backgroundColor: '#fff',
                        titleFontFamily: 'Montserrat',
                        bodyFontFamily: 'Montserrat',
                        cornerRadius: 3,
                        intersect: false,
                    },
                    legend: {
                        display: false,
                        labels: {
                            usePointStyle: true,
                            fontFamily: 'Montserrat',
                        },
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                            scaleLabel: {
                                display: false,
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                        }]
                    },
                    title: {
                        display: false,
                        text: 'Normal Legend'
                    }
                }
            });
        })
        //Sales chart


})(jQuery);