grids = 40;

cells=[];

lines=[];

backgrounds=[];

texts = [];

onlyplaceables = true;

placeables = [];

frameRate=40;

cellTypeIndex = 0;

width=800;

squares = width/grids;

c = document.getElementById("can");

c.width=c.height=width;

c.addEventListener("click", () => {

	var clickPos = {

		x:Math.floor((event.clientX-8)/squares),
		y:Math.floor((event.clientY-8)/squares)

	}

	console.log(clickPos);

	var canPlace = true;

	if (onlyplaceables == true) {

		canPlace = false;

		for (var i = 0 ; i < placeables.length; i++) {

			console.log(placeables[i].vec1.x + " " + placeables[i].vec1.y);
			console.log(placeables[i].vec2.x + " " + placeables[i].vec2.y);

			console.log(clickPos.x + " " + clickPos.y);

			if (placeables[i].vec1.x < clickPos.x && placeables[i].vec2.x > clickPos.x) {

				if (placeables[i].vec1.y < clickPos.y && placeables[i].vec2.y > clickPos.y) {

					canPlace = true;

					cellTypeIndex = placeables[i].allowed;

				}

			}

		}

	}

	if (getCellByPos(clickPos.x, clickPos.y) == false && canPlace == true) {

		createCell(cells.length, cellTypeIndex, clickPos.x, clickPos.y)

	} else if(canPlace == true) {

		cells=removeIndexFrom(getCellByPos(clickPos.x, clickPos.y).pos.thisIndex, cells);

	}

});

ctx=c.getContext("2d");

window.onload = () => {

	setInterval(game,1000/frameRate);

}

var curPar;

game=()=>{

	ctx.fillStyle="black";

	ctx.fillRect(0,0,width,width);

	ctx.stroke();

	//draw background
	for (var i = 0; i < backgrounds.length; i ++) {

		//console.log("Cell " + i + " is the current cell");

		curBackground = backgrounds[i];

		curBackground.draw();

	}

	ctx.fillStyle = "rgba(0,0,0,0.6)";

	ctx.fillRect(0,0,width,width);

	for (var i = 0; i < cells.length; i ++) {

		//console.log("Cell " + i + " is the current cell");

		curPar = cells[i];

		for (var j = 0; j < cells[i].act_func.length; j++) {

			//console.log("Running cell " + i + "\'s " + j + " function");

			cells[i].act_func[j]();

		}

	}

	//draw placeables
	for (var i = 0; i < placeables.length; i++) {

		curPlaceable = placeables[i];
		curPlaceable.draw();

	}

	//draw lines
	for (var i = 0; i < lines.length; i ++) {

		//console.log("Cell " + i + " is the current cell");

		curLine = lines[i];

		curLine.draw();

	}

	//draw text
	for (var i = 0 ; i < texts.length; i++) {

		curText = texts[i];

		curText.draw();

	}

}

var clickCurPar;

document.onkeypress = function (e) {

	for (var i = 0; i < clickTypes.length; i++) {

		clickTypes[i](e);

	}

	for (var i = 0; i < cells.length; i++) {

		clickCurPar = cells[i];

		for (var j = 0; j<cells[i].clickTypes.length; j++) {

			console.log("running on cell " + i);

			cells[i].clickTypes[j](e);

		}

	}

}

createCell=(cellsIndex, cti, x, y)=>{

	cells[cellsIndex] = new cellTypes[cti](x,y);

}

forCloseCell=(self, doFunction)=>{

	for (var x in cells) {

		for (var i in self.pos.close) {

			if (cells[x].pos.x == self.pos.close[i].x && cells[x].pos.y == self.pos.close[i].y) {

				doFunction(self, x, i);

			}

		}


	}

}

function readData(array) {

	var arr = array;

	var newp = [];

	for (var i = 0 ; i < arr.length; i++) {

		if (arr[i] != "emp") {

			newp[newp.length] = new cellTypes[Number(arr[i])](Math.floor(i/grids), i%grids);

		}

	}

	return newp;

}

