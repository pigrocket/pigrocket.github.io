Number.prototype.clamp = function(min, max) {
  return this < min ? min : (this > max ? max : this);
};

var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  width = 400,
  height = 300,
  player = {
    color: "red",
    x: width / 4,
    y: height - 50,
    width: 10,
    height: 10,
    speed: 6,
    velX: 16,
    velY: 0,
    jumping: false
  },
  keys = [],
  floor = height*.6,
  friction = 0.9,
  gravity = 1,
  sm = [false, false, false,
    false, true, false, // the starmaze
    false, false, false
  ],
  loc = [true, false, true,
    false, true, false, //binary coordinates
    true, false, true
  ];

grounded = false;

canvas.width = width;
canvas.height = height;


(function update() {
  // check keys

  if (!player.jumping) {
    // right arrow or d
    if (keys[39] || keys[68]) {
        player.velX += 2;
        player.jumping = true;
        player.velY = -player.speed;
        floor += 10;
    }
    // left arrow or a
    if (keys[37] || keys[65]) {
        player.velX -= 2;
        player.jumping = true;
        player.velY = -player.speed;
        floor -= 5;
    }
    // up w
    if (keys[38] || keys[87]) {
        player.velX += 2;
        player.jumping = true;
        player.velY = -player.speed;
        floor -= 5;
    }
    // down s
    if (keys[40] || keys[83]) {
        player.velX -= 2;
        player.jumping = true;
        player.velY = -player.speed;
        floor += 10;
    }
  }
  

  player.velX *= friction;
  player.velY += gravity;

  player.x += player.velX;
  player.y += player.velY;


  leftwall = -20;
  rightwall = width - player.width + 20;

  leftwall = 10;
  rightwall = width - player.width - 10;

  player.x = player.x.clamp(leftwall, rightwall);
  player.y = player.y.clamp(-50, floor);

  // ready to jump
  if (player.y >= floor && player.velY >= 0) {
    player.jumping = false;
  }


  //drawing
  ctx.clearRect(0, 0, width, height);



  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  setTimeout(update, 1000 / 60);
}());

function flip(k) {
  sm[k] = !sm[k];
  loc[k] = !loc[k];

  if (k == 0) {
    sm[5] = !sm[5]
    sm[7] = !sm[7]
  }
  if (k == 1) {
    sm[4] = !sm[4]
    sm[6] = !sm[6]
    sm[8] = !sm[8]
  }
  if (k == 2) {
    sm[3] = !sm[3]
    sm[7] = !sm[7]
  }
  if (k == 3) {
    sm[2] = !sm[2]
    sm[4] = !sm[4]
    sm[8] = !sm[8]
  }
  if (k == 4) {
    sm[0] = !sm[0]
    sm[2] = !sm[2]
    sm[6] = !sm[6]
    sm[8] = !sm[8]
  }
  if (k == 5) {
    sm[0] = !sm[0]
    sm[4] = !sm[4]
    sm[6] = !sm[6]
  }
  if (k == 6) {
    sm[1] = !sm[1]
    sm[5] = !sm[5]
  }
  if (k == 7) {
    sm[0] = !sm[0]
    sm[2] = !sm[2]
    sm[4] = !sm[4]
  }
  if (k == 8) {
    sm[1] = !sm[1]
    sm[3] = !sm[3]
  }
}

function loshu() {
  //condenses starmaze location into one number
  //using loshu as a mask
  var ls = 0;
  for (k = 0; k < 9; k++)
    if (sm[k])
      ls += 2 ** k;

  return ls;
}

document.onkeydown = document.onkeyup = function(e) {
  keys[e.keyCode] = e.type === "keydown";
};