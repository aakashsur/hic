function draw(color, canvas, json){
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		var size = 1;

		if (color == 'rainbow') {
			var colors = ['#0000ff','#008000','#ffff00','#ff0000'];
		}
		else {
			var colors = ['#f8cec6','#ea9e8f','#d86e5b','#c0392b']
		}

		$.each(json.counts, function() {
			var value = Math.min(Math.ceil(this.n) - 1 , colors.length-1);
			var fill = colors[value];
			ctx.fillStyle = fill;
			ctx.fillRect ((this.c*size), (this.r*size), size, size);
		});
	}
}

function image(filename, color, canvas){
	$.ajax({
		type: 'GET',
		dataType: "json",
		url: filename,
	})
	.done(function(data){
		draw(color, canvas, data);
		console.log(filename)
	})
	.fail(function(xhr, status, error) {
	    console.log("Error: " + error);
	    console.log("Status: " + status);
	});
}

function settings(canvas, row, col){
	if ($('#normalize').is(".btn.active")){
		var path = 'raw';
	} else {
		var path = 'normalized';
	}
	if ($('#color').is(".btn.active")){
		var color = 'rainbow';
	} else {
		var color = 'red';
	}

	var filename = 'json/'+ path + '/' + row + '-' + col +'.json';
	image(filename, color, canvas);
}

function build(output, data){
	for (var i = 0; i < output.length; i++){
		var row = output[i];
		for (var j = 0; j < output.length; j++){
			var col = output[j];
			var width = Math.floor(data.chromosomes[col].size/data.resolution) + 1;
			var height = Math.floor(data.chromosomes[row].size/data.resolution) + 1;
			var id = '#i'+ i +'j'+ j
			$(id).html('<canvas id= "canvas'+ i +'j'+ j +'"width='+ width +' height='+ height +'></canvas>');
			var canvas = document.getElementById("canvas"+ i +'j'+ j);
			settings(canvas, row, col)
		}
	}
}

function outline(output, data){
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

	build(output, data)

	$('.btn').click(function(event){
		$(this).toggleClass('active');
		if (event.target.id == 'normalize') {
			if (event.target.className == 'btn active') {	
				$(this).html('Raw Counts');
				build(output, data)
			} else {
				$(this).html('Normalized Counts');
				build(output, data)
			};
		}
		if (event.target.id == 'color'){
			if (event.target.className == 'btn active') {	
				$(this).html('Color');
				build(output, data)
			} else {
				$(this).html('Red');
				build(output, data)
			};
		}
	});
}

function json(output){
	$.ajax({
		type: 'GET',
		dataType: "json",
		url: 'names.json',
	})
	.done(function(data){
		outline(output, data);
	})
	.fail(function(xhr, status, error) {
	    console.log("Error: " + error);
	    console.log("Status: " + status);
	});
}

function cookie(){
	var input = document.cookie;
	var overview = input.split(';')
	$.each(overview, function() {
		if (this.includes('chromosomes')){
			var split = this.split('=')[1].split(',')
			json(split) 
		};
	});
}

function setup(){
	window.scrollTo(0, 0);
	cookie();
}

setup()