removeIndexFrom=(index,arr)=>{

	let newArr = [];

	let hasFound = false;

	for(var i =0; i<arr.length; i++) {

		if (!hasFound && i == index) {

			hasFound=true;

		}

		if (hasFound) {

			newArr[i] = arr[i+1];

		} else {

			newArr[i] = arr[i];

		}

	}

	newArr.pop();

	return newArr;

}

getCellByPos = (x, y) => {

	for (var i in cells) {

		if (cells[i].pos.x == x && cells[i].pos.y == y) {

			return cells[i];

		}

	}

	return false;

}

swapCells=(cellOne, cellTwo)=>{

	hold = {x:cellOne.pos.x, y:cellOne.pos.y} // set hold to current pos

	cellOne.pos.x = cellTwo.pos.x; cellOne.pos.y = cellTwo.pos.y; // set current pos to oter cell pos

	cellTwo.pos.x = hold.x; cellTwo.pos.y = hold.y; // set other cell pos to hold

}

random=(low, high, round)=>{

	var out = Math.random() * (high-low) + low;

	if (round == true) {

		return Math.floor(out);

	}

	return out;

}

fill=(x,y,x1,y1,index)=>{

	for (var i = x ; i < x1; i++) {

		for (var j = y ; j < y1; j++) {

			createCell(cells.length, index, i, j);

		}

	}

}

class dummy {

	constructor(x, y) {

		this.pos = {

			x:x,
			y:y,
			xOff:0,
			yOff:0

		} //position of the cell

		this.cell_func = {

			apy_shake: function(par) {

				if (par != undefined) {

					var particle = par;

				} else {

					var particle = curPar;

				}

				particle.pos.xOff = random(0, particle.vars.mXOff, false);

				particle.pos.yOff = random(0, particle.vars.mYOff, false);

			},

			draw: function(col, size, par) {

				var particle = par;

				ctx.fillStyle = col;

				ctx.fillRect(particle.pos.x * squares + particle.pos.xOff, particle.pos.y * squares + particle.pos.yOff, squares * size, squares * size);

			},

			move: function(x, y, xOff, yOff, par) {

				var particle = par;

				particle.pos.x += x; particle.pos.y += y;

				if (xOff != undefined) {

					particle.pos.xOff += xOff; particle.pos.yOff += yOff;

				}

			},


		}

	}

}

class cell {

	constructor(x, y) {

		this.pos = {

			x:x,
			y:y,
			xOff:0,
			yOff:0

		} //position of the cell

		this.cell_func = {

			apy_shake: function(par) {

				if (par != undefined) {

					var particle = par;

				} else {

					var particle = curPar;

				}

				particle.pos.xOff = random(0, particle.vars.mXOff, false);

				particle.pos.yOff = random(0, particle.vars.mYOff, false);

			},

			draw: function(col) {

				var particle = curPar;

				ctx.fillStyle = particle.vars.col;

				ctx.fillRect(particle.pos.x * squares + particle.pos.xOff, particle.pos.y * squares + particle.pos.yOff, squares, squares);

			},

			move: function(x, y, xOff, yOff) {

				var particle = curPar;

				particle.pos.x += x; particle.pos.y += y;

				if (xOff != undefined) {

					particle.pos.xOff += xOff; particle.pos.yOff += yOff;

				}

			},


		}

	}

}

class background {

	constructor(arr, scrl_vec) {

		this.arr = arr;

		this.background_pars = [];

		this.type = this.arr[0];

		if (this.type = "fill") {

			for (var i = 0 ; i < grids; i++) {

				this.background_pars[i] = [];

				for (var  j = 0 ; j < grids; j++) {

					this.background_pars[i][j] = new background_par(i, j, this.arr[(i+1 * j+1) % this.arr.length]);

				}

			}

		}

		this.draw = function() {

			if (this.type == "fill") {

				for (var i = 0 ; i < grids; i++) {

					for (var  j = 0 ; j < grids; j++) {

						this.background_pars[i][j].update();

					}

				}

			}

		}

	}

}

class background_par extends dummy{

	constructor(x, y, sty) {

		super(x, y);

		this.style = sty;

		this.update = function() {

			this.cell_func.draw(this.style.col, this.style.size, this);

		}

	}

}

