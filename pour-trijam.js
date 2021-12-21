class liquid extends cell {

	constructor(x, y) {

		super(x, y);

		this.spread = function() {//spread the liquid to fill its container

			var particle = curPar;

			// look at neighbouring cells and check check if we are colliding with a cell and move accordingly

			var close = [];

			if (getCellByPos(particle.pos.x, particle.pos.y + 1)) {

				particle.vars.vis++;

				if (particle.vars.vis >= particle.vars.maxVis) { // if the particle is on the ground

				particle.vars.vis = 0;

					if (getCellByPos(particle.pos.x + 1, particle.pos.y) == false) {

						close[close.length] = 1;

					}

					if (getCellByPos(particle.pos.x - 1, particle.pos.y) == false) {

						close[close.length] = 2;

					}

					if (close.length  == 2) {

						particle.pos.x = particle.pos.x + Math.floor(Math.random() * 3) - 1;

					} else {

						if (close[0] == 2) {

							particle.pos.x = particle.pos.x + Math.floor(Math.random() * 2) - 1;

						}

						if (close[0] == 1) {

							particle.pos.x = particle.pos.x + Math.floor(Math.random() * 2);

						}

					}

				}

			}

		}

	}

}

var curScene = 0;

function load(scene) {

  backgrounds = [];
  particles = [];
  lines = [];
  texts = [];
  placeables = [];
  cells = [];

  if (scene == 0) {

    //load background
    backgrounds[0] = backgroundTypes[0]();

    //load text
    texts[0] = textTypes[0]();
    texts[1] = textTypes[1]();
    texts[2] = textTypes[2]();
    texts[3] = textTypes[3]();
    texts[4] = textTypes[4]();
    texts[5] = textTypes[5]();
    texts[6] = textTypes[6]();

    //load terrain
    fill(1, 34, 20, 37, 2);
    fill(2, 37, 19, 38, 2);

    fill(3, 13, 4, 31, 2);
    fill(5, 13, 6, 31, 2);
    fill(7, 13, 8, 31, 2);
    fill(9, 13, 10, 31, 2);
    fill(11, 13, 12, 31, 2);
    fill(13, 13, 14, 31, 2);
    fill(15, 13, 16, 31, 2);
    fill(17, 13, 18, 31, 2);

    //load placables
    var vec1 = new vector2(2, 5);
    var vec2 = new vector2(18, 10);
    placeables[0] = new placeable(vec1, vec2, "3");

  }

  if (scene == 1) {

    //load background
    backgrounds[0] = backgroundTypes[0]();

    //create terrain
    cells = readData(lvl1);

    //load placeables
    var vec1 = new vector2(5, 3);
    var vec2 = new vector2(16, 12);
    placeables[0] = new placeable(vec1, vec2, "3");

  }

  if (scene == 2) {

    texts[0] = textTypes[7]();

    setTimeout(function(){

      curScene = 3;
      load(curScene);

    }, 1000);

  }

  if (scene == 3) {

    //load background
    backgrounds[0] = backgroundTypes[0]();

    //load terrain
    cells = readData(lvl2);

    //load placeables
    var vec1 = new vector2(7, 12);
    var vec2 = new vector2(12, 17);
    placeables[0] = new placeable(vec1, vec2, "3");

  }

  if (scene == 4) {

    texts[0] = textTypes[7]();

    setTimeout(function(){

      curScene = 5;
      load(curScene);

    }, 1000);

  }

  if (scene == 5) {

    //load background
    backgrounds[0] = backgroundTypes[0]();

    //load terrain
    cells = readData(lvl3);

    //load placeables
    var vec1 = new vector2(7, 10);
    var vec2 = new vector2(12, 15);
    placeables[0] = new placeable(vec1, vec2, "3");

    var vec1 = new vector2(22, 25);
    var vec2 = new vector2(25, 27);
    placeables[1] = new placeable(vec1, vec2, "1");

  }

  if (scene == 6) {

    texts[0] = textTypes[7]();
    texts[1] = textTypes[8]();
    texts[2] = textTypes[9]();

  }


}

clickTypes = [

  function (e) { // register space key to make an earth quake

		if (e.keyCode == 32 && curScene == 0) {

      curScene = 1;
      load(curScene);

		}

	}

]


// //stone background
// var arr = []
//
// var style = {
//
//   col:"rgb(100, 100, 100)",
//   size:random(0,1,false)
//
// }
//
// arr[0] = style;
//
// backgrounds[1] = new background(arr, 0);

