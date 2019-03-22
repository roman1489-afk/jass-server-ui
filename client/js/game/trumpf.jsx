import React from 'react';
import {GameMode} from '../../../shared/game/gameMode';

export default (props) => {

	let mode = props.mode,
		color = props.color,
		cardType = props.cardType,
		basePath = '/images/trumpf/',
		imagePath;

	switch (mode) {
		case GameMode.TRUMPF:
			imagePath = basePath + cardType + '/' + color.toLowerCase() + '.png';
			break;
		case GameMode.OBEABE:
			imagePath = basePath + 'obeabe.jpg';
			break;
		case GameMode.UNDEUFE:
			imagePath = basePath + 'undeufe.jpg';
			break;
		case GameMode.SCHIEBE:
			imagePath = basePath + 'schiebe.jpg';
			break;
	}

	function isTrumpfChosen() {
		return mode || color;
	}

	return (
		<div>
			<img id="shift" className={props.isGeschoben && isTrumpfChosen() && mode !== GameMode.SCHIEBE ? '' : 'hidden'}
				 src={basePath + 'schiebe.jpg'}
			/>
			<img id="trumpf" className={isTrumpfChosen() ? '' : 'hidden'} src={imagePath}/>
		</div>
	);
};
