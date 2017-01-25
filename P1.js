// UBC CPSC 314 (2015W2) -- P1
// HAVE FUN!!! :)

// ASSIGNMENT-SPECIFIC API EXTENSION
THREE.Object3D.prototype.setMatrix = function(a) {
  this.matrix=a;
  this.matrix.decompose(this.position,this.quaternion,this.scale);
}

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

//renderer.setClearColor(0xFFFFFF);
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(45,20,70);
camera.lookAt(scene.position);
scene.add(camera);

// AMBIENT LIGHT
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

// DIRECTIONAL LIGHT
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.3 );
directionalLight.position.set( 1, 2, 0.5 );
scene.add( directionalLight );


// skybox code from http://blog.romanliutikov.com/post/58705840698/skybox-and-environment-map-in-threejs
var urls = [
  'skybox/posx.jpg',
  'skybox/negx.jpg',
  'skybox/posy.jpg',
  'skybox/negy.jpg',
  'skybox/posz.jpg',
  'skybox/negz.jpg'
];

var cubemap = THREE.ImageUtils.loadTextureCube(urls); // load textures
cubemap.format = THREE.RGBFormat;

var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
shader.uniforms['tCube'].value = cubemap; // apply textures to shader

// create shader material
var skyBoxMaterial = new THREE.ShaderMaterial( {
  fragmentShader: shader.fragmentShader,
  vertexShader: shader.vertexShader,
  uniforms: shader.uniforms,
  depthWrite: false,
  side: THREE.BackSide
});

// create skybox mesh
var skybox = new THREE.Mesh(
  new THREE.CubeGeometry(1000, 1000, 1000),
  skyBoxMaterial
);

scene.add(skybox);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

// SETUP HELPER GRID
// Note: Press Z to show/hide
var gridGeometry = new THREE.Geometry();
var i;
for(i=-50;i<51;i+=2) {
    gridGeometry.vertices.push( new THREE.Vector3(i,0,-50));
    gridGeometry.vertices.push( new THREE.Vector3(i,0,50));
    gridGeometry.vertices.push( new THREE.Vector3(-50,0,i));
    gridGeometry.vertices.push( new THREE.Vector3(50,0,i));
}

var gridMaterial = new THREE.LineBasicMaterial({color:0xBBBBBB});
var grid = new THREE.Line(gridGeometry,gridMaterial,THREE.LinePieces);

/////////////////////////////////
//   YOUR WORK STARTS BELOW    //
/////////////////////////////////

// MATERIALS
// Note: Feel free to be creative with this! 
var normalMaterial = new THREE.MeshLambertMaterial({color: 0x87421F});

var tentacleMaterial = new THREE.MeshLambertMaterial({color: 0xFC1501});

var stentacleMaterial = new THREE.MeshLambertMaterial({color: 0xD66F62});

var clawMaterial = new THREE.MeshLambertMaterial({color: 0xe1d3c1});

// function drawCube()
// Draws a unit cube centered about the origin.
// Note: You will be using this for all of your geometry
function makeCube() {
  var unitCube = new THREE.BoxGeometry(1,1,1);
  return unitCube;
}

// GEOMETRY: Define scale of cubes for body parts of mole
var torsoGeometry = makeCube();
var non_uniform_scale = new THREE.Matrix4().set(6,0,0,0, 0,5,0,0, 0,0,10,0, 0,0,0,1);
torsoGeometry.applyMatrix(non_uniform_scale);

var bigTorsoGeometry = makeCube();
var bigTorso_scale = new THREE.Matrix4().set(6,0,0,0, 0,6.5,0,0, 0,0,5,0, 0,0,0,1);
bigTorsoGeometry.applyMatrix(bigTorso_scale);

var pawGeometry = makeCube();
var paw_scale = new THREE.Matrix4().set(4,0,0,0, 0,2,0,0, 0,0,4,0, 0,0,0,1);
pawGeometry.applyMatrix(paw_scale);

var headGeometry = makeCube();
var head_scale = new THREE.Matrix4().set(4,0,0,0, 0,4,0,0, 0,0,4,0, 0,0,0,1);
headGeometry.applyMatrix(head_scale);

var noseGeometry = makeCube();
var nose_scale = new THREE.Matrix4().set(3,0,0,0, 0,3,0,0, 0,0,3,0, 0,0,0,1);
noseGeometry.applyMatrix(nose_scale);

var clawGeometry = makeCube();
var claw_scale = new THREE.Matrix4().set(0.5,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
clawGeometry.applyMatrix(claw_scale);

var tailGeometry = makeCube();
var tail_scale = new THREE.Matrix4().set(3.5,0,0,0, 0,3.5,0,0, 0,0,4,0, 0,0,0,1);
tailGeometry.applyMatrix(tail_scale);

var stailGeometry = makeCube();
var stail_scale = new THREE.Matrix4().set(2,0,0,0, 0,2,0,0, 0,0,3,0, 0,0,0,1);
stailGeometry.applyMatrix(stail_scale);

var sstailGeometry = makeCube();
var sstail_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,2,0, 0,0,0,1);
sstailGeometry.applyMatrix(sstail_scale);

var ltGeometry = makeCube();
var lt_scale = new THREE.Matrix4().set(0.6,0,0,0, 0,0.6,0,0, 0,0,3,0, 0,0,0,1);
ltGeometry.applyMatrix(lt_scale);

var stGeometry = makeCube();
var st_scale = new THREE.Matrix4().set(0.4,0,0,0, 0,0.4,0,0, 0,0,3,0, 0,0,0,1);
stGeometry.applyMatrix(st_scale);

