import React from 'react';
import {GameMode, getTrumpfImagePath, getTrumpfTitleString} from '../../../shared/game/gameMode';

export default (props) => {

	let mode = props.mode,
		color = props.color,
		cardType = props.cardType,
		imagePath = getTrumpfImagePath(cardType, mode, color),
		titleString = getTrumpfTitleString(mode, color);

	function isTrumpfChosen() {
		return mode || color;
	}

	return (
		<div>
			<img id="shift"
				 className={props.isGeschoben && isTrumpfChosen() && mode !== GameMode.SCHIEBE ? '' : 'hidden'}
				 src={getTrumpfImagePath(cardType, GameMode.SCHIEBE)} alt={titleString} title={titleString}
			/>
			<img id="trumpf" className={isTrumpfChosen() ? '' : 'hidden'}
				 src={imagePath} alt={titleString} title={titleString}
			/>
		</div>
	);
};
