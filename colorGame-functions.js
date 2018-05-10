

function init() {
	// allows time for squareCover to render so colors not briefly shown.
	setTimeout(() => {
		addSquareLayout.call(squareRef[boardSizeState], `${boardSizeState}Layout`);
	}, 0);
	addSquareCover.call(squareRef[boardSizeState]);

	//add turn counter to 
	turnRefLayout[boardSizeState].classList.add(`${boardSizeState}TurnLayout`);

	// set previous variables so that they can be accessed to change classes when board size is changed.
	previousBoardSizeState = boardSizeState;
	previousBoardSizeLayout = `${boardSizeState}Layout`;
	
	colorSquare();
	colorMatch();
}

function reinit() {
	count = 0;
	turnRef[boardSizeState].textContent = '';
	addSquareCover.call(squareRef[boardSizeState]);

	colorSquare();
	colorMatch();
}

// event listener functions
// ***********************************************************
function difficultyChange() {
	// change these variables to new difficulty selection
	difficultyState = this.textContent.toLowerCase();
	colorNum = colorNumRef[boardSizeState][difficultyState];
	addSquareCover.call(squareRef[boardSizeState]);

	// reset turn counter
	count = 0;
	turnRef[boardSizeState].textContent = '';

	// set colors for game
	colorSquare();
}

function boardSizeChange() {
	// refresh these variables to use later in function
	boardSizeState = this.textContent.toLowerCase();
	colorNum = colorNumRef[boardSizeState][difficultyState];
	squareNum = boardSizeRef[boardSizeState];
	
	// Changes the turnCounter
	count = 0;
	turnRef[previousBoardSizeState].textContent = '';

	// remove square layout and background of previous game
	// add square layout and background for next game
	removeSquareLayout.call(squareRef[previousBoardSizeState], previousBoardSizeLayout);
	removeSquareCover.call(squareRef[previousBoardSizeState], previousBoardSizeLayout);
	turnRefLayout[previousBoardSizeState].classList.remove(`${previousBoardSizeState}TurnLayout`);
	addSquareLayout.call(squareRef[this.textContent.toLowerCase()], `${boardSizeState}Layout`);
	addSquareCover.call(squareRef[this.textContent.toLowerCase()], `${boardSizeState}Layout`);
	turnRefLayout[boardSizeState].classList.add(`${boardSizeState}TurnLayout`);


	// set colors for game and matching rules
	colorSquare();
	colorMatch();

	// set variables for next board size change
	previousBoardSizeState = this.textContent.toLowerCase();
	previousBoardSizeLayout = `${boardSizeState}Layout`;
}

function addSquareLayout(layout) {
	this.forEach((val) => {
		val.classList.add(layout)
	})
}
function removeSquareLayout(layout) {
	this.forEach((val) => {
		val.classList.remove(layout)
	})
}

function addSquareCover() {
	this.forEach((val) => {
		val.classList.add('squareCover');
	})
}
function removeSquareCover() {
	this.forEach((val) => {
		val.classList.remove('squareCover');
	})
}
// ***********************************************************


function colorSquare() {
	colorGen();
	colorAssign();
}

// generates all colors to be used in the game
// ***********************************************************
var arrColorTemp = [];
var colorGap = 200;		// if set to 250, colorGen may iterate 100's of times on large, hard.
var colorDiff = [];
var colorDiffarr = [];