var eyeGeometry = makeCube();
var eye_scale = new THREE.Matrix4().set(0.4,0,0,0, 0,0.4,0,0, 0,0,3,0, 0,0,0,1);

// TO-DO: SPECIFY THE REST OF YOUR STAR-NOSE MOLE'S GEOMETRY. 
// Note: You will be using transformation matrices to set the shape. 
// Note: You are not allowed to use the tools Three.js provides for 
//       rotation, translation and scaling.
// Note: The torso has been done for you (but feel free to modify it!)  
// Hint: Explicity declare new matrices using Matrix4().set     

// MATRICES
var torsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
var finalTorsoMatrix = torsoMatrix;
var torsoRotMatrix = torsoMatrix;

var bigTorsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
var finalbigTorsoMatrix = bigTorsoMatrix;
var bigTorsoRotMatrix = bigTorsoMatrix;

var headMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,7, 0,0,0,1);
var finalHeadMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, headMatrix);
var headRotMatrix = headMatrix;

var noseMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,3, 0,0,0,1);
var finalNoseMatrix = new THREE.Matrix4().multiplyMatrices(finalHeadMatrix, noseMatrix);
var noseRotMatrix = noseMatrix;

var flMatrix = new THREE.Matrix4().set(1,0,0,3, 0,1,0,-3, 0,0,1,3, 0,0,0,1);
var finalflMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, flMatrix);
var flRotMatrix = flMatrix;

var frMatrix = new THREE.Matrix4().set(1,0,0,-3, 0,1,0,-3, 0,0,1,3, 0,0,0,1);
var finalfrMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, frMatrix);
var frRotMatrix = frMatrix;

var blMatrix = new THREE.Matrix4().set(1,0,0,3, 0,1,0,-3, 0,0,1,-3, 0,0,0,1);
var finalblMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, blMatrix);
var blRotMatrix = blMatrix;

var brMatrix = new THREE.Matrix4().set(1,0,0,-3, 0,1,0,-3, 0,0,1,-3, 0,0,0,1);
var finalbrMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, brMatrix);
var brRotMatrix = brMatrix;

var flclawsMatrix = [];
var flclawsRotMatrix = [];
makeClawMatrix(flclawsMatrix, flclawsRotMatrix, finalflMatrix);
//makeClawRotMatrix(flclawsRotMatrix);

var frclawsMatrix = [];
var frclawsRotMatrix = [];
makeClawMatrix(frclawsMatrix, frclawsRotMatrix, finalfrMatrix);
//makeClawRotMatrix(frclawsRotMatrix);

var blclawsMatrix = [];
var blclawsRotMatrix =[];
makeClawMatrix(blclawsMatrix, blclawsRotMatrix, finalblMatrix);
//makeClawRotMatrix(blclawsRotMatrix);

var brclawsMatrix = [];
var brclawsRotMatrix = [];
makeClawMatrix(brclawsMatrix, brclawsRotMatrix, finalbrMatrix);
//makeClawRotMatrix(brclawsRotMatrix);

var tailMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-0.5, 0,0,1,-7, 0,0,0,1);
var finalTailMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, tailMatrix);
var tailRotMatrix = tailMatrix;

var stailMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-0.5, 0,0,1,-3, 0,0,0,1);
var finalsTailMatrix = new THREE.Matrix4().multiplyMatrices(finalTailMatrix, stailMatrix);
var stailRotMatrix = stailMatrix;

var sstailMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-0.5, 0,0,1,-2, 0,0,0,1);
var finalssTailMatrix = new THREE.Matrix4().multiplyMatrices(finalsTailMatrix, sstailMatrix);
var sstailRotMatrix = sstailMatrix;

var tMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2, 0,0,1,2.5, 0,0,0,1);
var numLTentacles = 18;
var tentacles = [];
var tentacleMatrix = [];
var tentacleRotMatrix =[];
makeTentacleMatrix(tentacles, tentacleMatrix, tentacleRotMatrix);

var stMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,1, 0,0,1,2.5, 0,0,0,1);
var numSTentacles = 4;
var sTentacles = [];
var sTentacleMatrix = [];
var sTentacleRotMatrix = [];
makeSmallTentacleMatrix(sTentacles, sTentacleMatrix, sTentacleRotMatrix);

// CREATE BODY
var torso = new THREE.Mesh(torsoGeometry,normalMaterial);
var bigTorso = new THREE.Mesh(bigTorsoGeometry,normalMaterial);

var head = new THREE.Mesh(headGeometry,normalMaterial);
var nose = new THREE.Mesh(noseGeometry,normalMaterial);

var flpaw = new THREE.Mesh(pawGeometry,normalMaterial);
var frpaw = new THREE.Mesh(pawGeometry,normalMaterial);
var blpaw = new THREE.Mesh(pawGeometry,normalMaterial);
var brpaw = new THREE.Mesh(pawGeometry,normalMaterial);

var flclaws = [];
makeClaws(flclaws, flclawsMatrix);

var frclaws = [];
makeClaws(frclaws, frclawsMatrix);

var blclaws = [];
makeClaws(blclaws, blclawsMatrix);

var brclaws = [];
makeClaws(brclaws, brclawsMatrix);

var tail = new THREE.Mesh(tailGeometry,normalMaterial);
var stail = new THREE.Mesh(stailGeometry,normalMaterial);
var sstail = new THREE.Mesh(sstailGeometry,normalMaterial);

torso.setMatrix(finalTorsoMatrix);
bigTorso.setMatrix(finalbigTorsoMatrix);

head.setMatrix(finalHeadMatrix);
nose.setMatrix(finalNoseMatrix);

