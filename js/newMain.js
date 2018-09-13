google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	var RSSIData = new google.visualization.DataTable();
	var MoistureData = new google.visualization.DataTable();
	var TemperatureData = new google.visualization.DataTable();
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
			
			RSSIData.addColumn('string', 'Time');
			RSSIData.addColumn('number', 'Buried node');
			RSSIData.addColumn('number', 'Surface node');
			RSSIData.addRows(chartData);
		}
	});
	
	var RSSIChart = new google.visualization.LineChart(document.getElementById('signal_strength_div'));
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
	RSSIChart.draw(data,options);
	
var piechart_options = {title:'Pie Chart: How Much Pizza I Ate Last Night',
width:400,
height:300};
var piechart = new google.visualization.PieChart(document.getElementById('moisture_div'));
piechart.draw(data, piechart_options);

var barchart_options = {title:'Barchart: How Much Pizza I Ate Last Night',
	   width:400,
	   height:300,
	   legend: 'none'};
var barchart = new google.visualization.BarChart(document.getElementById('temperature_div'));
barchart.draw(data, barchart_options);
		}