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
    }
};

// Amount of rounds played gets tracked. See singleGameSession for amount of rounds the experiment lasts. E.g. 10
let rounds = 0;





export function create(seed = 0, oldDeckCards = null) {
	let deck = Object.create(Deck);

	//sort cards in a way, that we can assign certain patterns manually
	deck.cards = _.sortBy(cards, ['number', 'color']);

	//console.log(deck.cards);
	rounds++;


	//assign the sorted cards to our deck.
	// twist the array with the following line to get the same game but 1 player shifted back. (use 9 for shift three times or 18 to shift twice)
	// deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));

	switch (rounds){
		case 1:
			// player 0
			deck.cards[0] = [deck.cards[22], deck.cards[22]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[21], deck.cards[21]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[17], deck.cards[17]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[35], deck.cards[35]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[11], deck.cards[11]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[7], deck.cards[7]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[24], deck.cards[24]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[22], deck.cards[22]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[27], deck.cards[27]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[15], deck.cards[15]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[35], deck.cards[35]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[33], deck.cards[33]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[27], deck.cards[27]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[24], deck.cards[24]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[20], deck.cards[20]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[22], deck.cards[22]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[28], deck.cards[28]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[24], deck.cards[24]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[34], deck.cards[34]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[24], deck.cards[24]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[24], deck.cards[24]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[22], deck.cards[22]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[31], deck.cards[31]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[31], deck.cards[31]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[27], deck.cards[27]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[29], deck.cards[29]=deck.cards[26]][0];
			break;
		case 2:
			// player 0
			deck.cards[0] = [deck.cards[32], deck.cards[32]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[24], deck.cards[24]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[12], deck.cards[12]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[4], deck.cards[4]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[28], deck.cards[28]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[22], deck.cards[22]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[25], deck.cards[25]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[17], deck.cards[17]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[21], deck.cards[21]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[12], deck.cards[12]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[10], deck.cards[10]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[14], deck.cards[14]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[18], deck.cards[18]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[26], deck.cards[26]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[24], deck.cards[24]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[18], deck.cards[18]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[28], deck.cards[28]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[31], deck.cards[31]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[22], deck.cards[22]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[33], deck.cards[33]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[26], deck.cards[26]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[34], deck.cards[34]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[27], deck.cards[27]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[23], deck.cards[23]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[27], deck.cards[27]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[27], deck.cards[27]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			break;
		case 3:
			// player 0
			deck.cards[0] = [deck.cards[35], deck.cards[35]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[27], deck.cards[27]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[19], deck.cards[19]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[15], deck.cards[15]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[7], deck.cards[7]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[33], deck.cards[33]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[8], deck.cards[8]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[35], deck.cards[35]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[31], deck.cards[31]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[30], deck.cards[30]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[26], deck.cards[26]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[22], deck.cards[22]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[18], deck.cards[18]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[30], deck.cards[30]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[25], deck.cards[25]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[22], deck.cards[22]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[35], deck.cards[35]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[21], deck.cards[21]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[21], deck.cards[21]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[35], deck.cards[35]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[34], deck.cards[34]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[22], deck.cards[22]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[34], deck.cards[34]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[26], deck.cards[26]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[34], deck.cards[34]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[27], deck.cards[27]=deck.cards[26]][0];
			break;
		case 4:
			// player 0
			deck.cards[0] = [deck.cards[27], deck.cards[27]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[15], deck.cards[15]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[11], deck.cards[11]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[33], deck.cards[33]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[29], deck.cards[29]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[17], deck.cards[17]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[15], deck.cards[15]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[22], deck.cards[22]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[14], deck.cards[14]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[20], deck.cards[20]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[16], deck.cards[16]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[29], deck.cards[29]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[14], deck.cards[14]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[26], deck.cards[26]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[15], deck.cards[15]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[35], deck.cards[35]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[23], deck.cards[23]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[20], deck.cards[20]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[31], deck.cards[31]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[22], deck.cards[22]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[33], deck.cards[33]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[26], deck.cards[26]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[20], deck.cards[20]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[28], deck.cards[28]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[35], deck.cards[35]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[29], deck.cards[29]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[34], deck.cards[34]=deck.cards[26]][0];
			break;
		case 5:
			// player 0
			deck.cards[0] = [deck.cards[21], deck.cards[21]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[29], deck.cards[29]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[25], deck.cards[25]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[9], deck.cards[9]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[29], deck.cards[29]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[30], deck.cards[30]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[18], deck.cards[18]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[10], deck.cards[10]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[24], deck.cards[24]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[31], deck.cards[31]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[15], deck.cards[15]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[11], deck.cards[11]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[34], deck.cards[34]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[14], deck.cards[14]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[20], deck.cards[20]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[34], deck.cards[34]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[24], deck.cards[24]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[21], deck.cards[21]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[33], deck.cards[33]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[30], deck.cards[30]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[35], deck.cards[35]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[30], deck.cards[30]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[23], deck.cards[23]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[31], deck.cards[31]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[31], deck.cards[31]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[26], deck.cards[26]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			break;
		case 6:
			// player 0
			deck.cards[0] = [deck.cards[35], deck.cards[35]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[27], deck.cards[27]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[19], deck.cards[19]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[29], deck.cards[29]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[24], deck.cards[24]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[32], deck.cards[32]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[22], deck.cards[22]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[14], deck.cards[14]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[19], deck.cards[19]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[16], deck.cards[16]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[16], deck.cards[16]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[18], deck.cards[18]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[26], deck.cards[26]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[29], deck.cards[29]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[31], deck.cards[31]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[18], deck.cards[18]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[28], deck.cards[28]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[35], deck.cards[35]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[29], deck.cards[29]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[20], deck.cards[20]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[25], deck.cards[25]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[25], deck.cards[25]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[28], deck.cards[28]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[30], deck.cards[30]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[31], deck.cards[31]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[35], deck.cards[35]=deck.cards[26]][0];
			break;
		case 7:
			// player 0
			deck.cards[0] = [deck.cards[23], deck.cards[23]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[11], deck.cards[11]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[7], deck.cards[7]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[34], deck.cards[34]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[30], deck.cards[30]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[28], deck.cards[28]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[17], deck.cards[17]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[11], deck.cards[11]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[14], deck.cards[14]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[19], deck.cards[19]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[27], deck.cards[27]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[34], deck.cards[34]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[25], deck.cards[25]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[28], deck.cards[28]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[21], deck.cards[21]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[16], deck.cards[16]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[24], deck.cards[24]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[18], deck.cards[18]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[31], deck.cards[31]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[24], deck.cards[24]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[28], deck.cards[28]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[22], deck.cards[22]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[26], deck.cards[26]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[34], deck.cards[34]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[28], deck.cards[28]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[25], deck.cards[25]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[30], deck.cards[30]=deck.cards[26]][0];
			break;
		case 8:
			// player 0
			deck.cards[0] = [deck.cards[32], deck.cards[32]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[24], deck.cards[24]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[8], deck.cards[8]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[34], deck.cards[34]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[22], deck.cards[22]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[10], deck.cards[10]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[6], deck.cards[6]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[17], deck.cards[17]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[10], deck.cards[10]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[33], deck.cards[33]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[33], deck.cards[33]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[31], deck.cards[31]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[19], deck.cards[19]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[31], deck.cards[31]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[17], deck.cards[17]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[34], deck.cards[34]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[28], deck.cards[28]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[32], deck.cards[32]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[23], deck.cards[23]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[19], deck.cards[19]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[30], deck.cards[30]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[26], deck.cards[26]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[23], deck.cards[23]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[32], deck.cards[32]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[25], deck.cards[25]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[26], deck.cards[26]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			break;
		case 9:
			// player 0
			deck.cards[0] = [deck.cards[31], deck.cards[31]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[27], deck.cards[27]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[19], deck.cards[19]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[18], deck.cards[18]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[10], deck.cards[10]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[6], deck.cards[6]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[25], deck.cards[25]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[25], deck.cards[25]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[31], deck.cards[31]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[35], deck.cards[35]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[18], deck.cards[18]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[15], deck.cards[15]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[21], deck.cards[21]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[27], deck.cards[27]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[35], deck.cards[35]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[20], deck.cards[20]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[18], deck.cards[18]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[19], deck.cards[19]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[32], deck.cards[32]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[28], deck.cards[28]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[24], deck.cards[24]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[32], deck.cards[32]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[31], deck.cards[31]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[33], deck.cards[33]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[29], deck.cards[29]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[28], deck.cards[28]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			break;
		case 10:
			// player 0
			deck.cards[0] = [deck.cards[23], deck.cards[23]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[15], deck.cards[15]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[11], deck.cards[11]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[7], deck.cards[7]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[7], deck.cards[7]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[34], deck.cards[34]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[13], deck.cards[13]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[9], deck.cards[9]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[21], deck.cards[21]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[35], deck.cards[35]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[31], deck.cards[31]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[27], deck.cards[27]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[19], deck.cards[19]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[33], deck.cards[33]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[29], deck.cards[29]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[33], deck.cards[33]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[18], deck.cards[18]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[19], deck.cards[19]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[30], deck.cards[30]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[26], deck.cards[26]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[29], deck.cards[29]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[31], deck.cards[31]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[30], deck.cards[30]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[31], deck.cards[31]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[31], deck.cards[31]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[26], deck.cards[26]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[33], deck.cards[33]=deck.cards[26]][0];
			break;
		case 11:
			// player 0
			deck.cards[0] = [deck.cards[14], deck.cards[14]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[2], deck.cards[2]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[23], deck.cards[23]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[15], deck.cards[15]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[7], deck.cards[7]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[29], deck.cards[29]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[9], deck.cards[9]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[12], deck.cards[12]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[8], deck.cards[8]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[34], deck.cards[34]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[18], deck.cards[18]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[31], deck.cards[31]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[35], deck.cards[35]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[31], deck.cards[31]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[15], deck.cards[15]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[31], deck.cards[31]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[17], deck.cards[17]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[21], deck.cards[21]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[22], deck.cards[22]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[26], deck.cards[26]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[30], deck.cards[30]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[22], deck.cards[22]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[34], deck.cards[34]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[32], deck.cards[32]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[28], deck.cards[28]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[35], deck.cards[35]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[27], deck.cards[27]=deck.cards[26]][0];
			break;
		case 12:
			// player 0
			deck.cards[0] = [deck.cards[19], deck.cards[19]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[30], deck.cards[30]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[2], deck.cards[2]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[29], deck.cards[29]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[30], deck.cards[30]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[32], deck.cards[32]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[30], deck.cards[30]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[19], deck.cards[19]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[23], deck.cards[23]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[33], deck.cards[33]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[21], deck.cards[21]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[13], deck.cards[13]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[23], deck.cards[23]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[22], deck.cards[22]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[22], deck.cards[22]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[23], deck.cards[23]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[19], deck.cards[19]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[35], deck.cards[35]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[29], deck.cards[29]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[26], deck.cards[26]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[35], deck.cards[35]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[33], deck.cards[33]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[23], deck.cards[23]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[29], deck.cards[29]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[29], deck.cards[29]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[28], deck.cards[28]=deck.cards[26]][0];
			break;
		case 13:
			// player 0
			deck.cards[0] = [deck.cards[27], deck.cards[27]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[15], deck.cards[15]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[11], deck.cards[11]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[33], deck.cards[33]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[29], deck.cards[29]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[17], deck.cards[17]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[15], deck.cards[15]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[22], deck.cards[22]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[14], deck.cards[14]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[20], deck.cards[20]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[16], deck.cards[16]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[29], deck.cards[29]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[14], deck.cards[14]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[26], deck.cards[26]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[15], deck.cards[15]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[35], deck.cards[35]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[23], deck.cards[23]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[20], deck.cards[20]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[31], deck.cards[31]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[22], deck.cards[22]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[33], deck.cards[33]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[26], deck.cards[26]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[20], deck.cards[20]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[28], deck.cards[28]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[35], deck.cards[35]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[29], deck.cards[29]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[34], deck.cards[34]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));
			break;
		case 14:
			// player 0
			deck.cards[0] = [deck.cards[31], deck.cards[31]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[27], deck.cards[27]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[19], deck.cards[19]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[18], deck.cards[18]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[10], deck.cards[10]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[6], deck.cards[6]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[25], deck.cards[25]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[25], deck.cards[25]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[31], deck.cards[31]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[35], deck.cards[35]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[18], deck.cards[18]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[15], deck.cards[15]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[21], deck.cards[21]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[27], deck.cards[27]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[35], deck.cards[35]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[20], deck.cards[20]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[18], deck.cards[18]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[19], deck.cards[19]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[32], deck.cards[32]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[28], deck.cards[28]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[24], deck.cards[24]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[32], deck.cards[32]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[31], deck.cards[31]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[33], deck.cards[33]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[29], deck.cards[29]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[28], deck.cards[28]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));
			break;
		case 15:
			// player 0
			deck.cards[0] = [deck.cards[35], deck.cards[35]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[27], deck.cards[27]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[19], deck.cards[19]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[29], deck.cards[29]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[24], deck.cards[24]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[32], deck.cards[32]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[22], deck.cards[22]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[14], deck.cards[14]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[19], deck.cards[19]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[16], deck.cards[16]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[16], deck.cards[16]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[18], deck.cards[18]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[26], deck.cards[26]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[29], deck.cards[29]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[31], deck.cards[31]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[18], deck.cards[18]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[28], deck.cards[28]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[35], deck.cards[35]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[29], deck.cards[29]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[20], deck.cards[20]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[25], deck.cards[25]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[25], deck.cards[25]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[28], deck.cards[28]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[30], deck.cards[30]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[31], deck.cards[31]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[35], deck.cards[35]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));
			break;
		case 16:
			// player 0
			deck.cards[0] = [deck.cards[35], deck.cards[35]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[27], deck.cards[27]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[19], deck.cards[19]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[15], deck.cards[15]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[7], deck.cards[7]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[33], deck.cards[33]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[8], deck.cards[8]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[35], deck.cards[35]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[31], deck.cards[31]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[30], deck.cards[30]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[26], deck.cards[26]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[22], deck.cards[22]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[18], deck.cards[18]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[30], deck.cards[30]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[25], deck.cards[25]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[22], deck.cards[22]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[35], deck.cards[35]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[21], deck.cards[21]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[21], deck.cards[21]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[35], deck.cards[35]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[34], deck.cards[34]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[22], deck.cards[22]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[34], deck.cards[34]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[26], deck.cards[26]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[34], deck.cards[34]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[27], deck.cards[27]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));
			break;
		case 17:
			// player 0
			deck.cards[0] = [deck.cards[19], deck.cards[19]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[30], deck.cards[30]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[2], deck.cards[2]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[29], deck.cards[29]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[30], deck.cards[30]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[32], deck.cards[32]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[30], deck.cards[30]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[19], deck.cards[19]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[23], deck.cards[23]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[33], deck.cards[33]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[21], deck.cards[21]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[13], deck.cards[13]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[23], deck.cards[23]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[22], deck.cards[22]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[22], deck.cards[22]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[23], deck.cards[23]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[19], deck.cards[19]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[35], deck.cards[35]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[29], deck.cards[29]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[26], deck.cards[26]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[35], deck.cards[35]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[33], deck.cards[33]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[23], deck.cards[23]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[29], deck.cards[29]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[29], deck.cards[29]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[28], deck.cards[28]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));
			break;
		case 18:
			// player 0
			deck.cards[0] = [deck.cards[21], deck.cards[21]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[29], deck.cards[29]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[25], deck.cards[25]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[9], deck.cards[9]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[29], deck.cards[29]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[30], deck.cards[30]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[18], deck.cards[18]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[10], deck.cards[10]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[24], deck.cards[24]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[31], deck.cards[31]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[15], deck.cards[15]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[11], deck.cards[11]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[34], deck.cards[34]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[14], deck.cards[14]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[20], deck.cards[20]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[34], deck.cards[34]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[24], deck.cards[24]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[21], deck.cards[21]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[33], deck.cards[33]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[30], deck.cards[30]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[35], deck.cards[35]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[30], deck.cards[30]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[23], deck.cards[23]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[31], deck.cards[31]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[31], deck.cards[31]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[26], deck.cards[26]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));
			break;
		case 19:
			// player 0
			deck.cards[0] = [deck.cards[32], deck.cards[32]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[24], deck.cards[24]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[12], deck.cards[12]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[4], deck.cards[4]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[28], deck.cards[28]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[22], deck.cards[22]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[25], deck.cards[25]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[17], deck.cards[17]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[21], deck.cards[21]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[12], deck.cards[12]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[10], deck.cards[10]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[14], deck.cards[14]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[18], deck.cards[18]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[26], deck.cards[26]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[24], deck.cards[24]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[18], deck.cards[18]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[28], deck.cards[28]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[31], deck.cards[31]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[22], deck.cards[22]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[33], deck.cards[33]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[26], deck.cards[26]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[34], deck.cards[34]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[27], deck.cards[27]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[23], deck.cards[23]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[27], deck.cards[27]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[27], deck.cards[27]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));
			break;
		case 20:
			// player 0
			deck.cards[0] = [deck.cards[14], deck.cards[14]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[2], deck.cards[2]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[23], deck.cards[23]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[15], deck.cards[15]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[7], deck.cards[7]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[29], deck.cards[29]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[9], deck.cards[9]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[12], deck.cards[12]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[8], deck.cards[8]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[34], deck.cards[34]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[18], deck.cards[18]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[31], deck.cards[31]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[35], deck.cards[35]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[31], deck.cards[31]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[15], deck.cards[15]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[31], deck.cards[31]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[17], deck.cards[17]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[21], deck.cards[21]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[22], deck.cards[22]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[26], deck.cards[26]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[30], deck.cards[30]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[22], deck.cards[22]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[34], deck.cards[34]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[32], deck.cards[32]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[28], deck.cards[28]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[35], deck.cards[35]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[27], deck.cards[27]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));
			break;
		case 21:
			// player 0
			deck.cards[0] = [deck.cards[32], deck.cards[32]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[24], deck.cards[24]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[8], deck.cards[8]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[34], deck.cards[34]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[22], deck.cards[22]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[10], deck.cards[10]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[6], deck.cards[6]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[17], deck.cards[17]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[10], deck.cards[10]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[33], deck.cards[33]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[33], deck.cards[33]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[31], deck.cards[31]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[19], deck.cards[19]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[31], deck.cards[31]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[17], deck.cards[17]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[34], deck.cards[34]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[28], deck.cards[28]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[32], deck.cards[32]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[23], deck.cards[23]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[19], deck.cards[19]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[30], deck.cards[30]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[26], deck.cards[26]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[23], deck.cards[23]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[32], deck.cards[32]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[25], deck.cards[25]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[26], deck.cards[26]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));
			break;
		case 22:
			// player 0
			deck.cards[0] = [deck.cards[22], deck.cards[22]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[21], deck.cards[21]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[17], deck.cards[17]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[35], deck.cards[35]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[11], deck.cards[11]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[7], deck.cards[7]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[24], deck.cards[24]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[22], deck.cards[22]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[27], deck.cards[27]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[15], deck.cards[15]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[35], deck.cards[35]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[33], deck.cards[33]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[27], deck.cards[27]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[24], deck.cards[24]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[20], deck.cards[20]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[22], deck.cards[22]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[28], deck.cards[28]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[24], deck.cards[24]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[34], deck.cards[34]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[24], deck.cards[24]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[24], deck.cards[24]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[22], deck.cards[22]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[31], deck.cards[31]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[31], deck.cards[31]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[27], deck.cards[27]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[29], deck.cards[29]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));
			break;
		case 23:
			// player 0
			deck.cards[0] = [deck.cards[23], deck.cards[23]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[15], deck.cards[15]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[11], deck.cards[11]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[7], deck.cards[7]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[7], deck.cards[7]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[34], deck.cards[34]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[13], deck.cards[13]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[9], deck.cards[9]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[21], deck.cards[21]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[35], deck.cards[35]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[31], deck.cards[31]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[27], deck.cards[27]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[19], deck.cards[19]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[33], deck.cards[33]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[29], deck.cards[29]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[33], deck.cards[33]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[18], deck.cards[18]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[19], deck.cards[19]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[30], deck.cards[30]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[26], deck.cards[26]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[29], deck.cards[29]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[31], deck.cards[31]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[30], deck.cards[30]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[31], deck.cards[31]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[31], deck.cards[31]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[26], deck.cards[26]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[33], deck.cards[33]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));
			break;
		case 24:
			// player 0
			deck.cards[0] = [deck.cards[23], deck.cards[23]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[11], deck.cards[11]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[7], deck.cards[7]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[34], deck.cards[34]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[30], deck.cards[30]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[28], deck.cards[28]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[17], deck.cards[17]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[11], deck.cards[11]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[14], deck.cards[14]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[19], deck.cards[19]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[27], deck.cards[27]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[34], deck.cards[34]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[25], deck.cards[25]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[28], deck.cards[28]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[21], deck.cards[21]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[16], deck.cards[16]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[24], deck.cards[24]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[18], deck.cards[18]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[31], deck.cards[31]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[24], deck.cards[24]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[28], deck.cards[28]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[22], deck.cards[22]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[26], deck.cards[26]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[34], deck.cards[34]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[28], deck.cards[28]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[25], deck.cards[25]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[30], deck.cards[30]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 27));
			break;
		default:
			deck.cards = _.shuffle(cards);
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