flpaw.setMatrix(finalflMatrix);
frpaw.setMatrix(finalfrMatrix);
blpaw.setMatrix(finalblMatrix);
brpaw.setMatrix(finalbrMatrix);


tail.setMatrix(finalTailMatrix);
stail.setMatrix(finalsTailMatrix);
sstail.setMatrix(finalssTailMatrix);

scene.add(torso);
scene.add(bigTorso);

scene.add(head);
scene.add(nose);

scene.add(flpaw);
scene.add(frpaw);
scene.add(blpaw);
scene.add(brpaw);

scene.add(tail);
scene.add(stail);
scene.add(sstail);


// TO-DO: PUT TOGETHER THE REST OF YOUR STAR-NOSED MOLE AND ADD TO THE SCENE!
// Hint: Hint: Add one piece of geometry at a time, then implement the motion for that part. 
//             Then you can make sure your hierarchy still works properly after each step.

// APPLY DIFFERENT JUMP CUTS/ANIMATIONS TO DIFFERNET KEYS
// Note: The start of "U" animation has been done for you, you must implement the hiearchy and jumpcut.
// Hint: There are other ways to manipulate and grab clock values!!
// Hint: Check THREE.js clock documenation for ideas.
// Hint: It may help to start with a jumpcut and implement the animation after.
// Hint: Where is updateBody() called?

var clock = new THREE.Clock(true);

var p0; // start position or angle
var p1; // end position or angle
var time_length; // total time of animation
var time_start; // start time of animation
var time_end; // end time of animation
var p; // current frame

var jumpcut = false; // jumpcut?
var swim_state = 0; //current swim state
var s_press = 0; //current s press state


// function init_animation()
// Initializes parameters and sets animate flag to true.
// Input: start position or angle, end position or angle, and total time of animation.

function init_animation(p_start,p_end,t_length){
  p0 = p_start;
  p1 = p_end;
  time_length = t_length;
  time_start = clock.getElapsedTime();
  time_end = time_start + time_length;
  return;
}

