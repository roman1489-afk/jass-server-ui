'use strict';

function compareCards(card1, card2) {
    if (card1.color < card2.color) {
        return -1;
    }
    if (card1.color > card2.color) {
        return 1;
    }

    return card1.number - card2.number;
}

let GameState = {

    setCardsInHand: function (cardsInHand) {
        this.cardsInHand = cardsInHand.sort(compareCards);
    },

    removeLastCardPlayed: function () {
        if (this.lastCardPlayed) {
            this.cardsInHand.splice(this.cardsInHand.indexOf(this.lastCardPlayed), 1);
            this.lastCardPlayed = undefined;
        }
    },

    setCardType: function (cardType) {
        this.cardType = cardType;
    }
};

let create = function create() {
    let gameState = Object.create(GameState);
    gameState.cardType = CardType.FRENCH;

    return gameState;
};

let CardType = {
    FRENCH: 'french',
    GERMAN: 'german'
};

module.exports = {
    create,
    CardType
};