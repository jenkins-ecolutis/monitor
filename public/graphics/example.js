$(document).ready(function() {
	var options = {
		chart: {
			renderTo: 'graph1',
			type: 'column'
		},
		title: {
			text: 'Fruit Consumption'
		},
		xAxis: {
			categories: []
		},
		yAxis: {
			title: {
				text: 'Units'
			}
		},
			series: []
	};

	$.get('data/example.cvs', function(data) {
		// Split the lines
		var lines = data.split('\n');
		$.each(lines, function(lineNo, line) {
			var items = line.split(',');

			// header line containes categories
			if (lineNo == 0) {
				$.each(items, function(itemNo, item) {
					if (itemNo > 0) options.xAxis.categories.push(item);
				});
			}
					
			// the rest of the lines contain data with their name in the first position
			else {
				var series = { 
					data: []
				};
				$.each(items, function(itemNo, item) {
					if (itemNo == 0) {
						series.name = item;
					} else {
						series.data.push(parseFloat(item));
					}
				});

				options.series.push(series);
			}
		});
		var chart = new Highcharts.Chart(options);
	});
});
