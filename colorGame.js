
/*-----DOM MANIPULATORS-----*/

/*-----in game squares-----*/
var squareSmall = document.querySelectorAll('.small');
var squareMedium = document.querySelectorAll('.medium');
var squareLarge = document.querySelectorAll('.large');

/*-----turn counter controllers-----*/
var smallTurnLayout = document.querySelector('#smallTurnLayout');
var mediumTurnLayout = document.querySelector('#mediumTurnLayout');
var largeTurnLayout = document.querySelector('#largeTurnLayout');

var smallTurn = document.querySelector('#smallTurnSingle');
var mediumTurn = document.querySelector('#mediumTurnSingle');
var largeTurn = document.querySelector('#largeTurnSingle');

/*-----toolbar buttons-----*/
var newGame = document.querySelector('#newGame');

var easy = document.querySelector('#easy');
var medium = document.querySelector('#medium');
var hard = document.querySelector('#hard');

var small = document.querySelector('#small');
var moderate = document.querySelector('#moderate');
var large = document.querySelector('#large');

/*-----VARIABLE DEFINITIONS-----*/
/*-----STATE ACCESS OBJECTS-----*/

/*-----number of colors in game-----*/
var colorNumRef = {
	small: {
		easy: 2,
		moderate: 3,
		hard: 4
	},
	medium: {
		easy: 3,
		moderate: 4,
		hard: 5
	},
	large: {
		easy: 4,
		moderate: 5,
		hard: 6
	}
}
/*-----number of squares in game-----*/
var boardSizeRef = {
	small: 8,
	medium: 24,
	large: 48
};

/*-----squares which are in current game-----*/
var squareRef = {
	small: squareSmall,
	medium: squareMedium,
	large: squareLarge
};

/*-----access turn counter controllers-----*/
var turnRefLayout = {
	small: smallTurnLayout,
	medium: mediumTurnLayout,
	large: largeTurnLayout
}

var turnRef = {
	small: smallTurn,
	medium: mediumTurn,
	large: largeTurn
}


var arrColor = [];

var boardSizeState = 'small';
var previousBoardSizeState;
var previousBoardSizeLayout;

var difficultyState = 'easy';

var colorNum = colorNumRef[boardSizeState][difficultyState];
var squareNum = boardSizeRef[boardSizeState];
var count = 0;

/*-----CODE TO RUN GAME-----*/
init();

/*-----event listeners-----*/

/*-----change difficulty-----*/
easy.addEventListener('click', difficultyChange)
moderate.addEventListener('click', difficultyChange)
hard.addEventListener('click', difficultyChange)

/*-----change board size-----*/
small.addEventListener('click', boardSizeChange)
medium.addEventListener('click', boardSizeChange)
large.addEventListener('click', boardSizeChange)

/*-----start a new game-----*/
newGame.addEventListener('click', reinit)



