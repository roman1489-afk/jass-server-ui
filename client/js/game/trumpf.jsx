import React from 'react';
import {GameMode} from '../../../shared/game/gameMode';
import {CardColor} from '../../../shared/deck/cardColor';

export default (props) => {

	let mode = props.mode,
		color = props.color,
		cardType = props.cardType,
		basePath = '/images/trumpf/',
		imagePath,
		titleString;

	switch (mode) {
		case GameMode.TRUMPF:
			imagePath = basePath + cardType + '/' + color.toLowerCase() + '.png';
			switch (color) {
				case CardColor.HEARTS:
					titleString = 'Hearts/Rose';
					break;
				case CardColor.DIAMONDS:
					titleString = 'Diamonds/Eichle';
					break;
				case CardColor.CLUBS:
					titleString = 'Clubs/Schelle';
					break;
				case CardColor.SPADES:
					titleString = 'Spades/Schilte';
			}
			break;
		case GameMode.OBEABE:
			imagePath = basePath + 'obeabe.jpg';
			titleString = 'Top-Down/Obe-Abe';
			break;
		case GameMode.UNDEUFE:
			imagePath = basePath + 'undeufe.jpg';
			titleString = 'Bottom-Up/Unde-Ufe';
			break;
		case GameMode.SCHIEBE:
			imagePath = basePath + 'schiebe.jpg';
			titleString = 'Shifted/Geschoben';
			break;
	}

	function isTrumpfChosen() {
		return mode || color;
	}

	return (
		<div>
			<img id="shift"
				 className={props.isGeschoben && isTrumpfChosen() && mode !== GameMode.SCHIEBE ? '' : 'hidden'}
				 src={basePath + 'schiebe.jpg'} alt={titleString} title={titleString}
			/>
			<img id="trumpf" className={isTrumpfChosen() ? '' : 'hidden'}
				 src={imagePath} alt={titleString} title={titleString}
			/>
		</div>
	);
};
