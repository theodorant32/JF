//I started off my following this tutorial -> "https://caizoryan.github.io/p5-tutorial/"
//It took me way longer than i expected because it was far more complex than I had hoped but I persevered through it and it ended up working for me.
//I wanted to use the cat list idea and make a very cybercore/myspace inspired website (basically making the tackiest website known to man).
//Hence, in addition to the colour gradient scroll, I had the idea to follow two other tutorials to make my tacky website vision come to life. One tutorial taught me how to insert images via p5.js and how I could manipulate them to my liking this tutorial can be found here -> https://www.youtube.com/watch?v=6rzM_RK2t3c&ab_channel=MagicMonk
//The next tutorial I followed was from the p5.js website -> https://p5js.org/examples/image-transparency.html I used this to control the transparency of the cat stickers in a way that would take advantage of the first tutorial I followed, in this case, using the fade in and fade out functions.

var color1, destinationColor;
var c = 0;
var o = 0;
let isScrolling = false; //variable
var img;

function preload() {
  img = loadImage("catDaddy.png"); //-> https://www.youtube.com/watch?v=6rzM_RK2t3c&ab_channel=MagicMonk
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5");

  // setting color to white first
  destinationColor = color(239, 138, 197);
  color1 = color(255);
}

function draw() {
  if (isScrolling) fadeIn();
  if (c > 0.95 && !isScrolling) fadeOut();
  setGradient(color1, color(255));
  imagesRender();
}

let animated = false;
function fadeIn() {
  if (!animated) {
    animated = true;
    interval = setInterval(() => {
      color1 = lerpColor(color1, destinationColor, c);
      c += 0.05;
      o += map(c, 0, 1, 0, 255);
    }, 50);
  }
}

function imagesRender() {
  tint(255, o); // -> https://p5js.org/examples/image-transparency.html
  image(img, 400, 100);
}

function fadeOut() {
  clearInterval(interval);
  c = 0;
  interval = setInterval(() => {
    color1 = lerpColor(color1, color(255), c);
    c += 0.05;
    o = map(c, 0, 1, 255, 0);
    if (c > 0.95) {
      clearInterval(interval);
      c = 0;
      o = 0;
      animated = false;
    }
  }, 30);
}

function setGradient(c1, c2) {
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

document.onscroll = () => {
  // User is scrolling = true
  if (!isScrolling) {
    isScrolling = true;
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
};
