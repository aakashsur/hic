function draw() {
  $.getJSON("Chr01.json", function(json) {
    console.log('found')
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      var size = 3;
      $.each(json, function() {
        ctx.fillStyle = "black";
        ctx.fillRect (this.row * size, this.col * size, size, size);
      });
      }
  });
};