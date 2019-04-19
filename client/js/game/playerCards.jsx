import React from 'react';
import {CardColor} from '../../../shared/deck/cardColor';
import {GameState} from './gameStore';
import JassActions from '../jassActions';
import Validation from '../../../shared/game/validation/validation';

let colorIndices = {};

Object.getOwnPropertyNames(CardColor).forEach((color, index) => {
	colorIndices[color] = index;
});

function playCard(color, number) {
	JassActions.chooseCard(color, number);
}

function cancelClick(color, number, event) {
	event.preventDefault();
}

export default (props) => {

	const cards = props.cards || [],
		isRequestingCard = props.status === GameState.REQUESTING_CARD,
		tableCards = props.tableCards || [],
		mode = props.mode,
		color = props.color,
		cardClick = (isRequestingCard) ? playCard : cancelClick;

	const validator = Validation.create(mode, color);

	document.onkeypress = function (event) {
		if (event.key === 'Enter' || event.key === ' ') {
			let validCards = cards.filter(card => isValid(card));
			if (validCards.length === 1) {
				let card = validCards[0];
				cardClick(card.color, card.number, event);
			}
		}
	};

	function isValid(card) {
		return isRequestingCard ? validator.validate(tableCards, cards, card) : true;
	}

	function isSuggestedCard(card) {
		if (!props.suggestionEnabled)
			return false;
		let suggestedCard = props.suggestedCard;
		if (!suggestedCard)
			return false;
		return suggestedCard.number === card.number && suggestedCard.color === card.color;
	}

	return (
		<div id="playerCards" className={(isRequestingCard) ? 'onTurn' : ''}>
			{cards.sort((a, b) => {
				if (a.color !== b.color) {
					return colorIndices[a.color] - colorIndices[b.color];
				}

				return colorIndices[a.color] - colorIndices[b.color] + a.number - b.number;
			}).map((card) => {
				return (
					<div key={card.color + '-' + card.number} className={(isValid(card)) ? '' : 'invalid'}
						 onClick={(event) => cardClick(card.color, card.number, event)}
					>
						<img className={'card'} src={'/images/cards/' + props.cardType + '/' + card.color.toLowerCase() + '_' + card.number + '.gif'}/>
						{isSuggestedCard(card) ? <img className={'recommended'} src={'/images/recommended.png'}/> : undefined}
					</div>
				);
			})}
		</div>
	);
};
