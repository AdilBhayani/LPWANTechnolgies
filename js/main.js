      google.charts.load('current', {
	  callback: function () {

		drawChart();
		setInterval(drawChart, 5000);

		function drawChart() {
		  $.ajax({
			url: '../3E3370RSSI.json',
			type: 'get',
			success: function (chartData) {
			  //console.log(chartData);
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
				  width: 800,
				  height: 600,
				  chart: {
					"title": 'Sigfox 3E3370 RSSI'
				  },    
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