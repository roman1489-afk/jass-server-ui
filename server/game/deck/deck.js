import _ from 'lodash';
import {CardColor} from './../../../shared/deck/cardColor';
import * as Card from './../../../shared/deck/card';

import SeededShuffle from 'seededshuffle';

const cards = Array.from(new Array(36), (x, i) => i).map((element, index) => {
	let cardStep = Math.floor(index / 4) + 6;
	let cardColor = Object.keys(CardColor)[index % 4];

	return Card.create(cardStep, CardColor[cardColor]);
});

const Deck = {
	deal: function deal(player, count) {
		player.dealCards(this.cards.splice(0, count));
	},

	get getRounds(){
		return rounds;
    },

	get getDeckCards(){
		return deck.cards;
	}
};

// Amount of rounds played gets tracked. See singleGameSession for amount of rounds the experiment lasts. E.g. 16
let rounds = 0;
let one = [];
let two = [];
let three = [];
let four = [];
let five = [];
let six = [];
let seven = [];
let eight = [];
// 1-2 are all preset games, if you want true random games, set to 3.
let gameNumber = 2;


export function create(seed = 0, oldDeckCards = null) {
	let deck = Object.create(Deck);

	//sort cards in a way, that we can assign certain patterns manually
	//deck.cards = _.sortBy(cards, ['number', 'color']);

	//console.log(deck.cards);
	rounds++;

	/**
	 * Sorts the Deck in a given order
	 * @param {array} helpArray helper array
	 * @param {array} order array with the order in which we want the deck
	 */
	function helpSort(helpArray = [], order = []){
		helpArray.forEach((num1, index) => {
			const num2 = order[index];
			deck.cards[num1] = [deck.cards[num2], deck.cards[num2] = deck.cards[num1]][0];
			});
	}

	/**
	 * Helper function to create an Array of length 26, that is used to sort cards manually
	 * @param {number} start always 0
	 * @param {number} end always 26
	 * @returns {number[]} helper array to sort cards manually
	 */
	function range(start, end) {
  		return Array.from({ length: end - start + 1 }, (_, i) => i);
	}

	/**
	 * Helper function to shift the existing deck, so that the hands of players are switched
	 * @param {number} numbersOfShifts indicates the number of switches
	 * @returns {*} the deck in correct order, that players will get different hands
	 */
	function shiftDeck(numbersOfShifts){
		return deck.cards.push.apply(deck.cards, deck.cards.splice(0, numbersOfShifts));
	}

	// assign the sorted cards to our deck.
	// twist the array with the following line to get the same game but 1 player shifted back. (use 9 for shift three times or 18 to shift twice)
	// deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));
	switch(gameNumber){
		case 1:

			//sort cards in a way, that we can assign certain patterns manually
			deck.cards = _.sortBy(cards, ['number', 'color']);

			switch (rounds) {
				case 1:
					// game 1, round 1
					helpSort(range(0,26), [22,21,17,35,11,7,16,24,22,27,15,35,33,27,24,20,22,28,24,34,24,24,22,31,31,27,29]);
					break;
				case 2:
					//helpSort(range(0,26), [22,21,17,35,11,7,16,24,22,27,15,35,33,27,24,20,22,28,24,34,24,24,22,31,31,27,29]);
					//shiftDeck(27);
					helpSort(range(0,26), [32,24,12,4,28,22,25,17,21,12,10,14,18,26,24,18,28,31,22,33,26,34,27,23,27,27,26]);
					break;
				case 3:
					helpSort(range(0,26), [35,27,19,15,7,33,16,8,35,31,30,26,22,18,30,25,22,35,21,21,35,34,22,34,26,34,27]);
					break;
				case 4:
					//[31,23,19,20,34,29,13,9,29,20,20,15,24,29,34,34,19,23,32,19,30,26,22,32,30,25,26] test
					//[27,15,11,33,29,17,15,22,14,20,16,29,14,26,15,35,23,20,31,22,33,26,20,28,35,29,34] normal
					helpSort(range(0,26), [27,15,11,33,29,17,15,22,14,20,16,29,14,26,15,35,23,20,31,22,33,26,20,28,35,29,34]);
					break;
				case 5:
					helpSort(range(0,26), [21,29,25,9,29,30,18,10,24,31,15,11,34,14,20,34,24,21,33,30,35,30,23,31,31,26,26]);
					break;
				case 6:
					helpSort(range(0,26), [35,27,19,29,24,32,16,22,14,19,16,16,18,26,29,31,18,28,35,29,20,25,25,28,30,31,35]);
					break;
				case 7:
					helpSort(range(0,26), [23,11,7,34,30,28,17,11,14,19,27,34,25,28,21,16,24,18,31,24,28,22,26,34,28,25,30]);
					break;
				case 8:
					helpSort(range(0,26), [32,24,8,34,22,10,6,17,10,33,33,31,19,31,17,34,28,32,23,19,30,26,23,32,25,26,26]);
					break;
				case 9:
					helpSort(range(0,26), [27,15,11,33,29,17,15,22,14,20,16,29,14,26,15,35,23,20,31,22,33,26,20,28,35,29,34]);
					shiftDeck(27);
					break;
				case 10:
					helpSort(range(0,26), [21,29,25,9,29,30,18,10,24,31,15,11,34,14,20,34,24,21,33,30,35,30,23,31,31,26,26]);
					shiftDeck(27);
					break;
				case 11:
					helpSort(range(0,26), [32,24,12,4,28,22,25,17,21,12,10,14,18,26,24,18,28,31,22,33,26,34,27,23,27,27,26]);
					shiftDeck(27);
					break;
				case 12:
					helpSort(range(0,26), [23,11,7,34,30,28,17,11,14,19,27,34,25,28,21,16,24,18,31,24,28,22,26,34,28,25,30]);
					shiftDeck(27);
					break;
				case 13:
					helpSort(range(0,26), [32,24,8,34,22,10,6,17,10,33,33,31,19,31,17,34,28,32,23,19,30,26,23,32,25,26,26]);
					shiftDeck(27);
					break;
				case 14:
					helpSort(range(0,26), [22,21,17,35,11,7,16,24,22,27,15,35,33,27,24,20,22,28,24,34,24,24,22,31,31,27,29]);
					shiftDeck(27);
					break;
				case 15:
					helpSort(range(0,26), [35,27,19,29,24,32,16,22,14,19,16,16,18,26,29,31,18,28,35,29,20,25,25,28,30,31,35]);
					shiftDeck(27);
					break;
				case 16:
					helpSort(range(0,26), [35,27,19,15,7,33,16,8,35,31,30,26,22,18,30,25,22,35,21,21,35,34,22,34,26,34,27]);
					shiftDeck(27);
					break;
				default:
					deck.cards = _.shuffle(cards);
					break;
			}
			break;
		case 2:

			//sort cards in a way, that we can assign certain patterns manually
			deck.cards = _.sortBy(cards, ['number', 'color']);

			switch (rounds) {
				case 1:
					// game 2, round 1
					helpSort(range(0,26), [31,27,19,18,10,6,25,25,31,35,18,15,21,27,35,20,18,19,32,28,24,32,31,33,29,28,26]);
					break;
				case 2:
					helpSort(range(0,26), [23,15,11,7,7,34,13,9,21,35,31,27,19,33,29,33,18,19,30,26,29,31,30,31,31,26,33]);
					break;
				case 3:
					helpSort(range(0,26), [14,2,23,15,7,29,9,12,8,34,18,31,35,31,15,31,17,21,22,26,30,22,34,32,28,35,27]);
					break;
				case 4:
					helpSort(range(0,26), [19,30,2,29,30,32,16,30,19,23,33,21,13,23,22,22,23,19,35,29,26,35,33,23,29,29,28]);
					break;
				case 5:
					helpSort(range(0,26), [31,27,19,3,34,10,6,24,8,35,24,22,20,20,29,21,17,27,22,30,30,32,28,31,30,25,30]);
					break;
				case 6:
					helpSort(range(0,26), [35,27,23,4,34,22,18,14,9,31,15,14,26,15,18,23,25,27,19,19,24,24,31,35,24,27,31]);
					break;
				case 7:
					helpSort(range(0,26), [16,4,34,30,10,6,25,17,25,31,30,32,24,26,18,34,21,1,35,19,32,32,25,32,29,26,31]);
					break;
				case 8:
					helpSort(range(0,26), [31,23,19,20,34,29,13,9,29,20,20,15,24,29,34,34,19,23,32,19,30,26,22,32,30,25,26]);
					break;
				case 9:
					helpSort(range(0,26), [19,30,2,29,30,32,16,30,19,23,33,21,13,23,22,22,23,19,35,29,26,35,33,23,29,29,28]);
					shiftDeck(27);
					break;
				case 10:
					helpSort(range(0,26), [31,27,19,18,10,6,25,25,31,35,18,15,21,27,35,20,18,19,32,28,24,32,31,33,29,28,26]);
					shiftDeck(27);
					break;
				case 11:
					helpSort(range(0,26), [35,27,23,4,34,22,18,14,9,31,15,14,26,15,18,23,25,27,19,19,24,24,31,35,24,27,31]);
					shiftDeck(27);
					break;
				case 12:
					helpSort(range(0,26), [14,2,23,15,7,29,9,12,8,34,18,31,35,31,15,31,17,21,22,26,30,22,34,32,28,35,27]);
					shiftDeck(27);
					break;
				case 13:
					helpSort(range(0,26), [31,23,19,20,34,29,13,9,29,20,20,15,24,29,34,34,19,23,32,19,30,26,22,32,30,25,26]);
					shiftDeck(27);
					break;
				case 14:
					helpSort(range(0,26), [31,27,19,3,34,10,6,24,8,35,24,22,20,20,29,21,17,27,22,30,30,32,28,31,30,25,30]);
					shiftDeck(27);
					break;
				case 15:
					helpSort(range(0,26), [23,15,11,7,7,34,13,9,21,35,31,27,19,33,29,33,18,19,30,26,29,31,30,31,31,26,33]);
					shiftDeck(27);
					break;
				case 16:
					helpSort(range(0,26), [16,4,34,30,10,6,25,17,25,31,30,32,24,26,18,34,21,1,35,19,32,32,25,32,29,26,31]);
					shiftDeck(27);
					break;
				default:
					deck.cards = _.shuffle(cards);
					break;
			}
			break;
		default:
			switch (rounds) {
				case 1:
					deck.cards = _.shuffle(cards);
					one = deck.cards;
					break;
				case 2:
					deck.cards = _.shuffle(cards);
					two = deck.cards;
					break;
				case 3:
					deck.cards = _.shuffle(cards);
					three = deck.cards;
					break;
				case 4:
					deck.cards = _.shuffle(cards);
					four = deck.cards;
					break;
				case 5:
					deck.cards = _.shuffle(cards);
					five = deck.cards;
					break;
				case 6:
					deck.cards = _.shuffle(cards);
					six = deck.cards;
					break;
				case 7:
					deck.cards = _.shuffle(cards);
					seven = deck.cards;
					break;
				case 8:
					deck.cards = _.shuffle(cards);
					eight = deck.cards;
					break;
				case 9:
					deck.cards = arrayRotate(four.slice(), -9);
					break;
				case 10:
					deck.cards = arrayRotate(five.slice(), -9);
					break;
				case 11:
					deck.cards = arrayRotate(two.slice(), -9);
					break;
				case 12:
					deck.cards = arrayRotate(seven.slice(), -9);
					break;
				case 13:
					deck.cards = arrayRotate(eight.slice(), -9);
					break;
				case 14:
					deck.cards = arrayRotate(one.slice(), -9);
					break;
				case 15:
					deck.cards = arrayRotate(six.slice(), -9);
					break;
				case 16:
					deck.cards = arrayRotate(three.slice(), -9);
					break;
				default:
					deck.cards = _.shuffle(cards);
					break;
			}
		break;
	}
			// Out commented is the random shuffle function, since we want preset games
			/*
                // If we have an old deck: rotate the deck by 9 cards so we can play the analogous game to the game before
                if (oldDeckCards)
                    deck.cards = arrayRotate(oldDeckCards.slice(), -9);
                else {
                    // If no seed is set, just shuffle randomly
                    if (seed === 0)
                        deck.cards = _.shuffle(cards);
                    else
                        deck.cards = SeededShuffle.shuffle(cards, seed, true);
                }*/
			//console.log(seed);
			console.log(deck.cards);
			return deck;
	}

/**
 * See https://stackoverflow.com/questions/1985260/javascript-array-rotate
 * @param arr
 * @param count
 * @returns {*}
 */
function arrayRotate(arr, count) {
	count -= arr.length * Math.floor(count / arr.length);
	arr.push.apply(arr, arr.splice(0, count));
	return arr;
}
