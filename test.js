function execute () {
	$('.main').html(`<h1>Hi-C Visualization</h1>
					<p>Click on multiple chromsomes to see all interactions between them.</p>`);
	$.getJSON("names.json", function(json) {
		var data = json;

		$.each(data.chromosomes, function(){
			var name = this.name
			var div = '<div class = "container"><div class = "btn" id ='+name +'>' + name + '</div></div>';
			$('.main').append(div);
		});

		var submit = '<div class = "container"><div class = "btn" id = "submit">Submit</div></div>';
		$('.main').append(submit);

		$('.btn').click(function(event){
			if (event.target.id != 'submit') {
				$(this).toggleClass('active');
		  }
		});

		$('#submit').click(function(event){
			var output = []
			$('.btn').each(function(){
				if (this.className == 'btn active'){
					output.push(this.id)
				}
			});

			(function () {
				window.scrollTo(0, 0);

				$(".main").html('<div class = "btn" id = "back" onclick = "execute();">Back</div>');
				$(".main").append('<div class = "btn" id = "normalize">Raw Counts</div>');
				$(".main").append('<div class = "btn" id = "color">Color</div>');
				$(".main").append('<div class = "header"></div>');

				$('.btn').click(function(event){
					$(this).toggleClass('active');
					if (event.target.id == 'normalize') {
						if (event.target.className == 'btn active') {	
							$(this).html('Normalized Counts');
						} else {
							console.log('inactive')
							$(this).html('Raw Counts');
						};
					}
				});

				for (var n = 0; n < output.length; n++){
					var width = Math.floor(data.chromosomes[output[n]].size/data.resolution) + 1;
					$(".header").append('<div class = "cell title" style = "width:'+ width +'px;">'+ output[n] +'</div>');
				};

				for (var i = 0; i < output.length; i++){
					$(".main").append('<div class = "row" id = i' + i + '></div>');
					var height = Math.floor(data.chromosomes[output[i]].size/data.resolution) + 1;
					$("#i"+i).append('<div class = "cell title vertical"> \
						<div class = "wrapper" style = "height:'+ height +'px;"> \
							<div class = "text">'+ output[i] +'</div> \
						</div> \
					</div>');
					for (var j = 0; j < output.length; j++){
						$("#i"+i).append('<div class = "cell" id = i'+ i +'j'+ j +'></div>');
					};
				};

				var path = 'raw';
				var colorScheme = 'red';

				$('#normalize').click(function(event){
					draw(output,path,colorScheme);
		  		});

				$('#color').click(function(event){
					draw(output,path,colorScheme);
		  		});

				function draw(output, path, colorScheme) {
					for (var i = 0; i < output.length; i++){
						if ($('#normalize').is(".btn.active")){
							path = 'normalized';
						} else {
							path = 'raw';
						}
						if ($('#color').is(".btn.active")){
							colorScheme = 'rainbow';
						} else {
							colorScheme = 'red';
						}
						var rowName = output[i];
						for (var j = 0; j < output.length; j++){
							var colName = output[j];
							(function(rowName, colName,i,j){
								var inFile = 'json/'+ path + '/' + rowName + colName +'.json';
								$.getJSON(inFile, function(json){
									var width = Math.floor(data.chromosomes[colName].size/data.resolution) + 1;
									var height = Math.floor(data.chromosomes[rowName].size/data.resolution) + 1;
									var id = '#i'+ i +'j'+ j
									$(id).html('<canvas id= "canvas'+ i +'j'+ j +'"width='+ width +' height='+ height +'></canvas>');
									var canvas = document.getElementById("canvas"+ i +'j'+ j);
									if (canvas.getContext) {
										var ctx = canvas.getContext("2d");
										var size = 1;
										var multiple = 1;
										if (colorScheme == 'rainbow') {
											var colors = ['#0000ff','#008000','#ffff00','#ff0000'];
										}
										else {
											var colors = ['#f8cec6','#ea9e8f','#d86e5b','#c0392b']
										}
										$.each(json, function() {
											var value = Math.min(Math.ceil(this.count) - 1 , colors.length-1);
											var color = colors[value];
											ctx.fillStyle = color;
											ctx.fillRect ((this.col*size), (this.row*size), size*multiple, size*multiple);
										});
							  		}
								});
							})(rowName, colName,i,j);
						};
					}};
				draw(output, path, colorScheme);
			})();
		});
	});

};

execute();