// randomly creates colors that are different by a distinguishable amount.
function colorGen() {
	// set arrColor[0] to background color so game colors can all be seen
	arrColor = [[23, 23, 23]];

	// Loop until obtain enough colors to populate game,
	// possible infinite loop based on value of colorNum and colorGap.
	// arrColor.length - 1 required as will remove arrColor[0] after game colors selected.
	for (var i = 0; arrColor.length - 1 < colorNum; i) {

		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		arrColorTemp.push(r, g, b);

		// find numerical difference between new random color and all selected colors
		arrColor.forEach((arr) => {
			for (var i = 0; i < 3; i++) {
				colorDiff.push(Math.abs(arrColorTemp[i] - arr[i]))
			}
			colorDiffarr.push(colorDiff[0] + colorDiff[1] + colorDiff[2]);
			colorDiff = [];
		})
		
		// if numerical difference large enough, add color. Otherwise loop again.
		if (Math.min.apply(null, colorDiffarr) >= colorGap) {
			arrColor.push([r, g, b]);
		}
		colorDiffarr = [];
		arrColorTemp = [];
	}	

	// remove background color from arrColor to leave all game colors.
	arrColor.splice(0,1);
	// Once all colors are added, convert number arrays in arrColor into rgb colors.
	for (var i = 0; i < arrColor.length; i++) {
		arrColor.splice(i, 1, `rgb(${arrColor[i][0]}, ${arrColor[i][1]}, ${arrColor[i][2]})`);
	}
}
// ***********************************************************


// assigns all colors to squares
// ***********************************************************

/*
Assigns colors to every square in game
such that every square has a pair color
and every color is represented
*/
function colorAssign() {
	arrUncoloredSquare = Array.prototype.slice.call(squareRef[boardSizeState]);
	arrColorMatch = [];
	var maxColor = [];
	indexSquare = 0; 		// index to assign color to random square
	indexSquareMatch = 0;		// index to assign color to 2nd random square, that is not same as first random square (pair)
	indexColor = 0;			// index for random color selection
	unmatchedSquareArr = [];

	// create an array number for each square in the game 
	for(var i = 0; i < arrUncoloredSquare.length; i++) {
		unmatchedSquareArr.push(i);
	}

	// randomly selects two (different) unmatched squares that will be colored the same
	indexSquareSetter();


	// loop until the number of color matches equals half the number of squares (number of pairs required).
	for (var j = 0; arrColorMatch.length < squareNum / 2; j++) {

		// selects random color from arrColor
		indexColorSetter();
		
		// checks how many times color has been paired before
		// assigns value to count variable
		colorMatchChecker();

		// sets logic for maximum number of color pairings
		maxNum();

		// if count is smaller than maxPairNum by 2 or more
		// set square color of pair (indexSquare and indexSquareMatch)
		// AND 
		if(colorMatches < maxPairNum - 1) {
			setBackgroundColor();
			indexSquareSetter();

		// if count is one less than maxPairNum AND 
		// set square color of pair (indexSquare and indexSquareMatch)
		// AND remove color from arrColor
		// because after this logic the color will have been matched maxPairNum times 
		} else if (colorMatches === maxPairNum - 1 && maxColor.length < maxColorNum){
			setBackgroundColor();
			maxColor.push(arrColor.splice(indexColor, 1));
			indexSquareSetter();
		}
	}
}

function colorMatchChecker() {
	colorMatches = 0;
	for(var i = 0; i < arrColorMatch.length; i++) {
		if(arrColorMatch[i] === arrColor[indexColor]) {
			colorMatches++;
		}
	}
}


// sets indexColor to random index of arrColor
// sets indexSquare and indexSquareMatch to non-equal random index of arrUncoloredSquare
function indexColorSetter() {
	indexColor = Math.floor(Math.random() * arrColor.length);
}

// creates a different number for indexSquare and indexSquareMatch
// removes both indexes from arr
// randomly selects two (different) unmatched squares that will be colored the same
function indexSquareSetter() {
	var num = Math.floor(Math.random() * unmatchedSquareArr.length);
	indexSquare = unmatchedSquareArr[num];
	unmatchedSquareArr.splice(unmatchedSquareArr.indexOf(indexSquare), 1);

	num = Math.floor(Math.random() * unmatchedSquareArr.length);
	indexSquareMatch = unmatchedSquareArr[num];
	unmatchedSquareArr.splice(unmatchedSquareArr.indexOf(indexSquareMatch), 1);
}

