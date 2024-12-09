let cg;
let pause = false;
let mouseMoving = false;
let timer = 0;

let x;
let y;

let xGridWalk;
let yGridWalk;

let scaleBlock;

let modeArray = [1,2,3,4];
let neutralMode;

let randomWalkScaleFactorX;
let randomWalkScaleFactorY;


let invertProb;
let mouseInvert = false;
let rotateProb;

let offsetRange;
let counter = 0;

let osc, freq;
let noteTimer;
let play = false;
let waveType;





function setup() {
  createCanvas(windowWidth, windowHeight);
  // calculateDimensions();
  setAttributes('antialias', true);
  canvas.imageSmoothingEnabled = false;
  cg = createGraphics(5 , 5);
 
  cg.noSmooth();
  cg.strokeWeight(0);
  cg.fill(20,200,50); //Pink RGB
  cg.fill(255,255,255); //Black RGB
 
  
  cg.square(0,0, 1);
  
  

  // x = width / 2;
  // y = height / 2;
  reroll();
  background(255);
  x = 0;
  y = 0;

  xGridWalk = 0;
  yGridWalk = 0;

  randomWalkScaleFactorX = random(.02,.15);
  randomWalkScaleFactorY = random(.02,.15);

  offsetRange = random(width*0,width*.1);

 
  env = new p5.Envelope();
  let attackLevel = .2;
  let sustainRatio = .75;
  let releaseLevel = 0;
  
  let attackTime = 0;
  let decayTime = .2;
  let releaseTime = .1;
  
  env.setRange(attackLevel, releaseLevel);
  env.setADSR(attackTime, decayTime, sustainRatio, releaseTime);
  osc = new p5.Oscillator();
  
  let delay = new p5.Delay(0.12, map(mouseY,0,height,0,1));
  osc.connect(delay);

  frameRate(20);
  

}

function draw() {
let prob = random (0,1);



 print(neutralMode);

if (neutralMode == 1){
  randomWalkNeutral(randomWalkScaleFactorX,randomWalkScaleFactorY);
  waveType = 'triangle';
  attackLevel = .2;
  sustainRatio = .75;
  releaseLevel = 0;
  
  attackTime = 0;
  decayTime = .2;
  releaseTime = .1;
}
 if (neutralMode == 2){
  gridWalkNeutral(scaleBlock);
  waveType  = 'sine';
} 
if (neutralMode == 3){
  spacedGridNeutral(scaleBlock);
  waveType  = 'square';
  attackLevel = .01;
  sustainRatio = .001;
  releaseLevel = 0;
  
  attackTime = 0;
  decayTime = .03;
  releaseTime = .02;
}
if (neutralMode == 4){
  randomPlaceNeutral();
  waveType  = 'sawtooth';
  attackLevel = .01;
  sustainRatio = .001;
  releaseLevel = 0;
  
  attackTime = 0;
  decayTime = .03;
  releaseTime = .2;


  print(attackLevel);
}





blendMode(BLEND);
    let obscureX = random(0,width);
    let obscureY = random(0,height);
    let obscureScale = random (100,400);
    
    if (prob<.5){
      fill(255);
      strokeWeight(0);
    square(obscureX,obscureY,obscureScale);
    }

  if (prob < .025) {
    background(255);
  }
  timer = timer+1;

  if (timer > 2){
    timer = 2;
  }
  
}