//For a possible game 2!!



/*
	switch (rounds){
		case 1:
			// player 0
			deck.cards[0] = [deck.cards[35], deck.cards[35]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[27], deck.cards[27]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[19], deck.cards[19]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[15], deck.cards[15]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[7], deck.cards[7]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[33], deck.cards[33]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[8], deck.cards[8]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[35], deck.cards[35]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[31], deck.cards[31]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[30], deck.cards[30]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[26], deck.cards[26]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[22], deck.cards[22]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[18], deck.cards[18]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[30], deck.cards[30]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[25], deck.cards[25]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[22], deck.cards[22]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[35], deck.cards[35]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[21], deck.cards[21]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[21], deck.cards[21]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[35], deck.cards[35]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[34], deck.cards[34]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[22], deck.cards[22]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[34], deck.cards[34]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[26], deck.cards[26]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[34], deck.cards[34]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[27], deck.cards[27]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 18));
			break;
		case 2:
			// player 0
			deck.cards[0] = [deck.cards[27], deck.cards[27]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[15], deck.cards[15]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[11], deck.cards[11]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[33], deck.cards[33]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[29], deck.cards[29]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[17], deck.cards[17]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[15], deck.cards[15]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[22], deck.cards[22]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[14], deck.cards[14]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[20], deck.cards[20]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[16], deck.cards[16]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[29], deck.cards[29]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[14], deck.cards[14]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[26], deck.cards[26]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[15], deck.cards[15]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[35], deck.cards[35]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[23], deck.cards[23]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[20], deck.cards[20]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[31], deck.cards[31]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[22], deck.cards[22]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[33], deck.cards[33]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[26], deck.cards[26]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[20], deck.cards[20]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[28], deck.cards[28]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[35], deck.cards[35]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[29], deck.cards[29]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[34], deck.cards[34]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 18));
			break;
		case 3:
			// player 0
			deck.cards[0] = [deck.cards[22], deck.cards[22]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[21], deck.cards[21]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[17], deck.cards[17]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[35], deck.cards[35]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[11], deck.cards[11]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[7], deck.cards[7]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[24], deck.cards[24]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[22], deck.cards[22]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[27], deck.cards[27]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[15], deck.cards[15]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[35], deck.cards[35]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[33], deck.cards[33]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[27], deck.cards[27]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[24], deck.cards[24]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[20], deck.cards[20]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[22], deck.cards[22]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[28], deck.cards[28]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[24], deck.cards[24]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[34], deck.cards[34]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[24], deck.cards[24]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[24], deck.cards[24]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[22], deck.cards[22]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[31], deck.cards[31]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[31], deck.cards[31]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[27], deck.cards[27]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[29], deck.cards[29]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 18));
			break;
		case 4:
			// player 0
			deck.cards[0] = [deck.cards[32], deck.cards[32]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[24], deck.cards[24]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[12], deck.cards[12]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[4], deck.cards[4]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[28], deck.cards[28]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[22], deck.cards[22]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[25], deck.cards[25]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[17], deck.cards[17]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[21], deck.cards[21]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[12], deck.cards[12]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[10], deck.cards[10]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[14], deck.cards[14]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[18], deck.cards[18]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[26], deck.cards[26]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[24], deck.cards[24]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[18], deck.cards[18]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[28], deck.cards[28]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[31], deck.cards[31]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[22], deck.cards[22]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[33], deck.cards[33]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[26], deck.cards[26]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[34], deck.cards[34]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[27], deck.cards[27]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[23], deck.cards[23]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[27], deck.cards[27]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[27], deck.cards[27]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 18));
			break;
		case 5:
			// player 0
			deck.cards[0] = [deck.cards[21], deck.cards[21]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[29], deck.cards[29]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[25], deck.cards[25]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[9], deck.cards[9]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[29], deck.cards[29]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[30], deck.cards[30]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[18], deck.cards[18]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[10], deck.cards[10]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[24], deck.cards[24]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[31], deck.cards[31]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[15], deck.cards[15]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[11], deck.cards[11]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[34], deck.cards[34]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[14], deck.cards[14]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[20], deck.cards[20]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[34], deck.cards[34]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[24], deck.cards[24]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[21], deck.cards[21]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[33], deck.cards[33]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[30], deck.cards[30]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[35], deck.cards[35]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[30], deck.cards[30]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[23], deck.cards[23]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[31], deck.cards[31]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[31], deck.cards[31]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[26], deck.cards[26]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 18));
			break;
		case 6:
			// player 0
			deck.cards[0] = [deck.cards[32], deck.cards[32]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[24], deck.cards[24]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[8], deck.cards[8]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[34], deck.cards[34]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[22], deck.cards[22]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[10], deck.cards[10]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[6], deck.cards[6]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[17], deck.cards[17]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[10], deck.cards[10]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[33], deck.cards[33]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[33], deck.cards[33]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[31], deck.cards[31]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[19], deck.cards[19]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[31], deck.cards[31]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[17], deck.cards[17]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[34], deck.cards[34]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[28], deck.cards[28]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[32], deck.cards[32]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[23], deck.cards[23]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[19], deck.cards[19]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[30], deck.cards[30]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[26], deck.cards[26]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[23], deck.cards[23]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[32], deck.cards[32]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[25], deck.cards[25]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[26], deck.cards[26]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 18));
			break;
		case 7:
			// player 0
			deck.cards[0] = [deck.cards[23], deck.cards[23]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[11], deck.cards[11]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[7], deck.cards[7]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[34], deck.cards[34]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[30], deck.cards[30]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[28], deck.cards[28]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[17], deck.cards[17]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[11], deck.cards[11]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[14], deck.cards[14]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[19], deck.cards[19]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[27], deck.cards[27]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[34], deck.cards[34]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[25], deck.cards[25]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[28], deck.cards[28]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[21], deck.cards[21]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[16], deck.cards[16]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[24], deck.cards[24]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[18], deck.cards[18]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[31], deck.cards[31]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[24], deck.cards[24]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[28], deck.cards[28]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[22], deck.cards[22]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[26], deck.cards[26]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[34], deck.cards[34]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[28], deck.cards[28]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[25], deck.cards[25]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[30], deck.cards[30]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 18));
			break;
		case 8:
			// player 0
			deck.cards[0] = [deck.cards[35], deck.cards[35]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[27], deck.cards[27]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[19], deck.cards[19]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[29], deck.cards[29]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[24], deck.cards[24]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[32], deck.cards[32]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[22], deck.cards[22]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[14], deck.cards[14]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[19], deck.cards[19]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[16], deck.cards[16]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[16], deck.cards[16]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[18], deck.cards[18]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[26], deck.cards[26]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[29], deck.cards[29]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[31], deck.cards[31]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[18], deck.cards[18]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[28], deck.cards[28]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[35], deck.cards[35]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[29], deck.cards[29]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[20], deck.cards[20]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[25], deck.cards[25]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[25], deck.cards[25]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[28], deck.cards[28]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[30], deck.cards[30]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[31], deck.cards[31]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[35], deck.cards[35]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 18));
			break;
		case 9:
			// player 0
			deck.cards[0] = [deck.cards[14], deck.cards[14]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[2], deck.cards[2]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[23], deck.cards[23]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[15], deck.cards[15]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[7], deck.cards[7]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[29], deck.cards[29]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[9], deck.cards[9]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[12], deck.cards[12]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[8], deck.cards[8]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[34], deck.cards[34]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[18], deck.cards[18]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[31], deck.cards[31]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[35], deck.cards[35]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[31], deck.cards[31]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[15], deck.cards[15]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[31], deck.cards[31]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[17], deck.cards[17]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[21], deck.cards[21]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[22], deck.cards[22]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[26], deck.cards[26]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[30], deck.cards[30]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[22], deck.cards[22]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[34], deck.cards[34]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[32], deck.cards[32]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[28], deck.cards[28]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[35], deck.cards[35]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[27], deck.cards[27]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 18));
			break;
		case 10:
			// player 0
			deck.cards[0] = [deck.cards[19], deck.cards[19]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[30], deck.cards[30]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[2], deck.cards[2]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[29], deck.cards[29]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[30], deck.cards[30]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[32], deck.cards[32]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[30], deck.cards[30]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[19], deck.cards[19]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[23], deck.cards[23]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[33], deck.cards[33]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[21], deck.cards[21]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[13], deck.cards[13]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[23], deck.cards[23]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[22], deck.cards[22]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[22], deck.cards[22]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[23], deck.cards[23]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[19], deck.cards[19]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[35], deck.cards[35]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[29], deck.cards[29]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[26], deck.cards[26]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[35], deck.cards[35]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[33], deck.cards[33]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[23], deck.cards[23]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[29], deck.cards[29]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[29], deck.cards[29]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[28], deck.cards[28]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 18));
			break;
		case 11:
			// player 0
			deck.cards[0] = [deck.cards[31], deck.cards[31]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[27], deck.cards[27]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[19], deck.cards[19]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[18], deck.cards[18]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[10], deck.cards[10]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[6], deck.cards[6]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[25], deck.cards[25]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[25], deck.cards[25]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[31], deck.cards[31]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[35], deck.cards[35]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[18], deck.cards[18]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[15], deck.cards[15]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[21], deck.cards[21]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[27], deck.cards[27]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[35], deck.cards[35]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[20], deck.cards[20]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[18], deck.cards[18]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[19], deck.cards[19]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[32], deck.cards[32]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[28], deck.cards[28]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[24], deck.cards[24]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[32], deck.cards[32]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[31], deck.cards[31]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[33], deck.cards[33]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[29], deck.cards[29]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[28], deck.cards[28]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 18));
			break;
		case 12:
			// player 0
			deck.cards[0] = [deck.cards[23], deck.cards[23]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[15], deck.cards[15]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[11], deck.cards[11]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[7], deck.cards[7]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[7], deck.cards[7]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[34], deck.cards[34]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[13], deck.cards[13]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[9], deck.cards[9]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[21], deck.cards[21]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[35], deck.cards[35]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[31], deck.cards[31]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[27], deck.cards[27]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[19], deck.cards[19]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[33], deck.cards[33]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[29], deck.cards[29]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[33], deck.cards[33]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[18], deck.cards[18]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[19], deck.cards[19]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[30], deck.cards[30]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[26], deck.cards[26]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[29], deck.cards[29]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[31], deck.cards[31]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[30], deck.cards[30]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[31], deck.cards[31]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[31], deck.cards[31]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[26], deck.cards[26]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[33], deck.cards[33]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 18));
			break;
		case 13:
			// player 0
			deck.cards[0] = [deck.cards[23], deck.cards[23]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[15], deck.cards[15]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[11], deck.cards[11]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[7], deck.cards[7]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[7], deck.cards[7]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[34], deck.cards[34]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[13], deck.cards[13]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[9], deck.cards[9]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[21], deck.cards[21]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[35], deck.cards[35]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[31], deck.cards[31]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[27], deck.cards[27]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[19], deck.cards[19]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[33], deck.cards[33]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[29], deck.cards[29]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[33], deck.cards[33]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[18], deck.cards[18]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[19], deck.cards[19]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[30], deck.cards[30]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[26], deck.cards[26]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[29], deck.cards[29]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[31], deck.cards[31]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[30], deck.cards[30]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[31], deck.cards[31]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[31], deck.cards[31]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[26], deck.cards[26]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[33], deck.cards[33]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 9));
			break;
		case 14:
			// player 0
			deck.cards[0] = [deck.cards[35], deck.cards[35]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[27], deck.cards[27]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[19], deck.cards[19]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[15], deck.cards[15]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[7], deck.cards[7]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[33], deck.cards[33]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[8], deck.cards[8]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[35], deck.cards[35]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[31], deck.cards[31]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[30], deck.cards[30]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[26], deck.cards[26]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[22], deck.cards[22]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[18], deck.cards[18]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[30], deck.cards[30]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[25], deck.cards[25]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[22], deck.cards[22]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[35], deck.cards[35]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[21], deck.cards[21]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[21], deck.cards[21]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[35], deck.cards[35]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[34], deck.cards[34]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[22], deck.cards[22]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[34], deck.cards[34]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[26], deck.cards[26]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[34], deck.cards[34]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[27], deck.cards[27]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 9));
			break;
		case 15:
			// player 0
			deck.cards[0] = [deck.cards[27], deck.cards[27]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[15], deck.cards[15]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[11], deck.cards[11]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[33], deck.cards[33]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[29], deck.cards[29]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[17], deck.cards[17]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[15], deck.cards[15]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[22], deck.cards[22]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[14], deck.cards[14]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[20], deck.cards[20]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[16], deck.cards[16]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[29], deck.cards[29]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[14], deck.cards[14]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[26], deck.cards[26]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[15], deck.cards[15]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[35], deck.cards[35]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[23], deck.cards[23]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[20], deck.cards[20]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[31], deck.cards[31]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[22], deck.cards[22]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[33], deck.cards[33]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[26], deck.cards[26]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[20], deck.cards[20]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[28], deck.cards[28]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[35], deck.cards[35]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[29], deck.cards[29]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[34], deck.cards[34]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 9));
			break;
		case 16:
			// player 0
			deck.cards[0] = [deck.cards[22], deck.cards[22]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[21], deck.cards[21]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[17], deck.cards[17]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[35], deck.cards[35]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[11], deck.cards[11]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[7], deck.cards[7]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[24], deck.cards[24]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[22], deck.cards[22]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[27], deck.cards[27]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[15], deck.cards[15]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[35], deck.cards[35]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[33], deck.cards[33]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[27], deck.cards[27]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[24], deck.cards[24]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[20], deck.cards[20]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[22], deck.cards[22]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[28], deck.cards[28]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[24], deck.cards[24]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[34], deck.cards[34]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[24], deck.cards[24]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[24], deck.cards[24]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[22], deck.cards[22]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[31], deck.cards[31]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[31], deck.cards[31]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[27], deck.cards[27]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[29], deck.cards[29]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 9));
			break;
		case 17:
			// player 0
			deck.cards[0] = [deck.cards[32], deck.cards[32]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[24], deck.cards[24]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[12], deck.cards[12]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[4], deck.cards[4]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[28], deck.cards[28]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[22], deck.cards[22]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[25], deck.cards[25]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[17], deck.cards[17]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[21], deck.cards[21]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[12], deck.cards[12]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[10], deck.cards[10]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[14], deck.cards[14]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[18], deck.cards[18]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[26], deck.cards[26]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[24], deck.cards[24]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[18], deck.cards[18]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[28], deck.cards[28]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[31], deck.cards[31]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[22], deck.cards[22]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[33], deck.cards[33]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[26], deck.cards[26]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[34], deck.cards[34]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[27], deck.cards[27]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[23], deck.cards[23]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[27], deck.cards[27]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[27], deck.cards[27]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 9));
			break;
		case 18:
			// player 0
			deck.cards[0] = [deck.cards[23], deck.cards[23]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[11], deck.cards[11]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[7], deck.cards[7]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[34], deck.cards[34]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[30], deck.cards[30]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[28], deck.cards[28]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[17], deck.cards[17]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[11], deck.cards[11]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[14], deck.cards[14]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[19], deck.cards[19]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[27], deck.cards[27]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[34], deck.cards[34]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[25], deck.cards[25]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[28], deck.cards[28]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[21], deck.cards[21]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[16], deck.cards[16]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[24], deck.cards[24]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[18], deck.cards[18]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[31], deck.cards[31]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[24], deck.cards[24]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[28], deck.cards[28]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[22], deck.cards[22]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[26], deck.cards[26]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[34], deck.cards[34]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[28], deck.cards[28]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[25], deck.cards[25]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[30], deck.cards[30]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 9));
			break;
		case 19:
			// player 0
			deck.cards[0] = [deck.cards[32], deck.cards[32]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[24], deck.cards[24]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[8], deck.cards[8]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[34], deck.cards[34]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[22], deck.cards[22]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[10], deck.cards[10]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[6], deck.cards[6]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[17], deck.cards[17]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[10], deck.cards[10]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[33], deck.cards[33]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[33], deck.cards[33]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[31], deck.cards[31]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[19], deck.cards[19]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[31], deck.cards[31]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[17], deck.cards[17]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[34], deck.cards[34]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[28], deck.cards[28]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[32], deck.cards[32]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[23], deck.cards[23]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[19], deck.cards[19]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[30], deck.cards[30]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[26], deck.cards[26]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[23], deck.cards[23]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[32], deck.cards[32]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[25], deck.cards[25]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[26], deck.cards[26]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 9));
			break;
		case 20:
			// player 0
			deck.cards[0] = [deck.cards[21], deck.cards[21]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[29], deck.cards[29]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[25], deck.cards[25]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[9], deck.cards[9]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[29], deck.cards[29]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[30], deck.cards[30]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[18], deck.cards[18]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[10], deck.cards[10]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[24], deck.cards[24]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[31], deck.cards[31]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[15], deck.cards[15]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[11], deck.cards[11]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[34], deck.cards[34]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[14], deck.cards[14]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[20], deck.cards[20]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[34], deck.cards[34]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[24], deck.cards[24]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[21], deck.cards[21]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[33], deck.cards[33]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[30], deck.cards[30]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[35], deck.cards[35]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[30], deck.cards[30]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[23], deck.cards[23]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[31], deck.cards[31]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[31], deck.cards[31]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[26], deck.cards[26]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 9));
			break;
		case 21:
			// player 0
			deck.cards[0] = [deck.cards[35], deck.cards[35]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[27], deck.cards[27]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[19], deck.cards[19]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[29], deck.cards[29]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[24], deck.cards[24]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[32], deck.cards[32]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[22], deck.cards[22]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[14], deck.cards[14]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[19], deck.cards[19]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[16], deck.cards[16]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[16], deck.cards[16]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[18], deck.cards[18]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[26], deck.cards[26]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[29], deck.cards[29]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[31], deck.cards[31]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[18], deck.cards[18]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[28], deck.cards[28]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[35], deck.cards[35]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[29], deck.cards[29]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[20], deck.cards[20]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[25], deck.cards[25]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[25], deck.cards[25]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[28], deck.cards[28]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[30], deck.cards[30]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[31], deck.cards[31]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[35], deck.cards[35]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 9));
			break;
		case 22:
			// player 0
			deck.cards[0] = [deck.cards[14], deck.cards[14]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[2], deck.cards[2]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[23], deck.cards[23]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[15], deck.cards[15]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[7], deck.cards[7]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[29], deck.cards[29]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[9], deck.cards[9]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[12], deck.cards[12]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[8], deck.cards[8]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[34], deck.cards[34]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[18], deck.cards[18]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[31], deck.cards[31]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[35], deck.cards[35]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[31], deck.cards[31]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[15], deck.cards[15]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[31], deck.cards[31]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[17], deck.cards[17]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[21], deck.cards[21]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[22], deck.cards[22]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[26], deck.cards[26]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[30], deck.cards[30]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[22], deck.cards[22]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[34], deck.cards[34]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[32], deck.cards[32]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[28], deck.cards[28]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[35], deck.cards[35]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[27], deck.cards[27]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 9));
			break;
		case 23:
			// player 0
			deck.cards[0] = [deck.cards[19], deck.cards[19]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[30], deck.cards[30]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[2], deck.cards[2]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[29], deck.cards[29]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[30], deck.cards[30]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[32], deck.cards[32]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[16], deck.cards[16]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[30], deck.cards[30]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[19], deck.cards[19]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[23], deck.cards[23]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[33], deck.cards[33]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[21], deck.cards[21]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[13], deck.cards[13]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[23], deck.cards[23]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[22], deck.cards[22]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[22], deck.cards[22]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[23], deck.cards[23]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[19], deck.cards[19]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[35], deck.cards[35]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[29], deck.cards[29]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[26], deck.cards[26]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[35], deck.cards[35]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[33], deck.cards[33]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[23], deck.cards[23]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[29], deck.cards[29]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[29], deck.cards[29]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[28], deck.cards[28]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 9));
			break;
		case 24:
			// player 0
			deck.cards[0] = [deck.cards[31], deck.cards[31]=deck.cards[0]][0];
			deck.cards[1] = [deck.cards[27], deck.cards[27]=deck.cards[1]][0];
			deck.cards[2] = [deck.cards[19], deck.cards[19]=deck.cards[2]][0];
			deck.cards[3] = [deck.cards[18], deck.cards[18]=deck.cards[3]][0];
			deck.cards[4] = [deck.cards[10], deck.cards[10]=deck.cards[4]][0];
			deck.cards[5] = [deck.cards[6], deck.cards[6]=deck.cards[5]][0];
			deck.cards[6] = [deck.cards[25], deck.cards[25]=deck.cards[6]][0];
			deck.cards[7] = [deck.cards[25], deck.cards[25]=deck.cards[7]][0];
			deck.cards[8] = [deck.cards[31], deck.cards[31]=deck.cards[8]][0];
			// player 1
			deck.cards[9] = [deck.cards[35], deck.cards[35]=deck.cards[9]][0];
			deck.cards[10] = [deck.cards[18], deck.cards[18]=deck.cards[10]][0];
			deck.cards[11] = [deck.cards[15], deck.cards[15]=deck.cards[11]][0];
			deck.cards[12] = [deck.cards[21], deck.cards[21]=deck.cards[12]][0];
			deck.cards[13] = [deck.cards[27], deck.cards[27]=deck.cards[13]][0];
			deck.cards[14] = [deck.cards[35], deck.cards[35]=deck.cards[14]][0];
			deck.cards[15] = [deck.cards[20], deck.cards[20]=deck.cards[15]][0];
			deck.cards[16] = [deck.cards[18], deck.cards[18]=deck.cards[16]][0];
			deck.cards[17] = [deck.cards[19], deck.cards[19]=deck.cards[17]][0];
			// player 2
			deck.cards[18] = [deck.cards[32], deck.cards[32]=deck.cards[18]][0];
			deck.cards[19] = [deck.cards[28], deck.cards[28]=deck.cards[19]][0];
			deck.cards[20] = [deck.cards[24], deck.cards[24]=deck.cards[20]][0];
			deck.cards[21] = [deck.cards[32], deck.cards[32]=deck.cards[21]][0];
			deck.cards[22] = [deck.cards[31], deck.cards[31]=deck.cards[22]][0];
			deck.cards[23] = [deck.cards[33], deck.cards[33]=deck.cards[23]][0];
			deck.cards[24] = [deck.cards[29], deck.cards[29]=deck.cards[24]][0];
			deck.cards[25] = [deck.cards[28], deck.cards[28]=deck.cards[25]][0];
			deck.cards[26] = [deck.cards[26], deck.cards[26]=deck.cards[26]][0];
			deck.cards.push.apply(deck.cards, deck.cards.splice(0, 9));
			break;
		default:
			deck.cards = _.shuffle(cards);
			break;
	}

*/

