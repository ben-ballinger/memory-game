
// change difficulty when selected
// ***********************************************************

function difficultyChange() {
	easy.addEventListener("click", function(){
		colorNumUpdateDiff.call(this);
	})

	moderate.addEventListener("click", function(){
		colorNumUpdateDiff.call(this);
	})

	hard.addEventListener("click", function(){
		colorNumUpdateDiff.call(this);
	})
}



function colorNumUpdateDiff() {
	difficultyState = this.textContent.toLowerCase();
	colorNum = colorNumRef[boardSizeState][difficultyState];
	randomColorArr = [];
	colorSquare();
}

// ***********************************************************




// change board size when selected
// ***********************************************************

function boardSizeChange() {
	boardSizeSmall();
	boardSizeMedium();
	boardSizeLarge();
}

// ===========================================================
function boardSizeSmall() {
	small.addEventListener("click", function(){
		removeSquareLayoutAll();
		removeSquareBackgroundAll();
		addSquareLayout.call(squareSmall, "squareSmLayout");
		// addSquareBackground.call(squareSmall);
		colorNumUpdateBSize.call(this);
		randomColorArr = [];
		numSet();
		colorSquare();
		colorMatch();
	})
}

function boardSizeMedium() {
	medium.addEventListener("click", function(){
		removeSquareLayoutAll();
		removeSquareBackgroundAll();
		addSquareLayout.call(squareMedium, "squareMdLayout");
		// addSquareBackground.call(squareMedium);
		colorNumUpdateBSize.call(this);
		randomColorArr = [];
		numSet();
		colorSquare();
		colorMatch();
	})
}

function boardSizeLarge() {
	large.addEventListener("click", function(){
		removeSquareLayoutAll();
		removeSquareBackgroundAll();
		addSquareLayout.call(squareLarge, "squareLgLayout");
		// addSquareBackground.call(squareLarge);
		colorNumUpdateBSize.call(this);
		randomColorArr = [];
		numSet();
		colorSquare();
		colorMatch();
	})
}

// sets the colorNum and squareNum to what user selected
function numSet(){
	colorNum = colorNumRef[boardSizeState][difficultyState];
	squareNum = boardSizeRef[boardSizeState];
}
// ===========================================================
function colorNumUpdateBSize() {
	boardSizeState = this.textContent.toLowerCase();
	colorNum = colorNumRef[boardSizeState][difficultyState];
}

function addSquareLayout(layout) {
	for (var i = 0; i < this.length; i++) {
		this[i].classList.add(layout)
	}
}

function removeSquareLayout(layout) {
	for (var i = 0; i < this.length; i++) {
		this[i].classList.remove(layout)
	}
}

function removeSquareLayoutAll() {
	removeSquareLayout.call(squareSmall, "squareSmLayout");
	removeSquareLayout.call(squareMedium, "squareMdLayout");
	removeSquareLayout.call(squareLarge, "squareLgLayout");
}

// ***********************************************************




// add and removes background texture from squares
// ***********************************************************

function addSquareBackground() {
	for (var i = 0; i < this.length; i++) {
		this[i].classList.add('squareBackground');
	}
}

function removeSquareBackground() {
	for (var i = 0; i < this.length; i++) {
		this[i].classList.remove('squareBackground');
	}
}

function removeSquareBackgroundAll() {
	removeSquareBackground.call(squareSmall);
	removeSquareBackground.call(squareLarge);
	removeSquareBackground.call(squareMedium);
}

// ***********************************************************




// colors all squares in game
// ***********************************************************

function colorSquare() {
	colorGenerator();
	colorAssign();
}



function colorGenerator() { 			// generates colorNum semi-random colors
	var arrR = numberArrayGenerator();
	var arrG = numberArrayGenerator();
	var arrB = numberArrayGenerator();
	for(i = 0; i < colorNum; i++){
		var r = arrR[Math.floor(Math.random() * arrR.length)]
		arrR.splice(arrR.indexOf(r), 1);
		var g = arrG[Math.floor(Math.random() * arrG.length)]
		arrG.splice(arrG.indexOf(r), 1);
		var b = arrB[Math.floor(Math.random() * arrB.length)]
		arrB.splice(arrB.indexOf(r), 1);
		randomColorArr.push("rgb(" + r + ", " + g + ", " + b + ")");
	}
}

function numberArrayGenerator() {
	var colorGap = 255 / colorNum;
	var arr = [];
	for(i = 1; i <= colorNum; i++) {
		var r = Math.floor(Math.random() * colorGap + colorGap * (i-1));
		arr.push(r);
	}
	return arr;
}

// ***********************************************************




function colorAssign() {
	var arr1 = squareRef[boardSizeState];					// initially all squares in the game. later, the only squares which haven't been colored
	arrUncoloredSquare = [];								//
	arrUncoloredSquare = Array.prototype.slice.call(squareRef[boardSizeState]);	//
	arrColorMatch = [];										// 
	var colorPairs = squareNum / 2; 						// can i replace colorNumRef[boardSizeState][difficultyState] with colorNum?? 
	var maxColor = [];
	indexSquare = 0; 		// index to assign color to random square
	indexSquareMatch = 0;		// index to assign color to 2nd random square, that is not same as first random square (pair)
	indexColor = 0;			// index for random color selection
	arr = [];
	for(var i = 0; i < arrUncoloredSquare.length; i++) {
		arr.push(i);								// 0-31 array
	}

	indexSquareSetter();
	for (var j = 0; arrColorMatch.length < colorPairs; j++) {
		indexColorSetter();
		var count = 0;		// number of times color has been matched before (maxPairNum)																// counts number of times color has already been paired
		for(var i = 0; i < arrColorMatch.length; i++) {
			if(arrColorMatch[i] === randomColorArr[indexColor]) {
				count++;
			}
		}
		maxNum();
		if(count < maxPairNum - 1) {
			setBackgroundColor();
			indexSquareSetter();
		} else if (count === maxPairNum - 1 && maxColor.length < maxColorNum){
			setBackgroundColor();
			maxColor.push(randomColorArr.splice(indexColor, 1));
			indexSquareSetter();
		} else {} 
	}
}






















// sets indexColor to random index of randomColorArr
// sets indexSquare and indexSquareMatch to non-equal random index of arrUncoloredSquare

function indexColorSetter() {
	indexColor = Math.floor(Math.random() * randomColorArr.length);
}

function indexSquareSetter() {

	var a = Math.floor(Math.random() * arr.length);	// random number between 0 - 31
	indexSquare = arr[a];						// set indexSquare to the random number
	arr.splice(arr.indexOf(indexSquare), 1);

	var b = 0;								// remove that number from array
	b = Math.floor(Math.random() * arr.length);
	indexSquareMatch = arr[b];
	arr.splice(arr.indexOf(indexSquareMatch), 1);

}


function setBackgroundColor() {
	arrUncoloredSquare[indexSquare].style.backgroundColor = randomColorArr[indexColor];		// color square[index]
	arrUncoloredSquare[indexSquareMatch].style.backgroundColor = randomColorArr[indexColor];	// color square[index1]
	arrColorMatch.push(randomColorArr[indexColor]);
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