function mouseMoved() {
  timer = 0;
  if (timer <2){
    if (pause == false){
      x = mouseX;
      y = mouseY;
      mouseMoving = true;
      blendMode(EXCLUSION);

      if (mouseInvert == false){
      let scatterY = random(mouseY-offsetRange, mouseY+offsetRange);
      let scatterX = random(mouseX-offsetRange, mouseX+offsetRange);
      let scaleBlock = random (.075,.4);
      let rotateBlock = random ([0,PI/2,PI,(3*PI)/2]);
      play = !play;
      frequency = round(map(scatterX, 0, width, 50, 300));
      if (neutralMode == 4){
        frequency = round(map(scatterX, 0, width, 20, 100));
      }
      if (neutralMode == 2){
        frequency = round(map(scatterX, 0, width, 200, 500));
      }
      if (play) {
        env.play();
        osc.setType(waveType);
        osc.freq(frequency);
          push();
            translate(scatterX,scatterY);
            rotate(rotateBlock);
            image(cg, 0, 0, (1.25*scaleBlock)*width, (1.25*scaleBlock)*width);
          pop();
        play = false;
      } 
    }

      if (mouseInvert == true){
        
          let scatterY = random(height-mouseY-offsetRange, height-mouseY+offsetRange);
          let scatterX = random(width-mouseX-offsetRange, width-mouseX+offsetRange);
          let scaleBlock = random (.075,.4);
          let rotateBlock = random ([0,PI/2,PI,(3*PI)/2]);
          play = !play;
          frequency = round(map(scatterX, 0, width, 50, 300));
          if (play) {
            env.play();
            osc.setType(waveType);
            osc.freq(frequency);
              push();
              translate(scatterX,scatterY);
              rotate(rotateBlock);
              image(cg, 0, 0, (1.25*scaleBlock)*width, (1.25*scaleBlock)*width);
              pop();
            play = false;
          }
      }
      timer = timer-1;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){ 
  if(pause==false){
    noLoop();
    pause=true;
  }else{
    loop();
    pause = false;
  }
}

function keyPressed(){
  if (key == ' '){
    mouseReroll();
    reroll();
  }

  if (key == 's' || key == 'S'){
    saveCanvas('capture'+counter,'png');
    counter = counter + 1;
  }

  if (key == 'p' || key == 'P'){
    osc.start();
    osc.amp(env);
  }

}

  function doubleClicked() {
      mouseReroll();
      reroll();
}

function touchMoved(){
  timer = 0;
  if (timer <2){
    if (pause == false){
      x = mouseX;
      y = mouseY;
      mouseMoving = true;
      blendMode(EXCLUSION);
      if (mouseInvert == false){
      let scatterY = random(mouseY-offsetRange, mouseY+offsetRange);
      let scatterX = random(mouseX-offsetRange, mouseX+offsetRange);
      let scaleBlock = random (.2,.7);
      
      image(cg, scatterX, scatterY, (1.25*scaleBlock)*width, (1.25*scaleBlock)*width);
      } 

      if (mouseInvert == true){
        
          let scatterY = random(height-mouseY-offsetRange, height-mouseY+offsetRange);
          let scatterX = random(width-mouseX-offsetRange, width-mouseX+offsetRange);
          let scaleBlock = random (.2,.7);
          
          image(cg, scatterX, scatterY, (1.25*scaleBlock)*width, (1.25*scaleBlock)*width);
      }
      timer = timer-1;
    }
  }
}

function randomWalkNeutral(randomWalkScaleFactorX,randomWalkScaleFactorY){
  if (timer == 2) {
      blendMode(EXCLUSION);
        let rotateBlock = random ([0,PI/2,PI,(3*PI)/2]);
        let scatterY = random(mouseY-100, mouseY+100);
        let scatterX = random(mouseX-100, mouseX+100);
        let scaleBlock = random (.2,.65);
          play = !play;
          frequency = round(map(x, 0, width, 50, 300));
          if (play) {
            env.play();
            osc.setType(waveType);
            osc.freq(frequency);
            play = false;
          }
          push();
              translate(x,y);
              rotate(rotateBlock);
              image(cg, 0, 0, (1.25*scaleBlock)*width, (1.25*scaleBlock)*width);
              pop();
        // image(cg, x, y, (1.25*scaleBlock)*width, (1.25*scaleBlock)*width);
        const r = floor(random(4));
      switch (r) {
        case 0:
          x = x + scatterX*randomWalkScaleFactorX;
          break;
        case 1:
          x = x - scatterX*randomWalkScaleFactorX;
          break;
        case 2:
          y = y + scatterY*randomWalkScaleFactorY;;
          break;
        case 3:
          y = y - scatterY*randomWalkScaleFactorY;
          break;
      }
  }
}



function gridWalkNeutral (scaleBlock){
if (timer == 2) {
  blendMode(EXCLUSION);
    // scaleBlock = .4;
    
    let rotateBlock = random ([0,PI/2,PI,(3*PI)/2]);
    play = !play;
          frequency = round(map(xGridWalk, 0, width, 100, 300));
          if (play) {
            env.play();
            osc.setType(waveType);
            osc.freq(frequency);
            play = false;
          }
    if(rotateProb >.5){
          push();
          translate(xGridWalk,yGridWalk);
          rotate(rotateBlock);
          image(cg, 0, 0, (scaleBlock)*width, (scaleBlock)*width);
          pop();
} if (rotateProb <.5){
  image(cg, xGridWalk, yGridWalk, scaleBlock*width, scaleBlock*width);
}
   
    
    xGridWalk = xGridWalk+((scaleBlock*width)/4);
    
    if (xGridWalk > width){
      yGridWalk = yGridWalk + ((scaleBlock*width)/4);
      xGridWalk = 0;
    }

    if (yGridWalk > height){

    xGridWalk = 0;
    yGridWalk = 0;
    }

}
}

function spacedGridNeutral(scaleBlock){
  if (timer == 2) {
    blendMode(EXCLUSION);
      //    
      play = !play;
          frequency = round(map(xGridWalk, 0, width, 50, 300));
          if (play) {
            env.play();
            osc.setType(waveType);
            osc.freq(frequency);
            play = false;
          }

      image(cg, xGridWalk, yGridWalk, scaleBlock*width, scaleBlock*width);
      
      xGridWalk = xGridWalk+((scaleBlock)*scaleBlock*width);
      
      if (xGridWalk > width - ((scaleBlock)*scaleBlock*width)){
        yGridWalk = yGridWalk + ((scaleBlock)*scaleBlock*width);
        xGridWalk = 0;
      }
  
      if (yGridWalk > height){
  
      xGridWalk = 0;
      yGridWalk = 0;
      }
  
  }
}

function randomPlaceNeutral(){
  if (timer == 2) {
    blendMode(EXCLUSION);
    
      let x = random(0, width);
      let y = random(0, height);
      let scaleBlock = random (.2,.65);

      play = !play;
      frequency = round(map(x, 0, width, 1, 160));
      if (play) {
        env.play();
        osc.setType(waveType);
        osc.freq(frequency);
        play = false;
      }

      image(cg, x, y, (1.25*scaleBlock)*width, (1.25*scaleBlock)*width);

    }
}

function reroll(){
  let r = 255;
  let g = 255;
  let b = 255;

  let colorProb;
  colorProb = random(0,1);

  if (colorProb <  .7){
    r = 255;
    g = 255;
    b = 255;
  } if (colorProb > .7) {
    r = random(100,255);
    g = random (100,255);
    b = random (100,255);
  }
  cg.fill(r,g,b);
  cg.square(0,0, 1); 
 
  blendMode(BLEND);
  background(255);

  xGridWalk = random(width/3, width-width/3);
  yGridWalk = random(height/3, height-height/3);
  neutralMode = random(modeArray);

  if (neutralMode == 2){
   scaleBlock = random(.1,.5);
  } 

  if (neutralMode == 3){
    scaleBlock = random(.4,.65);
   } 

  randomWalkScaleFactorX = random(.02,.15);
  randomWalkScaleFactorY = random(.02,.15); 

  offsetRange = random(width*.05,width*.175);

  rotateProb = random(0,1);

  print(offsetRange);

  


}

function mouseReroll (){
  invertProb = random(0,1);

  if (invertProb > .4){
    mouseInvert = false;
  } if (invertProb < .4 ){
    mouseInvert = true;
  }
  
}


