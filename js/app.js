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
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d")

const WIDTH = canvas.clientWidth;
const HEIGHT = canvas.clientHeight;
let bubbles = [];
let bullets = [];

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

function intersectRect(r1, r2) {
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

class Bubble{

  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = new Image();
    this.img.src = "assets/images/bubble.svg";
    this.speed = Math.random();

    this.img.onload = () => {
      ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
  }

  move(){
    this.y += this.speed;
  }

  destroy(){
    bubbles = bubbles.filter(bubble => bubble !== this);
  }

  draw(){
    ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
  }
}


class Bullet{

  constructor(x, y, angle = 30){
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.size = 15;
    this.img = new Image();
    this.img.src = "assets/images/bullet.png";
    this.speed = -10;
    this.img.onload = () => {

      // ctx.rotate(this.angle);
      ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
      // ctx.rotate(-this.angle);
    }
  }

  move(){
    this.x += this.speed * Math.cos(this.angle * Math.PI / 180);
    this.y += this.speed * Math.sin(this.angle * Math.PI / 180);
  }

  destroy(){
    bullets = bullets.filter(bullet => bullet !== this);
  }

  draw(){
    // ctx.rotate(this.angle);
    ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    // ctx.rotate(-this.angle);
  }
}

function createBubble(){
  const positionX = Math.floor(Math.random() *  (WIDTH - 170)) + 20;
  const positionY = Math.floor(Math.random() * 10);
  const bubbleSize = Math.floor(Math.random() * (150 - 70) + 70);
  bubbles.push(new Bubble(positionX, positionY, bubbleSize)); 
}
for (let i = 0; i < 4; i++) {
  createBubble(); 
}


function createBullet(x, y){
  console.log('Angle', angle(x, y, WIDTH/2, 400));
  bullets.push(new Bullet(WIDTH/2, 400, angle(x, y, WIDTH/2, 400))); 
}

canvas.addEventListener('click',e => {
  const canvasBox = canvas.getBoundingClientRect();
  createBullet(e.clientX - canvasBox.left, e.clientY - canvasBox.top);
})

setInterval(() => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  bubbles.forEach(bubble => {
    bubble.move();
    if(bubble.y > 320){
      bubble.destroy();
      createBubble()
    }
    bubble.draw();
  })

  bullets.forEach(bullet => {
    bullet.move();
    bullet.draw();
  })
}, 10);
