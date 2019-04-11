
function setup(){
  createCanvas(windowWidth,windowHeight);
}
var r = 10;
function draw (){
  background(50);
  fill(200,200,100);
  ellipse(width/2,height/2,r,r);
}

function touchStarted(){
  if(r < 100){
    r += 10;
  }
  else {
    r -= 80;
  }
  return false;
}
