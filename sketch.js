var myAsciiArt;
var asciiart_width = 120;
var asciiart_height = 60;
var myCapture;
var gfx;
var ascii_arr;
var rls=0.1;
function initCaptureDevice() {
    myCapture = createCapture(VIDEO);
    myCapture.size(320, 240);
    myCapture.elt.setAttribute('playsinline', '');
    myCapture.hide();
}

function setup() {
  createCanvas(1280, 960);
  initCaptureDevice();
  myAsciiArt = new AsciiArt(this);
  myAsciiArt.printWeightTable();
  textAlign(CENTER, CENTER);
  textFont('Orbitron', 12);
  textStyle(BOLD);
  noStroke();
  fill('#00ff55');
  frameRate(8);
  noCursor();
}
function mouseClicked(){
  rls=(rls+0.2)%1;
  console.log(rls);
  asciiart_width = 120-50*rls;
  asciiart_height = 60-10*rls;
}

function draw() {
  textSize(12+rls*8);
  if (myCapture !== null && myCapture !== undefined) {
    background(0);
    gfx = createGraphics(asciiart_width, asciiart_height);
    gfx.background(0);
    gfx.pixelDensity(1.1-rls);
    gfx.image(myCapture, 0, 0, gfx.width, gfx.height);
    gfx.filter(POSTERIZE, 5);
    ascii_arr = myAsciiArt.convert(gfx);
    myAsciiArt.typeArray2d(ascii_arr, this);
  }
  push();
  rect(0,0,1280,36);
  fill(0);
  textAlign(LEFT);
  textSize(20);
  text('Click_to_Change_the_Matrix',1280-(frameCount*10 % 1620),20);
  pop();
}

typeArray2d = function(_arr2d, _dst, _x, _y, _w, _h) {
  switch(arguments.length) {
    case 2: _x = 0; _y = 0; _w = width; _h = height; break;
    case 4: _w = width; _h = height; break;
    case 6: break;
    default: return;
  }
  var temp_ctx2d = _dst.canvas.getContext('2d');
  var dist_hor = _w / _arr2d.length;
  var dist_ver = _h / _arr2d[0].length;
  var offset_x = _x + dist_hor * 0.5;
  var offset_y = _y + dist_ver * 0.5;
  for(var temp_y = 0; temp_y < _arr2d[0].length; temp_y++)
    for(var temp_x = 0; temp_x < _arr2d.length; temp_x++)
        temp_ctx2d.fillText(
        _arr2d[temp_x][temp_y],
        offset_x + temp_x * dist_hor,
        offset_y + temp_y * dist_ver
      );
}
