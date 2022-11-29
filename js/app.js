let temperaturePiston = 40;
let time_limit = 60;

//Temperature Meter Height
let piston = document.getElementById("pistonDiv").style.height = temperaturePiston + "px";

//Timer in seconds
let timer = document.getElementById("timerDiv");
let time_out = () =>  {
    setInterval(() => {
        if(time_limit == 0) {
            timer.innerHTML = "Time Over"
        } else {
          if(time_limit < time_limit) {
            time_limit = 0 + '' + time_limit;
          }
          timer.innerHTML = time_limit + " " + "seconds";
          time_limit -= 1;
        }
      }, 1000);
}

//Canvas elements
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d")
function drawImage(){
  const positionX = Math.floor(Math.random() * 700);
  const positionY = Math.floor(Math.random() * 300);
  const bubbleSize = Math.floor(Math.random() * 150);
  const img = new Image();
  img.onload = function(){
      ctx.drawImage(img, positionX, positionY, bubbleSize, bubbleSize);
  };
  img.src = "assets/images/bubble.svg";
}
for (let i = 0; i < 100; i++) {
  drawImage();
}

  