function updateBody() {
  switch(true)
  {
    // Body Tilt up
    case(key == "U"):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
         p = p1;
         break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
      }
      
      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(-p),-Math.sin(-p), 0, 
                                            0, Math.sin(-p), Math.cos(-p), 0,
                                            0,        0,         0,        1);

      rotateAll(rotateZ);

      u_state = 1;

      break;

      // TO-DO: IMPLEMENT JUMPCUT/ANIMATION FOR EACH KEY!
      // Note: Remember spacebar sets jumpcut/animate!
      
    // Body tilt down
    case(key == "E"):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
      }

      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(p),-Math.sin(p), 0, 
                                            0, Math.sin(p), Math.cos(p), 0,
                                            0,        0,         0,        1);

      rotateAll(rotateZ);
      
      break;

	  // tail move right
	  case(key == "T"):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
      }

      var rotateX = new THREE.Matrix4().set(Math.cos(-p),	 0,	Math.sin(-p),	0,
      										                             0,	 1,	     0,				0,
      										                 -Math.sin(-p),	 0,	Math.cos(-p),	0,
      										                             0,	 0,	     0,				1);

      rotateTail(rotateX);

      break;
      
    // tail move left
	  case(key == "V"):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
      }

      var rotateX = new THREE.Matrix4().set(Math.cos(p),	0,	Math.sin(p),	0,
      										                          0,		1,	      0,			0,
      										                 -Math.sin(p),	0,	Math.cos(p),	0,
      										                          0,		0,	      0,			1);

      rotateTail(rotateX);

      break
      
    // DIG
    case(key == "D"):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
      }

      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(4*p/5),-Math.sin(4*p/5), 0, 
                                            0, Math.sin(4*p/5), Math.cos(4*p/5), 0,
                                            0,        0,         0,        1);

      rotateFl(rotateZ);

      rotateFr(rotateZ);


      rotateClaws(flclaws, flclawsMatrix, flclawsRotMatrix, rotateZ, finalflMatrix);
      rotateClaws(frclaws, frclawsMatrix, frclawsRotMatrix, rotateZ, finalfrMatrix);

      break;

    // head move right
    case(key == "H"):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
      }

      var rotateX = new THREE.Matrix4().set(Math.cos(-p), 0,  Math.sin(-p), 0,
                                                    0,    1,        0,      0,
                                           -Math.sin(-p), 0,  Math.cos(-p), 0,
                                                    0,    0,        0,      1);

      rotateHead(rotateX);

      break;

    // head move left
    case(key == "G"):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
      }

      var rotateX = new THREE.Matrix4().set(Math.cos(p), 0,  Math.sin(p), 0,
                                                    0,    1,        0,      0,
                                           -Math.sin(p), 0,  Math.cos(p), 0,
                                                    0,    0,        0,      1);

      rotateHead(rotateX);

      break;

      //first swim motion
    case(key == "S" && swim_state == 0):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
      }

      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(p),-Math.sin(p), 0, 
                                            0, Math.sin(p), Math.cos(p), 0,
                                            0,        0,         0,        1);

      var rotateZT = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(-p/2),-Math.sin(-p/2), 0, 
                                            0, Math.sin(-p/2), Math.cos(-p/2), 0,
                                            0,        0,         0,        1);

      var rotateX = new THREE.Matrix4().set(Math.cos(-p), 0,  Math.sin(-p), 0,
                                                    0,    1,        0,      0,
                                           -Math.sin(-p), 0,  Math.cos(-p), 0,
                                                    0,    0,        0,      1);


      rotateTail(rotateX);
      rotateBr(rotateZ);
      rotateFl(rotateZ);
      rotateHead(rotateX);

      rotateTentacles(tentacles, tentacleMatrix, tentacleRotMatrix, rotateZT);
      rotateSmallTentacles(sTentacles, sTentacleMatrix, sTentacleRotMatrix, rotateZT);

      updateClaws(flclaws, flclawsMatrix, flclawsRotMatrix, finalflMatrix);
      updateClaws(frclaws, frclawsMatrix, frclawsRotMatrix, finalfrMatrix);
      updateClaws(blclaws, blclawsMatrix, blclawsRotMatrix, finalblMatrix);
      updateClaws(brclaws, brclawsMatrix, brclawsRotMatrix, finalbrMatrix);


      s_press = 1;

      break;

    //second swim state
    case(key == "S" && swim_state == 1):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      var temp = (p0 - p1)*((time-time_start)/time_length) + p1;
      var temp2 = (2*p1)*((time-time_start)/time_length) - p1;
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
        var temp = -p0;
        var temp2 = p1;
      }



      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(p),-Math.sin(p), 0, 
                                            0, Math.sin(p), Math.cos(p), 0,
                                            0,        0,         0,        1);

      var rotateX = new THREE.Matrix4().set(Math.cos(p), 0,  Math.sin(p), 0,
                                                    0,    1,        0,      0,
                                           -Math.sin(p), 0,  Math.cos(p), 0,
                                                    0,    0,        0,      1);

      var rotate2X = new THREE.Matrix4().set(Math.cos(temp2), 0,  Math.sin(temp2), 0,
                                                    0,    1,        0,      0,
                                           -Math.sin(temp2), 0,  Math.cos(temp2), 0,
                                                    0,    0,        0,      1);

      var rotateZBack = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(temp),-Math.sin(temp), 0, 
                                            0, Math.sin(temp), Math.cos(temp), 0,
                                            0,        0,         0,        1);

      
      rotateFr(rotateZ);
      rotateBl(rotateZ);

      rotateBr(rotateZBack);
      rotateFl(rotateZBack);

      rotateTail(rotate2X);
      rotateHead(rotate2X);

      updateClaws(flclaws, flclawsMatrix, flclawsRotMatrix, finalflMatrix);
      updateClaws(frclaws, frclawsMatrix, frclawsRotMatrix, finalfrMatrix);
      updateClaws(blclaws, blclawsMatrix, blclawsRotMatrix, finalblMatrix);
      updateClaws(brclaws, brclawsMatrix, brclawsRotMatrix, finalbrMatrix);

      s_press = 2;

      break;

    //final swim state
    case(key == "S" && swim_state == 2):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      var temp = (p0 - p1)*((time-time_start)/time_length) - p0;
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
        var temp = p1;
      }

      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(p),-Math.sin(p), 0, 
                                            0, Math.sin(p), Math.cos(p), 0,
                                            0,        0,         0,        1);

      var rotateZT = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(-p/2),-Math.sin(-p/2), 0, 
                                            0, Math.sin(-p/2), Math.cos(-p/2), 0,
                                            0,        0,         0,        1);

      var rotateX = new THREE.Matrix4().set(Math.cos(p), 0,  Math.sin(p), 0,
                                                    0,    1,        0,      0,
                                           -Math.sin(p), 0,  Math.cos(p), 0,
                                                    0,    0,        0,      1);

      var rotateXBack = new THREE.Matrix4().set(Math.cos(-temp), 0,  Math.sin(-temp), 0,
                                                    0,    1,        0,      0,
                                           -Math.sin(-temp), 0,  Math.cos(-temp), 0,
                                                    0,    0,        0,      1);

      var rotateZBack = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(0),-Math.sin(0), 0, 
                                            0, Math.sin(0), Math.cos(0), 0,
                                            0,        0,         0,        1);

      rotateTail(rotateXBack);
      rotateFr(rotateZ);
      rotateBl(rotateZ);

      rotateBr(rotateZBack);
      rotateFl(rotateZBack);

      rotateHead(rotateXBack);

      rotateTentacles(tentacles, tentacleMatrix, tentacleRotMatrix, rotateZT);
      rotateSmallTentacles(sTentacles, sTentacleMatrix, sTentacleRotMatrix, rotateZT);

      updateClaws(flclaws, flclawsMatrix, flclawsRotMatrix, finalflMatrix);
      updateClaws(frclaws, frclawsMatrix, frclawsRotMatrix, finalfrMatrix);
      updateClaws(blclaws, blclawsMatrix, blclawsRotMatrix, finalblMatrix);
      updateClaws(brclaws, brclawsMatrix, brclawsRotMatrix, finalbrMatrix);

      s_press = 0;

      break;

      // nose fan out 
    case(key == "N"):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
         p = p1;
         break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
      }
      
      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(-p/2),-Math.sin(-p/2), 0, 
                                            0, Math.sin(-p/2), Math.cos(-p/2), 0,
                                            0,        0,         0,        1);

      rotateTentacles(tentacles, tentacleMatrix, tentacleRotMatrix, rotateZ);
      rotateSmallTentacles(sTentacles, sTentacleMatrix, sTentacleRotMatrix, rotateZ);

      break;

    // nose fan in/close
    case(key == "C"):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
         p = p1;
         break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
      }
      
      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(p/2),-Math.sin(p/2), 0, 
                                            0, Math.sin(p/2), Math.cos(p/2), 0,
                                            0,        0,         0,        1);

      rotateTentacles(tentacles, tentacleMatrix, tentacleRotMatrix, rotateZ);
      rotateSmallTentacles(sTentacles, sTentacleMatrix, sTentacleRotMatrix, rotateZ);

      break;

    // pew pew
    case(key == "P"):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
         p = p1;
         break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
      }

      var translateForward = new THREE.Matrix4().set(1,        0,         0,        0, 
                                                0,        1,         0,        0, 
                                                0,        0,         1,      -50*p,
                                                0,        0,         0,        1);

      var translateBack = new THREE.Matrix4().set(1,        0,         0,        0, 
                                                0,        1,         0,        0, 
                                                0,        0,         1,      50*p,
                                                0,        0,         0,        1);
      
      var translateForwardL = new THREE.Matrix4().set(1,        0,         0,       -50*p, 
                                                0,        1,         0,        50*p, 
                                                0,        0,         1,      -50*p,
                                                0,        0,         0,        1);

      var translateForwardR = new THREE.Matrix4().set(1,        0,         0,        50*p, 
                                                0,        1,         0,        50*p, 
                                                0,        0,         1,      -50*p,
                                                0,        0,         0,        1);

      var translateGoneR = new THREE.Matrix4().set(1,        0,         0,        50*p, 
                                                0,        1,         0,        50*p, 
                                                0,        0,         1,      50*p,
                                                0,        0,         0,        1);

       var translateGoneL = new THREE.Matrix4().set(1,        0,         0,        -50*p, 
                                                0,        1,         0,        50*p, 
                                                0,        0,         1,      50*p,
                                                0,        0,         0,        1);


      rotateFr(translateForwardR);
      rotateFl(translateForwardL);
      rotateBr(translateGoneR);
      rotateBl(translateGoneL);

      rotateTail(translateBack);

      updateClaws(flclaws, flclawsMatrix, flclawsRotMatrix, finalflMatrix);
      updateClaws(frclaws, frclawsMatrix, frclawsRotMatrix, finalfrMatrix);
      updateClaws(blclaws, blclawsMatrix, blclawsRotMatrix, finalblMatrix);
      updateClaws(brclaws, brclawsMatrix, brclawsRotMatrix, finalbrMatrix);

      rotateHead(translateForward);

      rotateSmallTentacles(sTentacles, sTentacleMatrix, sTentacleRotMatrix, translateForward);
      
      break;

    // jump
    case(key == "J"):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
         p = p1;
         break;
      }

      if (!jumpcut){
      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      // if in jumpcut mode
      } else if (jumpcut) {
        p = p1;
      }
      
      var translateUp = new THREE.Matrix4().set(1,        0,         0,        0, 
                                                0,        1,         0,     25*Math.cos(2*p), 
                                                0,        0,         1,        0,
                                                0,        0,         0,        1);

      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, -Math.cos(4*p),Math.sin(4*p), 0, 
                                            0, -Math.sin(4*p), -Math.cos(4*p), 0,
                                            0,        0,         0,        1);

      var upSpin = new THREE.Matrix4().multiplyMatrices(translateUp, rotateZ);
      rotateAll(upSpin);

      break;
  }
}

