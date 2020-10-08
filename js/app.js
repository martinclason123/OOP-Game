/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;

// selects that start button
const start = $("#btn__reset");

//adds an event handler to the start button
$(start).click(() => {
	/* prevents duplicate event handlers, otherwise new games results in more than one life being removed 
       by an incorrect guess
    */
	$("body").off("keyup");
	$(".keyrow").off("click");
	//removes all the added classes and enables the keys
	$(".keyrow button")
		.removeClass("wrong")
		.removeClass("chosen")
		.addClass("key")
		.prop("disabled", false);

	// removes all the li items in case of new game
	$("#phrase li").remove();

	// removes the win/lose images and updates the start button text
	$(".leo").remove();
	$(start).val("Start");

	// restores full hearts
	$(".tries img").attr("src", "images/liveHeart.png");
	// initiates a new game
	game = new Game();
	//gets a random phrase
	let randomPhrase = game.getRandomPhrase();
	// initiates the phrase
	const phrase = new Phrase(randomPhrase);
	game.startGame(phrase, randomPhrase);
	// variable for all the guess keys
	const key = $(".keyrow button");

	//prevents multiple event listeners from piling up when new games are started
	$(key).off("click");

	//event handler for the guessing keyboard
	$(key).click((event) => {
		game.handleInteraction(event.target.innerHTML, phrase.activePhrase, phrase);
	});

	$("body").keyup((event) => {
		let keyStroke = String.fromCharCode(event.which).toLowerCase();

		// only accepts lowercase letters
		let keyRegex = /[a-z]/;

		// nothing happens if anything other than a letter is entered
		if (keyRegex.test(keyStroke)) {
			game.handleInteraction(
				keyStroke.toLocaleLowerCase(),
				phrase.activePhrase,
				phrase
			);
		}
	});
});
