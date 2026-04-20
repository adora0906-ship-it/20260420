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

  // 修正攝影機左右顛倒（鏡像）問題
  push();
  // 將座標系統平移至畫布右側，並反轉 X 軸
  translate(width, 0);
  scale(-1, 1);
  // 在翻轉後的座標系統中繪製影像，影像會呈現鏡像效果
  image(capture, (width - vWidth) / 2, (height - vHeight) / 2, vWidth, vHeight);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
