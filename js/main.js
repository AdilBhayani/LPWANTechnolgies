      google.charts.load('current', {
	  callback: function () {

		drawChart();
		setInterval(drawChart, 5000);

		function drawChart() {
		  $.ajax({
			url: '3E3370RSSI.json',
			type: 'get',
			success: function (chartData) {
			console.log(chartData);
			  var data = google.visualization.arrayToDataTable(chartData);
			  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
			  var options = {
				  width: 1000,
				  height: 800,
				  chart: {
					title: 'Sigfox 3E3370 RSSI'
				  },    
				  hAxis: {
						 title: "Time",
				  },
				  vAxis: {
					title: "RSSI"         
				  }
				};
			  chart.draw(data,options);
			}
		  });
		}

	  },
	  packages: ['corechart']
	});