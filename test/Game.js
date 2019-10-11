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

var rooms = [
  [
    [210, 350, 10, 10],
  ],
  [
    [315, 10, 10, 10],
    [370, 30, 50, 10],
    [210, 80, 120, 10],
    [210, 120, 120, 10],
    [210, 160, 160, 10],
    [240, 200, 120, 10],
    [240, 240, 40, 10],
    [240, 280, 40, 10],
    [240, 320, 40, 10],
    [240, 360, 40, 10],
  ],
  [
    [10, 200, 10, 10],

    [30, 240, 40, 10],
    [30, 280, 40, 10],
    [30, 320, 40, 10],
    [30, 360, 40, 10],
  ],
  [
    [10, 10, 10, 10],
    [10, 80, 80, 10],
    [50, 120, 120, 10],
    [210, 160, 160, 10],
    [240, 200, 120, 10],
    [240, 240, 40, 10],
    [240, 280, 40, 10],
    [240, 320, 40, 10],
    [240, 360, 40, 10],
  ],
  [
    [210, 210, 10, 10],
    [width / 2 - 125, 250, 200, 40],
    [100, 300, 40, 10],
    [123, 340, 90, 10],
  ],
  [
    [315, 350, 10, 10],
  ],
  [
    [315, 210, 10, 10],
    [370, 240, 40, 10],
    [370, 280, 40, 10],
    [370, 320, 40, 10],
    [370, 360, 40, 10],
  ],
  [
    [10, 350, 10, 10],
  ],
  [
    [210, 10, 10, 10],
    [210, 40, 40, 10],
    [210, 80, 80, 10],
    [210, 120, 120, 10],
    [210, 160, 160, 10],
    [240, 200, 120, 10],
    [240, 240, 40, 10],
    [240, 280, 40, 10],
    [240, 320, 40, 10],
    [240, 360, 40, 10],
  ],
]

walljumping = false;
grounded = false;

canvas.width = width;
canvas.height = height;


(function update() {
  // check keys

  // right arrow or d
  if (keys[39] || keys[68]) {
    if (player.velX < player.speed) {
      player.velX++;
      if (!player.jumping) {
        player.jumping = true;
        player.velY = -player.speed * 2;
      }
    }
  }
  // left arrow or a
  if (keys[37] || keys[65]) {
    if (player.velX > -player.speed) {
      player.velX--;
      if (!player.jumping) {
        player.jumping = true;
        player.velY = -player.speed * 2;
      }
    }
  }

  player.velX *= friction;
  player.velY += gravity;

  player.x += player.velX;
  player.y += player.velY;
  for (n = 0; n < rooms.length; n++) {
    if (sm[n])
      for (i = 0; i < rooms[n].length; i++) {
        plt = rooms[n][i];

        if (player.y < plt[1] + 10) {

          if (player.x + player.width > plt[0] &&
            player.x < plt[0] + plt[2] &&
            player.y + player.velY > plt[1] - 10) {

            if (i == 0)
              flip(n);

            else if (player.velY > 0) {
              player.y = player.y.clamp(-50, plt[1] - 10);
              player.jumping = false;
              player.velY = 0;
            }
          }
        }
      }
  }

  leftwall = -20;
  rightwall = width - player.width + 20;

  leftwall = 10;
  rightwall = width - player.width - 10;

  player.x = player.x.clamp(leftwall, rightwall);
  player.y = player.y.clamp(-50, height - player.height - 10);

  // ready to jump
  if (player.y >= height - player.height - 10) {
    player.jumping = false;
  }

  if (walljumping && !grounded) {
    player.velY = -player.speed * 2;
  }

  walljumping = false;


  //drawing
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "gray";
  for (i = 0; i < rooms.length; i++) {
    if (sm[i]) {
      for (j = 1; j < rooms[i].length; j++) {
        plt = rooms[i][j];
        ctx.fillStyle = 'darkgray'
        ctx.fillRect(plt[0], plt[1], plt[2], plt[3]);
      }
    }
  }
  for (i = 0; i < rooms.length; i++) {
    if (sm[i]) {
      plt = rooms[i][0];
      ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
      ctx.fillRect(plt[0], plt[1], plt[2], plt[3]);
    }
  }

  //draw starmaze
  draw_starmaze();
  //


  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  setTimeout(update, 1000 / 60);
}());

function walljump(x) {
  player.x += 40 * x;
  walljumping = true;
}

function draw_starmaze() {

  ctx.fillStyle = 'darkred';
  ctx.fillText("Pattern " + loshu(), 500, 110);
  //ctx.fillText(title(), 500, 125);
  ctx.fillText(season(), 500, 145);
  ctx.fillText(parity(), 500, 125);
  ctx.fillText(element(), 500, 155);
  //ctx.fillText(form(), 500, 265);


}

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

  bgcolor(season());
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

function season() { //get season
  var yin = 0,
    yan = 0,
    s = "";
  for (i = 1; i < 8; i += 2)
    if (sm[i])
      yin += 1;
  for (i = 0; i < 9; i += 2)
    if (sm[i] && i != 4)
      yan += 1;

  if (yin % 2 == 0) {
    if (yan % 2 == 0)
      s = "spring";
    else
      s = "winter";
  } else if (yan % 2 == 0)
    s = "summer";
  else
    s = "fall";

  return s;
}

function time() {
  return "jan 1";
}

function parity() {
  var x = 0;
  for (i = 0; i < 9; i++)
    if (loc[i]) x += 1;
  var str = "day";
  if (x % 2 == 0) str = "night";
  return str;
}

function element() {
  var yin = 0,
    str = "fire";

  for (i = 1; i < 8; i += 2)
    if (sm[i]) yin += 1;

  if (yin < 4) str = "water";
  if (yin == 2) {
    str = "wood";
  }
  if (yin == 1) {
    str = "earth";
    var ls = loshu()
    if (ls == 2 || ls == 8 || ls == 32 || ls == 128) {
      str = "metal";
      //sadly cartan never says which metal is which
      if (ls == 2) str += " (gold)"
      if (ls == 8) str += " (silver)"
      if (ls == 32) str += " (bronze)"
      if (ls == 128) str += " (iron)"
    }

  }
  if (yin == 0) {
    str = "earth";
  }

  if (loshu() == 0) str = "emptiness";


  return str;
}

function form() {
  return "";
}

function title() {
  return "";
}

function bgcolor(str) {
  if (str == "winter")
    document.body.style.backgroundColor = "lightblue";
  if (str == "spring")
    document.body.style.backgroundColor = "lightgreen";
  if (str == "summer")
    document.body.style.backgroundColor = "lightyellow";
  if (str == "fall")
    document.body.style.backgroundColor = "pink";
}

document.onkeydown = document.onkeyup = function(e) {
  keys[e.keyCode] = e.type === "keydown";
};