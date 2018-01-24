//variable declaration
var numSquares = 6;
var colors = [];
var pickedColor;

//picking information through query selector
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	//mode button event listener
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() {
	for (var i=0; i<modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
		
			//figure out how many squares to show
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;

			//pick new colors
			//pick a new pickedColor
			//update page to reflect changes
			reset();
		});
	}
}

function setupSquares() {
	for(var i=0; i<squares.length; i++) {
		//add click listeners to squares
		squares[i].addEventListener("click", function() {
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				//console.log("correct");
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?";
			}
			else {
				//console.log("wrong");
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
			//compare to pickedColor
		});
	}
}

function reset() {
	//alert("clicked reset");
	//generate new colors
	colors = generateRandomColors(numSquares);
	//pick new random bolor
	pickedColor = pickColor();
	//change colorDisplay to matched picked color
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
	//change colors of sqaures
	for(var i=0; i<squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block"; 
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none"; 
		}
	}
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function() {
	reset();
});

colorDisplay.textContent = pickedColor;

function changeColors(color) {
	//loop through all squares
	for(var i=0; i<squares.length; i++) {
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make an array
	var arr = [];
	//add num random colors to an array
	for(var i=0; i<num; i++) {
		//get random color and push into array
		//arr[i] = randomColor();
		arr.push(randomColor());
	}
	//return that array at the end
	return arr;
}

function randomColor() {
	//pick a "red" from 0 to 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 to 255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 to 255
	var b = Math.floor(Math.random() * 256);
	return("rgb("+ r +", "+ g +", "+ b + ")");
}