textTypes = [

  function () {

    var text1 = {};

    text1.vector = new vector2(600, 300);

    text1.col = "green";

    text1.value = "Pour!";

    text1.size = "100px";

    text1.textAlign = "center";

    hello = new text(text1.vector, text1.value, text1.col, text1.size, text1.textAlign);

    return hello;

  },

  function () {

    var text1 = {};

    text1.vector = new vector2(200, 50);

    text1.col = "green";

    text1.value = "Click to place particles";

    text1.size = "25px";

    text1.textAlign = "center";

    hello = new text(text1.vector, text1.value, text1.col, text1.size, text1.textAlign);

    return hello;

  },

  function () {

    var text1 = {};

    text1.vector = new vector2(200, 80);

    text1.col = "green";

    text1.value = "in highlighted areas:";

    text1.size = "25px";

    text1.textAlign = "center";

    hello = new text(text1.vector, text1.value, text1.col, text1.size, text1.textAlign);

    return hello;

  },

  function () {

    var text1 = {};

    text1.vector = new vector2(200, 710);

    text1.col = "rgb(0,40,0)";

    text1.value = "To complete each scene, touch";

    text1.size = "25px";

    text1.textAlign = "center";

    hello = new text(text1.vector, text1.value, text1.col, text1.size, text1.textAlign);

    return hello;

  },

  function () {

    var text1 = {};

    text1.vector = new vector2(200, 740);

    text1.col = "rgb(0,40,0)";

    text1.value = "water to all (green) bacteria.";

    text1.size = "25px";

    text1.textAlign = "center";

    hello = new text(text1.vector, text1.value, text1.col, text1.size, text1.textAlign);

    return hello;

  }

  ,

  function () {

    var text1 = {};

    text1.vector = new vector2(600, 470);

    text1.col = "green";

    text1.value = "Press Space";

    text1.size = "50px";

    text1.textAlign = "center";

    hello = new text(text1.vector, text1.value, text1.col, text1.size, text1.textAlign);

    return hello;

  },

  function () {

    var text1 = {};

    text1.vector = new vector2(600, 520);

    text1.col = "green";

    text1.value = "to Play";

    text1.size = "50px";

    text1.textAlign = "center";

    hello = new text(text1.vector, text1.value, text1.col, text1.size, text1.textAlign);

    return hello;

  },

  function () {

    var text1 = {};

    text1.vector = new vector2(400, 400);

    text1.col = "green";

    text1.value = "Complete!";

    text1.size = "100px";

    text1.textAlign = "center";

    hello = new text(text1.vector, text1.value, text1.col, text1.size, text1.textAlign);

    return hello;

  },
  function () {

    var text1 = {};

    text1.vector = new vector2(400, 450);

    text1.col = "green";

    text1.value = "That is the last level. Thanks for playing!";

    text1.size = "35px";

    text1.textAlign = "center";

    hello = new text(text1.vector, text1.value, text1.col, text1.size, text1.textAlign);

    return hello;

  },
  function () {

    var text1 = {};

    text1.vector = new vector2(400, 480);

    text1.col = "green";

    text1.value = "yes there are only 3...";

    text1.size = "25px";

    text1.textAlign = "center";

    hello = new text(text1.vector, text1.value, text1.col, text1.size, text1.textAlign);

    return hello;

  }


]

linePaths = [



]

backgroundTypes = [

  function () { // dirt background

    var arr = []

    var style = {

      col:"rgb(120, 70, 80)",
      size:10

    }

    arr[0] = style;

    var style = {

      col:"rgb(100, 50, 60)",
      size:10

    }

    arr[1] = style;

    var style = {

      col:"rgb(60, 30, 40)",
      size:10

    }

    arr[2] = style;

    var style = {

      col:"rgb(50, 20, 30)",
      size:10

    }

    arr[3] = style;


    return new background(arr, 0);

  }

]

