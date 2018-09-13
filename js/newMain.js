google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(callbackFunction);

function callbackFunction() {
	drawChart();
	setInterval(drawChart, 5000);
	var RSSIData = new google.visualization.DataTable();
	RSSIData.addColumn('string', 'Time');
	RSSIData.addColumn('number', 'Buried node');
	RSSIData.addColumn('number', 'Surface node');
	var MoistureData = new google.visualization.DataTable();
	MoistureData.addColumn('string', 'Time');
	MoistureData.addColumn('number', 'Buried node');
	MoistureData.addColumn('number', 'Surface node');
	var TemperatureData = new google.visualization.DataTable();
	TemperatureData.addColumn('string', 'Time');
	TemperatureData.addColumn('number', 'Buried node');
	TemperatureData.addColumn('number', 'Surface node');
	function drawChart() {
		$.ajax({
			url: '../CombinedRSSI.json',
			type: 'get',
			success: function (chartData) {
				var index = chartData.length - 1;
				var set = false;
				while (! set && index >= 0){
				  if (chartData[index][1] != null){
					  set = true;
					  var rssi = chartData[index][1].toString() + ' dBm at ' + chartData[index][0].toString();
					  if (document.getElementById("buried").innerHTML = rssi){
						document.getElementById("buried").innerHTML = rssi;
					  }
				  }
				  index = index - 1;
				}
				index = chartData.length - 1;
				set = false;
				while (! set && index >= 0){
				  if (chartData[index][2] != null){
					  set = true;
					  var rssi = chartData[index][2].toString() + ' dBm at ' + chartData[index][0].toString();
					  if (document.getElementById("surface").innerHTML = rssi){
						document.getElementById("surface").innerHTML = rssi;
					  }
				  }
				  index = index - 1;
				}
				if (chartData.length > 50) {
					var first = [];
					first.push(chartData[0]);
					//console.log(first);
					chartData = chartData.slice(Math.max(chartData.length - 50, 1));
					chartData = first.concat(chartData);
					//console.log(chartData);
				}
				RSSIData = new google.visualization.DataTable();
				RSSIData.addColumn('string', 'Time');
				RSSIData.addColumn('number', 'Buried node');
				RSSIData.addColumn('number', 'Surface node');
				RSSIData.addRows(chartData);
			}
		});
		
		$.ajax({
			url: '../CombinedMoisture.json',
			type: 'get',
			success: function (chartData) {
			  var index = chartData.length - 1;
			  var set = false;
			  while (! set && index >= 0){
				  if (chartData[index][1] != null){
					  set = true;
					  var moisture = chartData[index][1].toString() + '% at ' + chartData[index][0].toString();
					  if (document.getElementById("soil_moisture_div").innerHTML = moisture){
						document.getElementById("soil_moisture_div").innerHTML = moisture;
					  }
				  }
				  index = index - 1;
			  }
			  if (chartData.length > 50) {
			      var first = [];
                  first.push(chartData[0]);
                  //console.log(first);
                  chartData = chartData.slice(Math.max(chartData.length - 50, 1));
                  chartData = first.concat(chartData);
                  //console.log(chartData);
			  }
			  MoistureData = new google.visualization.DataTable();
			  MoistureData.addColumn('string', 'Time');
			  MoistureData.addColumn('number', 'Buried node');
			  MoistureData.addColumn('number', 'Surface node');
			  MoistureData.addRows(chartData);
			}
		  });
		  
		  $.ajax({
			url: '../CombinedTemperature.json',
			type: 'get',
			success: function (chartData) {
			  var index = chartData.length - 1;
			  var set = false;
			  while (! set && index >= 0){
				  if (chartData[index][1] != null){
					  set = true;
					  var moisture = chartData[index][1].toString() + 'degrees at ' + chartData[index][0].toString();
					  if (document.getElementById("soil_temperature_div").innerHTML = moisture){
						document.getElementById("soil_temperature_div").innerHTML = moisture;
					  }
				  }
				  index = index - 1;
			  }
			  if (chartData.length > 50) {
			      var first = [];
                  first.push(chartData[0]);
                  //console.log(first);
                  chartData = chartData.slice(Math.max(chartData.length - 50, 1));
                  chartData = first.concat(chartData);
                  //console.log(chartData);
			  }
			  TemperatureData = new google.visualization.DataTable();
			  TemperatureData.addColumn('string', 'Time');
			  TemperatureData.addColumn('number', 'Buried node');
			  TemperatureData.addColumn('number', 'Surface node');
			  TemperatureData.addRows(chartData);
			}
		  });
		
		var RSSIChart = new google.visualization.LineChart(document.getElementById('signal_strength_div'));
		var options = {
			interpolateNulls: true,
			pointSize: 8,
			chartArea: {
				left: 60,
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
				title: "RSSI (dBm)",   
				viewWindow: {
					min: -135,
					max: -80
				},
				ticks: [-130, -120, -110, -100, -90, -80]					
			}
		};
		RSSIChart.draw(RSSIData,options);
		
		
		var MoistureChart = new google.visualization.LineChart(document.getElementById('moisture_div'));
		var options = {
			interpolateNulls: true,
			pointSize: 8,
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
				title: "VWC (%)",
				viewWindow: {
					min: 0,
					max: 100
				},
				ticks: [0, 20, 40, 60, 80, 100]				
			}
		};
		MoistureChart.draw(MoistureData,options);
		
		var TemperatureChart = new google.visualization.LineChart(document.getElementById('temperature_div'));
		var options = {
			interpolateNulls: true,
			pointSize: 8,
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
				title: "Temperature in degrees",
				viewWindow: {
					min: 10,
					max: 25
				},
				ticks: [10, 12.5, 15, 17.5, 20, 22.5, 25]				
			}
		};
		TemperatureChart.draw(TemperatureData,options);
	}
}