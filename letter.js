function Letter(letter) {
    this.charStr = letter,
        this.hasBeenGuessed = false,
        this.correctGuess = function (char) {
            if (char.toLowerCase() === this.charStr.toLowerCase()) {
                this.hasBeenGuessed = true;
            }
        }
}

Letter.prototype.toString = function () {
    if (this.hasBeenGuessed === true) {
        return this.charStr
    } else {
        return "_"
    }
}

module.exports = Letter;