// LISTEN TO KEYBOARD
// Hint: Pay careful attention to how the keys already specified work!
var keyboard = new THREEx.KeyboardState();
var grid_state = false;
var key;
keyboard.domElement.addEventListener('keydown',function(event){
  if (event.repeat)
    return;
  if(keyboard.eventMatches(event,"Z")){  // Z: Reveal/Hide helper grid
    grid_state = !grid_state;
    grid_state? scene.add(grid) : scene.remove(grid);}   
  else if(keyboard.eventMatches(event,"0")){    // 0: Set camera to neutral position, view reset
    camera.position.set(45,0,0);
    camera.lookAt(scene.position);}
  else if(keyboard.eventMatches(event,"U")){ 
    (key == "U")? (init_animation(p1,p0,time_length)) : (init_animation(0,Math.PI/4,1), key = "U")}

  // TO-DO: BIND KEYS TO YOUR JUMP CUTS AND ANIMATIONS
  // Note: Remember spacebar sets jumpcut/animate! 
  // Hint: Look up "threex.keyboardstate by Jerome Tienne" for more info.

  //Body tilt down
  else if(keyboard.eventMatches(event,"E")){ 
    (key == "E")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "E")}
    
  //Tail move right
  else if(keyboard.eventMatches(event,"T")){ 
    (key == "T")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "T")}
    
  //Tail move left
  else if(keyboard.eventMatches(event,"V")){ 
    (key == "V")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "V")}

  //Dig
  else if(keyboard.eventMatches(event,"D")){ 
    (key == "D")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "D")}

  //Head move right
  else if(keyboard.eventMatches(event,"H")){ 
    (key == "H")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "H")}

  //Head move left
  else if(keyboard.eventMatches(event,"G")){ 
    (key == "G")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "G")}

  //nose fan out
  else if(keyboard.eventMatches(event,"N")){ 
    (key == "N")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "N")}

  //nose fan in/close
  else if(keyboard.eventMatches(event,"C")){ 
    (key == "C")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "C")}

  //jump
  else if(keyboard.eventMatches(event,"J")){ 
    init_animation(Math.PI/4,-Math.PI/4,1);
    key = "J"
  }

  //pew pew explosion
  else if(keyboard.eventMatches(event,"P")){ 
     (key == "P")? init_animation(p1,p0,time_length) : (init_animation(0,-Math.PI/4,1), key = "P")
  }

  //Swim1
  else if(keyboard.eventMatches(event,"S") && s_press == 0){
    init_animation(0,Math.PI/4,1); 
    key = "S";
    swim_state = 0;
  }

  //Swim2
  else if(keyboard.eventMatches(event,"S") && s_press == 1){ 
    init_animation(0,Math.PI/4,1);
    key = "S";
    swim_state = 1;
  }

  //Swim3
  else if(keyboard.eventMatches(event,"S") && s_press == 2){ 
    init_animation(p1,p0,time_length);
    key = "S";
    swim_state = 2;
  }

  //toggle jumpcut
  else if(keyboard.eventMatches(event,"space")){
    jumpcut = !jumpcut;
  }

  else{
    return;
  }

});
//helper to rotate all parts of the mole according to torso for tilt up and tilt down
function rotateAll(rot) {
  //update to keep the hierarchy of the mole in order

  finalTorsoMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix, rot);
  torso.setMatrix(finalTorsoMatrix);

  finalbigTorsoMatrix = new THREE.Matrix4().multiplyMatrices(bigTorsoRotMatrix, rot);
  bigTorso.setMatrix(finalbigTorsoMatrix);

  finalHeadMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, headRotMatrix);
  head.setMatrix(finalHeadMatrix);

  finalNoseMatrix = new THREE.Matrix4().multiplyMatrices(finalHeadMatrix, noseRotMatrix);
  nose.setMatrix(finalNoseMatrix);

  finalTailMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, tailRotMatrix);
  tail.setMatrix(finalTailMatrix);

  finalsTailMatrix = new THREE.Matrix4().multiplyMatrices(finalTailMatrix, stailRotMatrix);
  stail.setMatrix(finalsTailMatrix);

  finalssTailMatrix = new THREE.Matrix4().multiplyMatrices(finalsTailMatrix, sstailRotMatrix);
  sstail.setMatrix(finalssTailMatrix);

  finalflMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, flRotMatrix);
  flpaw.setMatrix(finalflMatrix);

  finalfrMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, frRotMatrix);
  frpaw.setMatrix(finalfrMatrix);

  finalblMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, blRotMatrix);
  blpaw.setMatrix(finalblMatrix);

  finalbrMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, brRotMatrix);
  brpaw.setMatrix(finalbrMatrix);

  updateClaws(flclaws, flclawsMatrix, flclawsRotMatrix, finalflMatrix);
  updateClaws(frclaws, frclawsMatrix, frclawsRotMatrix, finalfrMatrix);
  updateClaws(blclaws, blclawsMatrix, blclawsRotMatrix, finalblMatrix);
  updateClaws(brclaws, brclawsMatrix, brclawsRotMatrix, finalbrMatrix);

  updateTentacles(tentacles, tentacleMatrix, tentacleRotMatrix);
  updateTentacles(sTentacles, sTentacleMatrix, sTentacleRotMatrix);
}