cellTypes = [

	class grass extends cell{ // grass

		constructor(x, y) {

			super(x, y);

		}

		vars={

			index:null,
			col:"darkolivegreen",
      placeablecol:"rgba(40,80,30,0.5)",
			name:"Grass",
			mXOff:10,
			mYOff:10,
			can_shake:true,
      cti:0

		};

		sta_func={

		};

		act_func=[

			function (){//get current index

				//console.log("got current cell's index");

				var particle = curPar;

				//console.log(particle);

				for (var i = 0; i < cells.length; i++) { // for each cell if this is that cell update index

					if (cells[i] == particle) {

						particle.vars.index = i;

						//console.log(i);

						//break;

					}

				}

			},

			function (){//draw particle to screen

				var particle = curPar;

				//particle.cell_func.apy_shake();

				particle.cell_func.draw(particle.vars.col);

			},

		];

		clickTypes=[];

	}, // grass

	class dirt extends cell{ // dirt

		constructor(x, y) {

			super(x, y);

		}

		vars={

			index:null,
			col:"rgb(100,70,50)",
      placeablescol:"rgba(100,70,50,0.5)",
			name:"dirt",
			mXOff:0,
			mYOff:0,
			can_shake:false,
      cti:1

		};

		sta_func={

		};

		act_func=[

			function (){//get current index

				//console.log("got current cell's index");

				var particle = curPar;

				//console.log(particle);

				for (var i = 0; i < cells.length; i++) { // for each cell if this is that cell update index

					if (cells[i] == particle) {

						particle.vars.index = i;

						//console.log(i);

						//break;

					}

				}

			},

			function (){//draw particle to screen

				var particle = curPar;

				//particle.cell_func.apy_shake();

				particle.cell_func.draw(particle.vars.col);

			},

		];

		clickTypes=[];

	}, // dirt

	class stone extends cell{ // stone

		constructor(x, y) {

			super(x, y);

		}

		vars={

			index:null,
			col:"dimgrey",
      placeablescol:"rgba(100,100,100,0.5)",
			name:"Stone",
			mXOff:0,
			mYOff:0,
			can_shake:false,
      cti:2

		};

		sta_func={

		};

		act_func=[

			function (){//get current index

				//console.log("got current cell's index");

				var particle = curPar;

				//console.log(particle);

				for (var i = 0; i < cells.length; i++) { // for each cell if this is that cell update index

					if (cells[i] == particle) {

						particle.vars.index = i;

						//console.log(i);

						//break;

					}

				}

			},

			function (){//draw particle to screen

				//console.log("drawing");

				var particle = curPar;

				//console.log(particle);

				ctx.fillStyle = particle.vars.col;

				ctx.fillRect(particle.pos.x * squares, particle.pos.y * squares, squares, squares);

			},

		];

		clickTypes=[];

	}, // stone

  class water extends liquid{ // water

		constructor(x, y) {

			super(x, y);

		}

		vars={

			index:null,
			col:"deepskyblue",
      placeablescol:"rgba(40,50,140, 0.5)",
			name:"water",
			gravTime:0,
			maxGravTime:1,
			vis:0,
			maxVis:3,
      cti:3

		};

		sta_func={

			apy_grav: function (){

				//console.log("apy_grav");

				var particle = curPar;

				//console.log(particle);

				particle.pos.y++;

				particle.sta_func.checkCollision(particle.pos.x, particle.pos.y-1);

			},

			checkCollision: function (x, y){

				//console.log("collision");

				var particle = curPar;

				//console.log(particle);

				for (var i in cells) { // for each cell check collision

					if (cells[i].pos.x == particle.pos.x && cells[i].pos.y == particle.pos.y && cells[i] != particle) { // there is a collision

						particle.pos.x = x; particle.pos.y = y;

					}

				}

			}

		};

		act_func=[

			function (){//get current index

				//console.log("got current cell's index");

				var particle = curPar;

				//console.log(particle);

				for (var i = 0; i < cells.length; i++) { // for each cell if this is that cell update index

					if (cells[i] == particle) {

						particle.vars.index = i;

						//console.log(i);

						//break;

					}

				}

			},

			function (){//apply gravity

				var particle = curPar;

				// console.log("got current cell's apply gravity");
				//
				// console.log(particle);

				if (particle.vars.gravTime == particle.vars.maxGravTime) {

					particle.sta_func.apy_grav(particle);

					particle.vars.gravTime = 0;

				} else {

					particle.vars.gravTime++;

				}

			},

			function () {//spread particle like water
				var particle = curPar;
				particle.spread();
			},

			function (){//draw particle to screen

				//console.log("drawing");

				var particle = curPar;

				//console.log(particle);

				ctx.fillStyle = particle.vars.col;

				ctx.fillRect(particle.pos.x * squares, particle.pos.y * squares, squares, squares);

			},

			function (){//check void

				//console.log("check current cell's void");

				var particle = curPar;

				//console.log(particle);

				//console.log(grids + " " + p.pos.y);

				if (particle.pos.y > grids) {

					// console.log(particle.pos.y + " is greater than " + grids);
					//
					// console.log(particle.vars.index);

					cells = removeIndexFrom(particle.vars.index, cells);

				}

			}

		];

		clickTypes=[];

	}, // water

  class org extends cell{ // org

		constructor(x, y) {

			super(x, y);

		}

		vars={

			index:null,
			col:"rgb(80,150,80)",
      state1:"rgb(60,130,60)",
      state2:"rgb(40,110,40)",
      state3:"rgb(20,90,20)",
      state4:"rgb(10,60,10)",
      placeablescol:"rgba(100,70,50,0.5)",
			name:"org",
			mXOff:0,
			mYOff:0,
			can_shake:false,
      water_amount:0,
      cti:4

		};

		sta_func={

		};

		act_func=[

			function (){//get current index

				//console.log("got current cell's index");

				var particle = curPar;

				//console.log(particle);

				for (var i = 0; i < cells.length; i++) { // for each cell if this is that cell update index

					if (cells[i] == particle) {

						particle.vars.index = i;

						//console.log(i);

						//break;

					}

				}

			},

			function (){//draw particle to screen

				var particle = curPar;

				//particle.cell_func.apy_shake();

				particle.cell_func.draw(particle.vars.col);

			},

      function (){//check neighbors for water

        var particle = curPar;
        if (getCellByPos(particle.pos.x+1, particle.pos.y) != false) {

          if (getCellByPos(particle.pos.x+1, particle.pos.y).vars.name == "water") {

            if (particle.vars.water_amount < 4) {

              particle.vars.water_amount++;

              if (particle.vars.water_amount == 1) {particle.vars.col = particle.vars.state1}
              if (particle.vars.water_amount == 2) {particle.vars.col = particle.vars.state2}
              if (particle.vars.water_amount == 3) {particle.vars.col = particle.vars.state3}
              if (particle.vars.water_amount == 4) {particle.vars.col = particle.vars.state4}

              cells = removeIndexFrom(getCellByPos(particle.pos.x+1, particle.pos.y).vars.index, cells);

            }

          }

        }

        if (getCellByPos(particle.pos.x, particle.pos.y+1) != false) {

          if (getCellByPos(particle.pos.x, particle.pos.y+1).vars.name == "water") {

            if (particle.vars.water_amount < 4) {

              particle.vars.water_amount++;

              if (particle.vars.water_amount == 1) {particle.vars.col = particle.vars.state1}
              if (particle.vars.water_amount == 2) {particle.vars.col = particle.vars.state2}
              if (particle.vars.water_amount == 3) {particle.vars.col = particle.vars.state3}
              if (particle.vars.water_amount == 4) {particle.vars.col = particle.vars.state4}

              cells = removeIndexFrom(getCellByPos(particle.pos.x, particle.pos.y+1).vars.index, cells);

            }

          }

        }

        if (getCellByPos(particle.pos.x-1, particle.pos.y) != false) {

          if (getCellByPos(particle.pos.x-1, particle.pos.y).vars.name == "water") {

            if (particle.vars.water_amount < 4) {

              particle.vars.water_amount++;

              if (particle.vars.water_amount == 1) {particle.vars.col = particle.vars.state1}
              if (particle.vars.water_amount == 2) {particle.vars.col = particle.vars.state2}
              if (particle.vars.water_amount == 3) {particle.vars.col = particle.vars.state3}
              if (particle.vars.water_amount == 4) {particle.vars.col = particle.vars.state4}

              cells = removeIndexFrom(getCellByPos(particle.pos.x-1, particle.pos.y).vars.index, cells);

            }

          }

        }

        if (getCellByPos(particle.pos.x, particle.pos.y-1) != false) {

          if (getCellByPos(particle.pos.x, particle.pos.y-1).vars.name == "water") {

            if (particle.vars.water_amount < 4) {

              particle.vars.water_amount++;

              if (particle.vars.water_amount == 1) {particle.vars.col = particle.vars.state1}
              if (particle.vars.water_amount == 2) {particle.vars.col = particle.vars.state2}
              if (particle.vars.water_amount == 3) {particle.vars.col = particle.vars.state3}
              if (particle.vars.water_amount == 4) {particle.vars.col = particle.vars.state4}

              cells = removeIndexFrom(getCellByPos(particle.pos.x, particle.pos.y-1).vars.index, cells);

            }

          }

        }

      },

      function (){//check if complete scene

        var particle = curPar;

        var num_orgs = 0;
        var num_comp_orgs = 0;

        for (var i = 0 ; i < cells.length; i++) {

          if (cells[i].vars.name == "org") {

            num_orgs++;

            if (cells[i].vars.water_amount == 4) {

              num_comp_orgs++;

            }

          }

        }

        if (num_orgs == num_comp_orgs) {

          curScene++;

          load(curScene);

        }

      }

		];

		clickTypes=[];

	}, // org


]

load(curScene);