class vector2 {

	constructor(x, y) {

		this.x = x;
		this.y = y;

	}

	static sub(vec1, vec2) {

		return new vector2(vec1.x - vec2.x, vec1.y - vec2.y);

	}

	static add(vec1, vec2) {

		return new vector2(vec1.x + vec2.x, vec1.y + vec2.y);

	}

	static mul_vec(vec1, vec2) { // multiplies two vectors

		return new vector2(vec1.x * vec2.x, vec1.y * vec2.y);

	}

	static div_vec(vec1, vec2) { // divides two vectors

		return new vector2(vec1.x + vec2.x, vec1.y + vec2.y);

	}

	static mul(num, vec) { // multiplies one number and one vector

		return new vector2(num * vec.x, num * vec.y);

	}

	static div(num, vec) { // divides one number and one vector

		return new vector2(vec.x / num, vec.y / num);

	}

	static lerp(vec1, vec2, d) {

		return vector2.add(vec1, vector2.mul(d, vector2.sub(vec2, vec1)));

	}

	static floor(vec) {

		return new vector2(Math.floor(vec.x), Math.floor(vec.y));

	}

}

class text {

	constructor(pos, value, col, size,align) {

		this.draw = function() {

			ctx.textAlign = align;
			ctx.fillStyle = col;
			ctx.font = size+" Arial";
			ctx.fillText(value, pos.x, pos.y);

		}

	}

}

class line {

	constructor(vec1, vec2, col, width) {

		if (vec1.x >= vec2.x && vec1.y >= vec2.y) {

			this.vec2 = vector2.div(2, vec1);
			this.vec1 = vector2.div(2, vec2);

		} else {

			this.vec1 = vector2.div(2, vec1);
			this.vec2 = vector2.div(2, vec2);

		}

		this.style = {

			col:col,
			size:width

		};

		this.line_pars = [];

		this.draw= ()=> {

			for (var i = 0 ; i < this.line_pars.length; i++) {

				this.line_pars[i].draw();

			}

		}

		var vec3 = vector2.sub(this.vec2, this.vec1);

		vec3 = vector2.mul(10, vec3);
		vec3 = vector2.floor(vec3);

		var total_tenths = vec3.x + vec3.y;

		var done_tenths = 0;

		for (var i = 0 ; i < total_tenths; i++) {

			var percent_done = done_tenths/total_tenths;

			console.log(percent_done);

			var wholes_pos = vector2.floor(vector2.lerp(this.vec1, this.vec2, percent_done));
			var tenths_pos = vector2.mul(40, vector2.sub(vector2.lerp(this.vec1, this.vec2, percent_done), wholes_pos));

			this.line_pars[this.line_pars.length] = new line_par(wholes_pos.x, wholes_pos.y, tenths_pos.x, tenths_pos.y, this.style);

			done_tenths++;

		}

	}

}


class line_par extends dummy {

	constructor(x, y, xOff, yOff, sty) {

		super(x, y);

		this.cell_func.move(x,y,xOff,yOff, this); // move to offset location;

		this.style = sty;

		this.draw = ()=> {

			ctx.fillStyle = this.style.col;

			ctx.fillRect(this.pos.x * squares + this.pos.xOff, this.pos.y * squares + this.pos.yOff, this.style.size, this.style.size);

		}

	}

}

class placeable extends dummy {

  constructor(vec1, vec2, allowed) {

    super(vec1.x, vec1.y);

    this.vec1 = vec1;
    this.vec2 = vec2;

    this.width = vec1.x - vec2.x;
    this.hieght = vec1.y - vec2.y;

    this.allowed = allowed;

		var tempcell = new cellTypes[allowed](-1,-1);

		this.col = tempcell.vars.placeablescol;

		console.log(this.col);

		tempcell = null;

    this.draw = function() {

      ctx.fillStyle = this.col;
      ctx.fillRect((this.vec1.x + 1) * 20, (this.vec1.y + 1) * 20, (this.vec2.x-this.vec1.x - 1) * 20, (this.vec2.y-this.vec1.y - 1 ) * 20);

    } //

  }

}