// make array of 5 claw matrice and clawRotMatrix given the paw matrix
function makeClawMatrix(clawMatrix, clawRotMatrix, finalPawMatrix){
  for (i = 0; i <= 4; i++){
    var tempclawMatrix = new THREE.Matrix4().set(1,0,0, -2+i, 0,1,0,-0.5, 0,0,1,2.5, 0,0,0,1);
    var finalClawMatrix = new THREE.Matrix4().multiplyMatrices(tempclawMatrix, finalPawMatrix);
    clawMatrix.push(finalClawMatrix);
    clawRotMatrix.push(tempclawMatrix);
  }
}

// make 5 claws objects and add them to the scene
function makeClaws(clawArray, clawMatrix){
  for (i = 0; i <= 4; i++){
  var claw = new THREE.Mesh(clawGeometry,clawMaterial);
      claw.setMatrix(clawMatrix[i]);
      clawArray.push(claw);
      scene.add(clawArray[i]);
    }
}

// update the matrices of the claws and then set the claws with the updated matrices
function updateClaws(clawArray, clawMatrix, rotClawMatrix, pawMatrix){
  for (i = 0; i <= 4; i++){
      clawMatrix[i] = new THREE.Matrix4().multiplyMatrices(pawMatrix, rotClawMatrix[i]);
      clawArray[i].setMatrix(clawMatrix[i]);
    }
}

// rotate the claws of a paw according to hieararchy, also update the array of claw rotation matrices
function rotateClaws(claws, clawsMatrix, rotClawMatrix, rotMatrix, pawMatrix){
  for (i = 0; i <= clawsMatrix.length - 1; i++) {
    var tempclawMatrix = new THREE.Matrix4().set(1,0,0, -2+i, 0,1,0,-0.5, 0,0,1,2.5, 0,0,0,1);
    var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(tempclawMatrix, rotMatrix);
    var finalClawMatrix = new THREE.Matrix4().multiplyMatrices(pawMatrix, clawRotMatrix);
    rotClawMatrix[i] = clawRotMatrix;
    claws[i].setMatrix(finalClawMatrix);
    clawsMatrix[i] = finalClawMatrix;
  }
}

// rotate and update/keep the hierarchy of the head parts
function rotateHead(rot){
  var headShift  = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,2, 0,0,0,1);
  var rotatedHead = new THREE.Matrix4().multiplyMatrices(rot, headShift);

  // move head back to original position after rotation
  var headBack = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-2, 0,0,0,1);
  var tempH = new THREE.Matrix4().multiplyMatrices(headBack, rotatedHead);

  headRotMatrix = new THREE.Matrix4().multiplyMatrices(headMatrix, tempH);
  finalHeadMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, headRotMatrix);
  head.setMatrix(finalHeadMatrix);

  var noseShift  = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,2, 0,0,0,1);
  var rotatedNose = new THREE.Matrix4().multiplyMatrices(rot, noseShift);

  // move head back to original position after rotation
  var noseBack = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-2, 0,0,0,1);
  var tempN = new THREE.Matrix4().multiplyMatrices(noseBack, rotatedNose);

  noseRotMatrix = new THREE.Matrix4().multiplyMatrices(noseMatrix, tempN);

  finalNoseMatrix = new THREE.Matrix4().multiplyMatrices(finalHeadMatrix, noseRotMatrix);
  nose.setMatrix(finalNoseMatrix);

  updateTentacles(tentacles, tentacleMatrix, tentacleRotMatrix);
  updateTentacles(sTentacles, sTentacleMatrix, sTentacleRotMatrix);
}

