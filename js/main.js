    google.charts.load('current', {
	  callback: function () {

		drawChart();
		setInterval(drawChart, 5000);

		function drawChart() {
		  $.ajax({
			url: '../CombinedRSSI.json',
			type: 'get',
			success: function (chartData) {
			  if (chartData.length > 0){
				  //console.log(chartData[chartData.length -1]);
				  var elementId = "buried";
				  var index = 1;
				  if (chartData[chartData.length -1][1] == null){
					  index = 2;
					  elementId = "surface";
				  }
				  var value = chartData[chartData.length -1][index].toString() + ' dBm at ' + chartData[chartData.length -1][0].toString();
				  if (document.getElementById(elementId).innerHTML != value){
					document.getElementById(elementId).innerHTML = value;
				  }
				  if (elementId == "buried"){
					value = chartData[chartData.length - 2][2].toString() + ' dBm at ' + chartData[chartData.length -2][0].toString();
					if (document.getElementById("surface").innerHTML != value){
						document.getElementById("surface").innerHTML = value;
					} 
				  }else{
					value = chartData[chartData.length - 2][1].toString() + ' dBm at ' + chartData[chartData.length -2][0].toString();
					if (document.getElementById("buried").innerHTML != value){
						document.getElementById("buried").innerHTML = value;
					}   
				  }
			  }
			  if (chartData.length > 50) {
			      var first = [];
                  first.push(chartData[0]);
                  //console.log(first);
                  chartData = chartData.slice(Math.max(chartData.length - 50, 1));
                  chartData = first.concat(chartData);
                  //console.log(chartData);
			  }
			  var data = new google.visualization.DataTable();
			  data.addColumn('string', 'Time');
			  data.addColumn('number', 'Buried node');
			  data.addColumn('number', 'Surface node');
			  data.addRows(chartData);
			  var chart = new google.visualization.LineChart(document.getElementById('signal_strength_div'));
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
	
	google.charts.load('current', {
	  callback: function () {

		drawChart();
		setInterval(drawChart, 5000);

		function drawChart() {
		  $.ajax({
			url: '../CombinedMoisture.json',
			type: 'get',
			success: function (chartData) {
			  if (chartData.length > 0){
				  var moisture = chartData[chartData.length -1][1].toString() + '% at ' + chartData[chartData.length -1][0].toString();
				  if (document.getElementById("soil_moisture_div").innerHTML != moisture){
					document.getElementById("soil_moisture_div").innerHTML = moisture;
				  }
			  }
			  if (chartData.length > 50) {
			      var first = [];
                  first.push(chartData[0]);
                  //console.log(first);
                  chartData = chartData.slice(Math.max(chartData.length - 50, 1));
                  chartData = first.concat(chartData);
                  //console.log(chartData);
			  }
			  var data = new google.visualization.DataTable();
			  data.addColumn('string', 'Time');
			  data.addColumn('number', 'Buried node');
			  data.addColumn('number', 'Surface node');
			  data.addRows(chartData);
			  var chart = new google.visualization.LineChart(document.getElementById('moisture_div'));
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
	
	google.charts.load('current', {
	  callback: function () {

		drawChart();
		setInterval(drawChart, 5000);

		function drawChart() {
		  $.ajax({
			url: '../CombinedTemperature.json',
			type: 'get',
			success: function (chartData) {
			  if (chartData.length > 0){
				  var temperature = chartData[chartData.length -1][1].toString() + '% at ' + chartData[chartData.length -1][0].toString();
				  if (document.getElementById("soil_temperature_div").innerHTML != temperature){
					document.getElementById("soil_temperature_div").innerHTML = temperature;
				  }
			  }
			  if (chartData.length > 50) {
			      var first = [];
                  first.push(chartData[0]);
                  //console.log(first);
                  chartData = chartData.slice(Math.max(chartData.length - 50, 1));
                  chartData = first.concat(chartData);
                  //console.log(chartData);
			  }
			  var data = new google.visualization.DataTable();
			  data.addColumn('string', 'Time');
			  data.addColumn('number', 'Buried node');
			  data.addColumn('number', 'Surface node');
			  data.addRows(chartData);
			  var chart = new google.visualization.LineChart(document.getElementById('temperature_div'));
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