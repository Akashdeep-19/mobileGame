var rot;
var r = 60;
var l = 100;
speed = 0.04;
delay = 200;
time = 0;
var bullets = [];
var balls = [];

function setup(){
  createCanvas(windowWidth,windowHeight);
  rot = createVector(0,1);
}

function draw (){
  background(50);
  fill(100,200,100);
  ellipse(width/2,height/2,2*r);

  rot.rotate(speed);
  push();
  translate(width/2,height/2);
  rotate(rot.heading());
  stroke(250);
  strokeWeight(3);
  line(0,0,l,0);
  pop();

  for(bullet of bullets){
      bullet.show();
      bullet.update();
      bullet.restrict();
      for(ball of balls)
          bullet.struck(ball);
  }
  for(ball of balls){
      ball.show();
      ball.update();
    //  ball.restrict();
  }

  spawn();

  for(var i = balls.length-1;i >= 0;i--){
      if(balls[i].hit)
          balls.splice(i,1);
  }
  for(var i = bullets.length-1;i >= 0;i--){
      if(bullets[i].hit)
          bullets.splice(i,1);
  }
}

function touchStarted(){
  var dx = cos(rot.heading())*l;
  var dy = sin(rot.heading())*l;
  bullets.push(new Bullet(width/2+dx,height/2+dy,rot))
  return false;
}

// function timeCount(){
//     timer--;
// }
// setInterval(timeCount,1000);


function spawn (){
    time++;
    if(time % delay == 0){
        balls.push(new Ball());
    }
}

function Bullet (x,y,rot){
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.speed = 10;
    this.vel = rot.copy();
    this.vel.setMag(this.speed);
    this.hit = false;

    this.update = function (){
        this.pos.add(this.vel);
    }

    this.show = function(){
        fill(255);
        noStroke();
        ellipse(this.pos.x,this.pos.y,10);
    }

    this.struck = function(ball){
        var d = dist(this.pos.x,this.pos.y,ball.pos.x,ball.pos.y);
        if(d < ball.r){
            this.hit = true;
            ball.hit = true;
          //  p.score++;
        }
    }
    this.restrict = function(){
        if(this.pos.y > height || this.pos.y < 0 || this.pos.x > width || this.pos.x < 0){
            this.hit = true;
        }
    }
}

function Ball (){
    var y1 = random()<0.5?5:height-5;
    var x1 = random()<0.5?5:width-5;
    var x2 = random(width);
    var y2 = random(height);
    this.speed = 2;
    this.hit = false;
    this.r = 50
    this.pos = random()<0.5?createVector(x1,y2):createVector(x2,y1);
    this.vel = p5.Vector.sub(createVector(width/2,height/2),this.pos);
    this.vel.setMag(this.speed);

    this.update = function(){
        this.pos.add(this.vel);
    }

    this.show = function(){
        fill(255,255,0);
        stroke(0);
        strokeWeight(2);
        ellipse(this.pos.x,this.pos.y,this.r*2);
    }

}
