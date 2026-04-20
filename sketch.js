let capture;
let pg; // 宣告一個 Graphics 物件作為繪圖層

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialize camera capture
  capture = createCapture(VIDEO);
  // 設定攝影機解析度，確保與後續 Graphics 畫布一致
  capture.size(640, 480);
  // Hide the default video element created by createCapture
  capture.hide();
  // 產生一個與視訊畫面寬高完全相同的 Graphics 畫布
  pg = createGraphics(640, 480);
}

function draw() {
  background('#e7c6ff');

  // Calculate dimensions: 60% of the screen width and height
  let vWidth = width * 0.6;
  let vHeight = height * 0.6;

  // 在 Graphics 物件上繪製內容
  pg.clear(); // 務必呼叫 clear()，讓背景保持透明，否則會遮住視訊
  
  // 讀取攝影機像素
  capture.loadPixels();

  // 確保攝影機已經讀取到影像資料
  if (capture.pixels.length > 0) {
    pg.fill(0, 255, 0); // 設定文字顏色為綠色（在畫面上較易辨識）
    pg.textSize(8);
    pg.textAlign(CENTER, CENTER);

    // 以 20x20 為一個單位進行取樣
    for (let y = 0; y < capture.height; y += 20) {
      for (let x = 0; x < capture.width; x += 20) {
        // 取得該 20x20 單位中心點的像素座標，以代表該區塊的值
        let sampleX = x + 10;
        let sampleY = y + 10;
        
        // 計算在 pixels 陣列中的索引位置 [R, G, B, A]
        let index = (sampleX + sampleY * capture.width) * 4;
        let r = capture.pixels[index] || 0;
        let g = capture.pixels[index + 1] || 0;
        let b = capture.pixels[index + 2] || 0;
        
        // 計算平均亮度 (pixel[0] + pixel[1] + pixel[2])/3 並顯示
        let avg = Math.floor((r + g + b) / 3);
        pg.text(avg, x + 10, y + 10); // 在 20x20 區塊的中心顯示數字
      }
    }
  }

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
