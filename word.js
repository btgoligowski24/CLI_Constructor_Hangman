let Letter = require("./letter");

function Word(chosenWord) {
    this.letterArr = (function () {
            let nestedLetterArr = [];
            for (letters in chosenWord) {
                nestedLetterArr.push(new Letter(chosenWord[letters]))
            }
            return nestedLetterArr;
        })(),
        this.wordStr = function () {
            let wordString = "";
            for (letters in this.letterArr) {
                wordString += this.letterArr[letters].toString();
            }
            return wordString
        },
        this.letterGuess = function (letter) {
            for (letters in this.letterArr) {
                this.letterArr[letters].correctGuess(letter)
            }
        }
}

module.exports = Word;