// rotate and update/keep the hierarchy of the tail parts
function rotateTail(rot){
  var tailShift  = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-3, 0,0,0,1);
  var rotateTail = new THREE.Matrix4().multiplyMatrices(rot, tailShift);

  // move tail back to original position after rotation
  var tailBack = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,3, 0,0,0,1);
  var tempT = new THREE.Matrix4().multiplyMatrices(tailBack, rotateTail);

  tailRotMatrix = new THREE.Matrix4().multiplyMatrices(tailMatrix, tempT);
  finalTailMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, tailRotMatrix);
  tail.setMatrix(finalTailMatrix);

  var stailShift  = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-1, 0,0,0,1);
  var rotatesTail = new THREE.Matrix4().multiplyMatrices(rot, stailShift);

  // move tail back to original position after rotation
  var stailBack = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,1, 0,0,0,1);
  var tempsT = new THREE.Matrix4().multiplyMatrices(stailBack, rotatesTail);

  stailRotMatrix = new THREE.Matrix4().multiplyMatrices(stailMatrix, tempsT);
  finalsTailMatrix = new THREE.Matrix4().multiplyMatrices(finalTailMatrix, stailRotMatrix);
  stail.setMatrix(finalsTailMatrix);

  var sstailShift  = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-1, 0,0,0,1);
  var rotatessTail = new THREE.Matrix4().multiplyMatrices(rot, sstailShift);

  // move tail back to original position after rotation
  var sstailBack = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,1, 0,0,0,1);
  var tempssT = new THREE.Matrix4().multiplyMatrices(sstailBack, rotatessTail);

  sstailRotMatrix = new THREE.Matrix4().multiplyMatrices(sstailMatrix, tempssT);
  finalssTailMatrix = new THREE.Matrix4().multiplyMatrices(finalsTailMatrix, sstailRotMatrix);
  sstail.setMatrix(finalssTailMatrix);
}

// rotate flpaw
function rotateFl(rot){
  flRotMatrix = new THREE.Matrix4().multiplyMatrices(flMatrix, rot);
  finalflMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, flRotMatrix);
  flpaw.setMatrix(finalflMatrix);
}

// rotate frpaw
function rotateFr(rot){
  frRotMatrix = new THREE.Matrix4().multiplyMatrices(frMatrix, rot);
  finalfrMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, frRotMatrix);
  frpaw.setMatrix(finalfrMatrix);
}

// rotate blpaw
function rotateBl(rot){
  blRotMatrix = new THREE.Matrix4().multiplyMatrices(blMatrix, rot);
  finalblMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, blRotMatrix);
  blpaw.setMatrix(finalblMatrix);
}

// rotate brpaw
function rotateBr(rot){
  brRotMatrix = new THREE.Matrix4().multiplyMatrices(brMatrix, rot);
  finalbrMatrix = new THREE.Matrix4().multiplyMatrices(finalTorsoMatrix, brRotMatrix);
  brpaw.setMatrix(finalbrMatrix);
}

// initialize and create the large tentacles
function makeTentacleMatrix(tentacleArray, tentacleMatrixArray, tentacleRotMatrixArray){
  for (i = 0; i <= numLTentacles - 1; i++){
    var offset = 4*Math.PI/5;
    var angle = (i+1)*(2*Math.PI/numLTentacles)+(Math.PI/2);
    //set the angle of the tentacle
    var rotateZ = new THREE.Matrix4().set(  1,        0,         0,        0, 
                                            0, Math.cos(offset),-Math.sin(offset), 0, 
                                            0, Math.sin(offset), Math.cos(offset), 0,
                                            0,        0,         0,        1);

    //rotate/place the tentacle around the centre/nose
    var tRotMatrix = new THREE.Matrix4().set(Math.cos(angle), -Math.sin(angle), 0,  0, 
                                              Math.sin(angle), Math.cos(angle), 0,  0, 
                                                       0,                   0,  1,  0,
                                                       0,                   0,  0,  1);

    var rMatrix = new THREE.Matrix4().multiplyMatrices(tMatrix, rotateZ);

    var temptMatrix = new THREE.Matrix4().multiplyMatrices(tRotMatrix, rMatrix);
    var finaltMatrix = new THREE.Matrix4().multiplyMatrices(finalNoseMatrix, temptMatrix);

    tentacleArray[i] = new THREE.Mesh(ltGeometry, tentacleMaterial);
    tentacleArray[i].setMatrix(finaltMatrix);
    tentacleMatrixArray[i] = finaltMatrix;
    tentacleRotMatrixArray[i] = temptMatrix;
    scene.add(tentacleArray[i]);
  }
}

