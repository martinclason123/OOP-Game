/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
let usedPhrases = [];
class Game {
	/**
	 * Creates phrases for use in game
	 * @return {array} An array of phrases that could be used in the game
	 */
	constructor() {
		this.missed = 0;
		this.phrases = [
			{ phrase: "tea and crumpets" },
			{ phrase: "this is bollocks" },
			{ phrase: "rubbish not trash" },
			{ phrase: "biscuits not cookies" },
			{ phrase: "its all gone pete tong" },
		];
		this.activePhrase = null;
	}
	// method to provide a random quote
	getRandomPhrase() {
		// variable to store a random number
		let randomNumber;

		// checks to see if all of the phrases have been used. resets the array if true
		if (usedPhrases.length === this.phrases.length) {
			usedPhrases = [];
		}
		// condition to prevent the first phrase from being flagged as used
		if (usedPhrases.length > 0) {
			// condition to prevent the user from playing the same phrase before all phrases have been used
			do {
				// get a new random number if the random number is present in the usedPhrases array
				randomNumber = getRandomInt(0, 4);
			} while (usedPhrases.includes(randomNumber));
		} else randomNumber = getRandomInt(0, 4);

		// uses the random number to get a random phrase
		let randomPhrase = this.phrases[randomNumber];
		//pushes the used random number into the usedPhrases array
		usedPhrases.push(randomNumber);

		return randomPhrase;

		// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}
	// method to initiate a game
	startGame(phrase, randomPhrase) {
		// hides the overlay
		$("#overlay").hide();

		phrase.activePhrase = phrase.phrase.phrase;
		// Sends the phrase to the method used to display phrases

		phrase.addPhraseToDisplay(randomPhrase.phrase);
	}

	// handles user interactions during the game
	handleInteraction(guess, randomPhrase, phrase) {
		//let guess = event.target.innerHTML;

		let correctGuess = phrase.checkLetter(phrase.activePhrase, guess);

		//selects all the keys from the DOM
		let screenKeys = document.getElementsByClassName("key");

		// variable for the DOM element that matches the guess
		let correspondingKey;

		// loops through the keys
		for (let i = 0; i < screenKeys.length; i++) {
			// finds the DOM element that corresponds to the guess
			if (screenKeys[i].innerHTML === guess) {
				correspondingKey = screenKeys[i];
			}
		}

		/* 
            if the guess is correct, the key is disabled, the matched letters are revealed
            and the key is disabled and turned navy
            */
		if (correctGuess) {
			phrase.showMatchedLetter(guess);

			$(correspondingKey).prop("disabled", true).addClass("chosen");
		} else {
			/* 
                if the guess is incorrect, a heart is removed, the key is disabled
                and the key is disabled and turned orange
                */

			// only removes a life if the key is enabled
			if (!$(correspondingKey).prop("disabled")) {
				game.removeLife();
			}
			$(correspondingKey).prop("disabled", true).addClass("wrong");
		}
		//checks to see if the game is over due to win
		let win = game.checkForWin();

		// if the game has been won, the game over method is called with a boolean of true
		if (win) {
			game.gameOver(true, phrase.activePhrase);
		}
		// if the game has been lost, the game over method is called with a boolean of false
		if (game.missed === 5) {
			game.gameOver(false, phrase.activePhrase);
		}
	}

	// checks to see if the player has revealed all of the letters in the active phrase
	checkForWin() {
		let hiddenSpaces = $(".hide");
		if (hiddenSpaces.length === 0) {
			return true;
		} else return false;
	}

	// removes a life from the scoreboard,
	removeLife() {
		let hearts = $(".tries img");
		$(hearts[4 - game.missed]).attr("src", "images/lostHeart.png");
		this.missed++;
	}

	// updates the screen with a win/loss message
	gameOver(win, phrase) {
		if (win) {
			$("#game-over-message").text("Congratulations! You won!");
			$("#overlay").removeClass("start").removeClass("lose").addClass("win");
			$("#overlay").show();
			// adds an image of laughing leo to the page
			$(`<img class="leo" src="images/leoWin.jpg"></img>`).insertAfter(
				"#game-over-message"
			);
			//updates the start button to say "try again"
			$("#btn__reset").text("Play Again");
		} else {
			$("#game-over-message").text(
				`Sorry, you didn't win this time... the answer is "${phrase}"`
			);
			$("#overlay").removeClass("start").removeClass("win").addClass("lose");
			$("#overlay").show();

			// adds an image of laughing leo to the page
			$(`<img class="leo" src="images/leoLose.png"></img>`).insertAfter(
				"#game-over-message"
			);
			//updates the start button to say "try again"
			$("#btn__reset").text("Try Again");
		}
	}
}
