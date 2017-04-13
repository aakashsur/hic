function buttons(data){
	var n = 5
	var i = 0
	var index = 'row-0'
	$.each(data.chromosomes, function(){
		if (n == 5){
			index = 'row-' + i
			var row = '<div class = btn-row id =' + index + '></div>'
			$('.main').append(row);
			n = 0;
			i += 1;
		}
		var name = this.name
		var row = '#' + index
		var div = '<div class = "btn" id ='+ name +'>' + name + '</div>';
		$(row).append(div)
		n += 1;
	});
}

function activate(){
	var submit = '<a href = visualization.html class = "btn" id = "submit">Submit</a>';
	$('.main').append(submit);

	$('.btn').click(function(event){
		if (event.target.id != 'submit') {
			$(this).toggleClass('active');
	  	}
	});

	$('#submit').click(function(event){
		var output = [];
		$('.btn').each(function(){
			if (this.className == 'btn active'){
				output.push(this.id);
			}
		});
		document.cookie = 'chromosomes=' + output;
		console.log(document.cookie);
	});
}

function setup(){		
	$.ajax({
		type: 'GET',
		dataType: "json",
		url: 'names.json',
	})
	.done(function(names){
		buttons(names);
		activate();
	})
	.fail(function(xhr, status, error) {
	    console.log("Error: " + error);
	    console.log("Status: " + status);
	});
};


setup()

