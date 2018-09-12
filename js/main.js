      google.charts.load('current', {
	  callback: function () {

		drawChart();
		setInterval(drawChart, 5000);

		function drawChart() {
		  document.getElementById('buried').innerHTML = '-92 dBm';
		  $.ajax({
			url: '../3E3370RSSI.json',
			type: 'get',
			success: function (chartData) {
			  if (chartData.length > 0){
				  console.log(chartData[chartData.length -1]);
				  document.getElementById('buried').innerHTML = chartData[chartData.length -1].toString() + ' dBm';
			  }
			  if (chartData.length > 50) {
			      var first = [];
                  first.push(chartData[0]);
                  //console.log(first);
                  chartData = chartData.slice(Math.max(chartData.length - 50, 1));
                  chartData = first.concat(chartData);
                  //console.log(chartData);
			  }
			  var data = google.visualization.arrayToDataTable(chartData);
			  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
			  var options = {
			      chartArea: {
                    left: 50,
                    width: '100%',
                    top: 35
                  },
                  legend: {
                    position: 'bottom'
                  },
                  width: '100%',
                  height: 400,
				  hAxis: {
					title: "Time",
				  },
				  vAxis: {
					title: "RSSI (dBm)"         
				  }
				};
			  chart.draw(data,options);
			}
		  });
		}

	  },
	  packages: ['corechart']
	});