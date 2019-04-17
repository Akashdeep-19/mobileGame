function Physics (){
  this.pos = createVector();
  this.vel = createVector();
  this.acc = createVector();
  this.rot = createVector(0,1);
  this.limit;
  this.friction = 1;

  this.update = function(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.mult(this.friction);
    if(this.limit)
      this.vel.limit(this.limit);
    this.acc.mult(0);
  }

  this.addForce = function(force){
    this.acc.add(force);
  }

  this.addTorque = function(torque){
    this.rot.rotate(torque);
  }
}
