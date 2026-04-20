let capture;
let pg; // 宣告一個 Graphics 物件作為繪圖層

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialize camera capture
  capture = createCapture(VIDEO);
  // Hide the default video element created by createCapture
  capture.hide();

  // 產生一個與視訊內容比例相符的 Graphics 畫布 (預設通常為 640x480)
  pg = createGraphics(640, 480);
}

function draw() {
  background('#e7c6ff');

  // Calculate dimensions: 60% of the screen width and height
  let vWidth = width * 0.6;
  let vHeight = height * 0.6;

  // 在 Graphics 物件上繪製內容
  pg.clear(); // 務必呼叫 clear()，讓背景保持透明，否則會遮住視訊
  pg.fill(255, 255, 0); // 黃色
  pg.noStroke();
  pg.ellipse(pg.width / 2, pg.height / 2, 50, 50); // 在畫布中央畫一個圓
  pg.fill(255);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(40);
  pg.text("Graphics Overlay", pg.width / 2, pg.height / 2 + 60);

  // 修正攝影機左右顛倒（鏡像）問題
  push();
  // 將座標系統平移至畫布右側，並反轉 X 軸
  translate(width, 0);
  scale(-1, 1);
  
  // 繪製視訊影像
  image(capture, (width - vWidth) / 2, (height - vHeight) / 2, vWidth, vHeight);
  // 將 Graphics 內容繪製在視訊影像的正上方
  image(pg, (width - vWidth) / 2, (height - vHeight) / 2, vWidth, vHeight);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
