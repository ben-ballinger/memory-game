
// DOM Manipulators
// ********************************************************

var squareSmall = document.querySelectorAll(".small");
var squareMedium = document.querySelectorAll(".medium");
var squareLarge = document.querySelectorAll(".large");


var newGame = document.querySelector("#newGame");
var turn = document.querySelector("#turn");

var easy = document.querySelector("#easy");
var medium = document.querySelector("#medium");
var hard = document.querySelector("#hard");

var small = document.querySelector("#small");
var moderate = document.querySelector("#moderate");
var large = document.querySelector("#large");

// ********************************************************


// variable definitions
// ********************************************************
var randomColorArr = [];

// automate these variables with init()
var boardSizeState = "small";
var difficultyState = "easy";
 
var colorNumRef = {
	small: {
		easy: 2,
		moderate: 4,
		hard: 6
	},
	medium: {
		easy: 4,
		moderate: 6,
		hard: 8
	},
	large: {
		easy: 6,
		moderate: 9,
		hard: 12
	}
}

var boardSizeRef = {
	small: 12,
	medium: 24,
	large: 36
};

var squareRef = {
	small: squareSmall,
	medium: squareMedium,
	large: squareLarge
};

var colorNum = colorNumRef[boardSizeState][difficultyState];
var squareNum = boardSizeRef[boardSizeState];
var count = 0;
// ********************************************************

// Board initialisation - set up easy board size
// ********************************************************
// I will want to change this to an init()
// That way I can use the init() function for the newGame button

addSquareLayout.call(squareSmall, "squareSmLayout");
// addSquareBackground.call(squareSmall);


// ********************************************************





boardSizeChange();	// change board size when selection
difficultyChange();	// change difficulty when selection

colorSquare();		// colors all squares in game
colorMatch();


// if squareSelected and arrMatch are not set as global variables
// there is an issue with the settimeout function
function colorMatch() {
	squareSelected = false;
	arrMatch = [];
	for (i = 0; i < boardSizeRef[boardSizeState]; i++) {
		squareRef[boardSizeState][i].addEventListener("click", function(){
			if (squareSelected === false && arrMatch.length === 0 && this.style.backgroundColor !== 'rgb(35, 35, 35)') {
				this.classList.remove('squareBackground');
				arrMatch.push(this);
				squareSelected = !squareSelected;
			} else if (squareSelected === true && arrMatch.length === 1 && this !== arrMatch[0] && this.style.backgroundColor === arrMatch[0].style.backgroundColor) {
				this.classList.remove('squareBackground');
				arrMatch.push(this);
				setTimeout(() => {
					arrMatch.forEach((square) => {
						square.style.backgroundColor = 'rgb(35, 35, 35)';
					});
					arrMatch = [];
					squareSelected = !squareSelected;
				}, 650);
				count++;
				turn.textContent = count;
			} else if (squareSelected === true && arrMatch.length === 1 && this !== arrMatch[0] && this.style.backgroundColor !== arrMatch[0].style.backgroundColor) {
				this.classList.remove('squareBackground');
				arrMatch.push(this);
				setTimeout(() => {
					arrMatch.forEach((square) => {
						square.classList.add('squareBackground');
					});
					arrMatch = [];
					squareSelected = !squareSelected;
				}, 1000);
				count++;
				turn.textContent = count;
			}
		})
	}
}




newGame.addEventListener("click", function(){
	alert("hello");
})