// initialize and create the small tentacles
function makeSmallTentacleMatrix(tentacleArray, tentacleMatrixArray, tentacleRotMatrixArray){
  for (i = 0; i <= numSTentacles; i++){
    var offset = 4*Math.PI/5;
    var angle = (i+1)*(2*Math.PI/numSTentacles)+(Math.PI/4);

    var rotateZ = new THREE.Matrix4().set(  1,        0,         0,        0, 
                                            0, Math.cos(offset),-Math.sin(offset), 0, 
                                            0, Math.sin(offset), Math.cos(offset), 0,
                                            0,        0,         0,        1);

    var tRotMatrix = new THREE.Matrix4().set(Math.cos(angle), -Math.sin(angle),  0,  0,
                                              Math.sin(angle), Math.cos(angle),  0,  0,
                                                       0,        0,       1,  0,
                                                       0,        0,       0,  1);

    var rMatrix = new THREE.Matrix4().multiplyMatrices(stMatrix, rotateZ);

    var temptMatrix = new THREE.Matrix4().multiplyMatrices(tRotMatrix, rMatrix);
    var finaltMatrix = new THREE.Matrix4().multiplyMatrices(finalNoseMatrix, temptMatrix);

    tentacleArray[i] = new THREE.Mesh(stGeometry, stentacleMaterial);
    tentacleArray[i].setMatrix(finaltMatrix);
    tentacleMatrixArray[i] = finaltMatrix;
    tentacleRotMatrixArray[i] = temptMatrix;
    scene.add(tentacleArray[i]);
  }
}

// rotate the large tentacles by a certain amount
function rotateTentacles(tentacleArray, tentacleMatrixArray, tentacleRotMatrixArray, rot){
  for (i = 0; i <= tentacleMatrixArray.length - 1; i++){
    var offset = 4*Math.PI/5;
    var angle = (i+1)*(2*Math.PI/numLTentacles)+(Math.PI/2);
    var rotateZ = new THREE.Matrix4().set(  1,        0,         0,        0, 
                                            0, Math.cos(offset),-Math.sin(offset), 0, 
                                            0, Math.sin(offset), Math.cos(offset), 0,
                                            0,        0,         0,        1);

    var tRotMatrix = new THREE.Matrix4().set(Math.cos(angle), -Math.sin(angle), 0,  0, 
                                              Math.sin(angle), Math.cos(angle), 0,  0, 
                                                       0,                   0,  1,  0, 
                                                       0,                   0,  0,  1);

    var rMatrix = new THREE.Matrix4().multiplyMatrices(tMatrix, rotateZ);

    var temptMatrix = new THREE.Matrix4().multiplyMatrices(tRotMatrix, rMatrix);

    var tentShift  = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-1.5, 0,0,0,1);
    var rotateTent = new THREE.Matrix4().multiplyMatrices(rot, tentShift);

      // move tail back to original position after rotation
    var tentBack = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,1.5, 0,0,0,1);
    var tempT = new THREE.Matrix4().multiplyMatrices(tentBack, rotateTent);

    tentacleRotMatrixArray[i] = new THREE.Matrix4().multiplyMatrices(temptMatrix, tempT);
    tentacleMatrixArray[i] = new THREE.Matrix4().multiplyMatrices(finalNoseMatrix, tentacleRotMatrixArray[i]);

    tentacleArray[i].setMatrix(tentacleMatrixArray[i]);
  }
}

// rotate the small tentacles by a certain amount
function rotateSmallTentacles(tentacleArray, tentacleMatrixArray, tentacleRotMatrixArray, rot){
  for (i = 0; i <= tentacleMatrixArray.length - 1; i++){
   var offset = 4*Math.PI/5;
    var angle = (i+1)*(2*Math.PI/numSTentacles)+(Math.PI/4);
    var rotateZ = new THREE.Matrix4().set(  1,        0,         0,        0, 
                                            0, Math.cos(offset),-Math.sin(offset), 0, 
                                            0, Math.sin(offset), Math.cos(offset), 0,
                                            0,        0,         0,        1);

    var tRotMatrix = new THREE.Matrix4().set(Math.cos(angle), -Math.sin(angle), 0,  0, 
                                              Math.sin(angle), Math.cos(angle), 0,  0, 
                                                       0,                   0,  1,  0, 
                                                       0,                   0,  0,  1);

    var rMatrix = new THREE.Matrix4().multiplyMatrices(stMatrix, rotateZ);

    var temptMatrix = new THREE.Matrix4().multiplyMatrices(tRotMatrix, rMatrix);

    var tentShift  = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-1.5, 0,0,0,1);
    var rotateTent = new THREE.Matrix4().multiplyMatrices(rot, tentShift);

      // move tail back to original position after rotation
    var tentBack = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,1.5, 0,0,0,1);
    var tempT = new THREE.Matrix4().multiplyMatrices(tentBack, rotateTent);

    tentacleRotMatrixArray[i] = new THREE.Matrix4().multiplyMatrices(temptMatrix, tempT);
    tentacleMatrixArray[i] = new THREE.Matrix4().multiplyMatrices(finalNoseMatrix, tentacleRotMatrixArray[i]);

    tentacleArray[i].setMatrix(tentacleMatrixArray[i]);
  }
}

// update the location/position of the tentacles according to the hierarchy
function updateTentacles(tentacleArray, tentacleMatrixArray, tentacleRotMatrixArray){
  for (i = 0; i <= tentacleMatrixArray.length - 1; i++){
    tentacleMatrixArray[i] = new THREE.Matrix4().multiplyMatrices(finalNoseMatrix, tentacleRotMatrixArray[i]);
    tentacleArray[i].setMatrix(tentacleMatrixArray[i])
  }
}


// SETUP UPDATE CALL-BACK
// Hint: It is useful to understand what is being updated here, the effect, and why.
function update() {
  updateBody();

  requestAnimationFrame(update);
  renderer.render(scene,camera);
}

update();