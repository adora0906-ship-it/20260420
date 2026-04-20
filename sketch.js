let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialize camera capture
  capture = createCapture(VIDEO);
  // Hide the default video element created by createCapture
  capture.hide();
}

function draw() {
  background('#e7c6ff');

  // Calculate dimensions: 60% of the screen width and height
  let vWidth = width * 0.6;
  let vHeight = height * 0.6;

  // Draw the video centered on the canvas
  image(capture, (width - vWidth) / 2, (height - vHeight) / 2, vWidth, vHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
