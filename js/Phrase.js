/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
	constructor(phrase) {
		this.phrase = phrase;
	}

	addPhraseToDisplay(phrase) {
		// selects the list to display hidden characters from the DOM
		const phraseUL = $("#phrase ul");

		// loops through the quote, created an LI for each, and appends it to the DOM with the appropriate class
		for (let i = 0; i < phrase.length; i++) {
			let character = phrase.charAt(i);
			let li;
			// checks for characters that are spaces
			if (character === " ") {
				li = `<li class="space"> </li>`;
			} else li = $(`<li class="hide letter ${character}">${character}</li>`);

			phraseUL.append(li);
		}
	}

	// Checks to see if the letter selected by the player matches a letter in the phrase.
	checkLetter(phrase, guess) {
		let correctGuess = false;
		for (var i = 0; i < phrase.length; i++) {
			if (guess === phrase.charAt(i)) {
				correctGuess = true;
			}
		}
		return correctGuess;
	}
	// Reveals the letter(s) on the board that matches the player's selection.
	showMatchedLetter(guess) {
		// selects all the elements with the class matching the letter guessed
		let classSelector = `.${guess}`;
		// removes the hide class and adds the show class
		$(classSelector).removeClass("hide").addClass("show");
	}
}