// sets background color of matched pair
// adds color to arrColorMatch
function setBackgroundColor() {
	arrUncoloredSquare[indexSquare].style.backgroundColor = arrColor[indexColor];		// color square[index]
	arrUncoloredSquare[indexSquareMatch].style.backgroundColor = arrColor[indexColor];	// color square[index1]
	arrColorMatch.push(arrColor[indexColor]);
}


// Calculates the maximum number of colors
// that can have the maximum number of pairs
// such that every color is paired at least once
function maxNum() {
	var num = squareNum / (colorNum * 2);
	maxPairNum = Math.ceil(num);
	if (num % 1) {
		maxColorNum = Math.round(num % 1 * colorNum);
	} else {
		maxColorNum = colorNum;
	}
}


// Logic behind matching color pairs
function colorMatch() {
	var arrMatch = [];
	var countMatch = 0;
	for (i = 0; i < boardSizeRef[boardSizeState]; i++) {
		squareRef[boardSizeState][i].addEventListener('click', function(){
			
			if (firstSquareSelected.call(this)) {
				removeSelectedSquareCover.call(this);

			} else if (matchSelected.call(this)) {
				removeSelectedSquareCover.call(this);
				clearMatchedSquares();
				countIncrement();
				countMatch++;
				
				// this code runs when the player matches the last two colors
				if (countMatch === squareNum / 2) {
					displayAllSquares();
				}

			} else if (noMatchSelected.call(this)) {
				removeSelectedSquareCover.call(this);
				addSelectedSquareCover();
				countIncrement();
			}
		})
	}

	/*---conditional functions---*/

	function firstSquareSelected() {
		if (arrMatch.length === 0
		&& this.style.backgroundColor.slice(0,4) !== 'rgba') {
			return true;
		}
	}

	function matchSelected() {
		if (arrMatch.length === 1											// 1 square has previously been selected
		&& this !== arrMatch[0]												// that square is different to this square
		&& this.style.backgroundColor === arrMatch[0].style.backgroundColor // the background color of that square and this square ARE the same
		&& this.style.backgroundColor.slice(0,4) !== 'rgba'					// the background color of this square is not transparent)
		) {
			return true;
		}
	}

	function noMatchSelected() {
		if (arrMatch.length === 1											// 1 square has previously been selected
		&& this !== arrMatch[0]												// that square is different to this square
		&& this.style.backgroundColor !== arrMatch[0].style.backgroundColor // the background color of that square and this square ARE NOT the same
		&& this.style.backgroundColor.slice(0,4) !== 'rgba'					// the background color of this square is not transparent)
		) {
			return true;
		}
	}

	/*---square cover functions---*/

	function removeSelectedSquareCover() {
		this.classList.remove('squareCover');
		arrMatch.push(this);
	}

	function addSelectedSquareCover() {
		setTimeout(() => {
			arrMatch.forEach((square) => {
				square.classList.add('squareCover');
			});
			arrMatch = [];
		}, 1000);
	}

	/*---display/clear squares---*/

	function clearMatchedSquares() {
		// delays the fadeout of square from game
		setTimeout(() => {
			arrMatch.forEach((square) => {
				square.style.backgroundColor = `${square.style.backgroundColor.slice(0,-1)}, 0)`;
			});
			arrMatch = [];
		}, 650);
	}

	function displayAllSquares() {
		// changes the transparent code to opaque after a certain time
		setTimeout(() => {
			squareRef[boardSizeState].forEach((square) => {
				square.style.backgroundColor = `${square.style.backgroundColor.slice(0, -4)})`;
			})
			turnRef[boardSizeState].textContent = '!!';
		}, 650);
		return;
	}

	/*---counter increment---*/

	function countIncrement() {
		count++;
		turnRef[boardSizeState].textContent = count;
	}
}

