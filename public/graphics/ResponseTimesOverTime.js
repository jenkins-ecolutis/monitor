$(document).ready(function() {
	var options = {
		chart: {
			renderTo: 'ResponseTimesOverTime',
		},
		title: {
			text: 'Evolution des temps de réponses'
		},
		subtitle: {
			text: '26/12/2013',
			x: -20
		},
		xAxis: {
			categories: []
		},
		yAxis: {
			title: {
				text: 'Temps de réponses (sec)'
			}
		},
		series: []
	};

	$.get('data/results.csv', function(data) {
		// Split the lines
		var lines = data.split('\n');
		$.each(lines, function(lineNo, line) {
			var items = line.split(',');

			// header line containes categories
			if (lineNo == 0) {
				$.each(items, function(itemNo, item) {
					if (itemNo > 0) options.xAxis.categories.push(item);
					//alert('Catégories : ' + item);
				});
			}
			
					
			// the rest of the lines contain data with their name in the first position
			else {
				var series = { 
					data: []
				};
				$.each(items, function(itemNo, item) {
					if (itemNo == 3) {
						series.name = item;
						alert('series.name : ' + item);
					} else {
						series.data.push(parseFloat(item));
						//alert('series.data : ' + item);
					}
				});

				options.series.push(series);
			}
		});
		var chart = new Highcharts.Chart(options);
	});
});
