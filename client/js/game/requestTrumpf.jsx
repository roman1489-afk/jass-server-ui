import React from 'react';
import {CardColor} from '../../../shared/deck/cardColor';
import {GameMode, getTrumpfImagePath, getTrumpfTitleString} from '../../../shared/game/gameMode';
import JassActions from '../jassActions';

function chooseTrumpf(mode, color) {
	JassActions.chooseTrumpf(mode, color);
}


export default (props) => {

	function isSuggestedTrumpf(mode, color) {
		if (!props.suggestionEnabled)
			return false;
		let suggestedTrumpf = props.suggestedTrumpf;
		if (!suggestedTrumpf)
			return false;
		return suggestedTrumpf.mode === mode && (!suggestedTrumpf.trumpfColor || suggestedTrumpf.trumpfColor === color);
	}

	function getTrumpfImageDiv(mode, color) {
		let classes = 'recommended';
		if (!isSuggestedTrumpf(mode, color))
			classes += ' hidden';
		return (
			<div>
				<img className={'trumpf'} onClick={() => chooseTrumpf(mode, color)} src={getTrumpfImagePath(props.cardType, mode, color)}
					 alt={getTrumpfTitleString(mode, color)} title={getTrumpfTitleString(mode, color)}
				/>
				<img className={classes} src={'/images/recommended.png'}/>
			</div>
		);
	}

	return (
		<div id="requestTrumpf">
			{getTrumpfImageDiv(GameMode.TRUMPF, CardColor.HEARTS)}
			{getTrumpfImageDiv(GameMode.TRUMPF, CardColor.DIAMONDS)}
			{getTrumpfImageDiv(GameMode.TRUMPF, CardColor.CLUBS)}
			{getTrumpfImageDiv(GameMode.TRUMPF, CardColor.SPADES)}
			{getTrumpfImageDiv(GameMode.UNDEUFE)}
			{getTrumpfImageDiv(GameMode.OBEABE)}
			{!props.isGeschoben ? getTrumpfImageDiv(GameMode.SCHIEBE) : undefined}
		</div>
	);
};
