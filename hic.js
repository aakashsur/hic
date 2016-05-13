function draw() {
  $.getJSON("Chr36.json", function(json) {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      var size = 1;
      $.each(json, function() {
        ctx.fillStyle = "black";
        ctx.fillRect (this.row * size, this.col * size, size, size);
      });
      }
  });
};