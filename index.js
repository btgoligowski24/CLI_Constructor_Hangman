let Word = require("./word");
let inquirer = require("inquirer");
let wordArr = [
    "Dark Matter",
    "Orphan Black",
    "Star Trek: Voyager",
    "Torchwood",
    "Farscape",
    "Futurama",
    "Babylon 5",
    "The Expanse",
    "Westworld",
    "Stranger Things",
    "Mystery Science Theater 3000",
    "Fringe",
    "Star Trek: Deep Space Nine",
    "Stargate SG-1",
    "Lost",
    "Firefly",
    "Star Trek",
    "The Twilight Zone",
    "Battlestar Galactica",
    "Star Trek: The Next Generation",
    "The X-Files",
    "Doctor Who",
    "Stargate Atlantis",
    "Stargate Universe",
    "Killjoys",
    "Buffy the Vampire Slayer",
    "Angel",
    "Defiance",
    "Dollhouse",
    "The Outer Limits",
    "Quantum Leap",
    "Continuum",
    "The Man in the High Castle",
    "The Orville",
    "Warehouse 13",
    "Eureka",
    "Game of Thrones",
    "Star Trek: Enterprise",
    "Star Trek: Discovery",
    "Falling Skies",
    "Altered Carbon",
    "Colony",
    "Black Mirror",
    "Caprica",
    "Sense8",
    "Rick and Morty",
    "Counterpart",
    "Humans",
    "Sanctuary",
    "Andromeda"
];
let maxGuesses = 10;
let incorrectGuessCount = 0;
let playCount = 0;
let curWord;
let curWordArr;
let lettersGuessed = [];
let wins = 0;
let randomize = function (arr) {
    let currentIndex = arr.length;
    let tempVal;
    let randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        tempVal = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = tempVal;
    }
    return arr
};

// returns a random order of the array above, thus making it a random word and random game each time
randomize(wordArr);

function checkForWin() {
    return !curWordArr.includes("_");
}

function checkForLoss() {
    return maxGuesses === incorrectGuessCount;
}

function checkForGameFinish() {
    return playCount === wordArr.length;
}

function userWin() {
    wins++;
    if (checkForGameFinish()) {
        gameOver();
    } else {
        console.log("\nYou got it right! Next word!");
        resetGameCounters();
        newWord();
    }
}

function userLoss() {
    if (checkForGameFinish()) {
        gameOver();
    } else {
        console.log("\nYou got it wrong! Next word!");
        resetGameCounters();
        newWord();
    }
}

function resetGameCounters() {
    incorrectGuessCount = 0;
    lettersGuessed = [];
}

function gameOver() {
    console.log("\nGAME OVER!!!\n\nYou got " + wins + " correct!");
}

function newWord() {
    if (playCount === 0) {
        console.log("\nWelcome to CLI Hangman! The theme is Sci Fi shows. Good luck!");
    }
    curWord = new Word(wordArr[playCount]);
    curWordArr = curWord.wordStr().split("");
    for (obj in curWord.letterArr) {
        if (curWord.letterArr[obj].charStr === " ") {
            curWordArr[obj] = " ";
        }
    }
    playCount++;
    displayWord();
}

function displayWord() {
    console.log("\n" + curWordArr.join(" ") + "\n");
    inquirer.prompt([{
        type: "input",
        message: "Guess a letter",
        name: "letter"
    }]).then(answers => {
        if (lettersGuessed.includes(answers.letter)) {
            console.log("\nYou already guessed that letter. Guess again!");
            displayWord();
        } else {
            let newCurWordArr = [];
            lettersGuessed.push(answers.letter);
            curWord.letterGuess(answers.letter);
            newCurWordArr = curWord.wordStr().split("");
            for (obj in curWord.letterArr) {
                if (curWord.letterArr[obj].charStr === " ") {
                    newCurWordArr[obj] = " ";
                }
            }
            if (curWordArr.join("") === newCurWordArr.join("")) {
                incorrectGuessCount++;
                console.log("\nINCORRECT!!!");
                if (maxGuesses - incorrectGuessCount === 1) {
                    console.log("\nYou have 1 guess remaining!!!");
                } else if (maxGuesses - incorrectGuessCount < 10) {
                    console.log("\nYou have " + (maxGuesses - incorrectGuessCount) + " guesses remaining!!!");
                }
                if (checkForLoss()) {
                    userLoss();
                } else {
                    displayWord();
                }
            } else {
                curWordArr = newCurWordArr;
                console.log("\nCORRECT!!!");
                if (checkForWin()) {
                    userWin();
                } else {
                    displayWord();
                }
            }
        }
    })
}

newWord();