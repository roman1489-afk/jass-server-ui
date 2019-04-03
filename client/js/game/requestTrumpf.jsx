import React from 'react';
import {CardColor} from '../../../shared/deck/cardColor';
import {GameMode} from '../../../shared/game/gameMode';
import JassActions from '../jassActions';

function chooseTrumpf(mode, color) {
	JassActions.chooseTrumpf(mode, color);
}

export default (props) => {

	let imagePath = '/images/trumpf/',
		cardTypeImagePath = imagePath + props.cardType + '/';

	return (
		<div id="requestTrumpf">
			<img onClick={() => chooseTrumpf(GameMode.TRUMPF, CardColor.HEARTS)} src={cardTypeImagePath + 'hearts.png'}
				 alt={'Hearts/Rose'} title={'Hearts/Rose'}
			/>
			<img onClick={() => chooseTrumpf(GameMode.TRUMPF, CardColor.DIAMONDS)}
				 src={cardTypeImagePath + 'diamonds.png'}
				 alt={'Diamonds/Eichle'} title={'Diamonds/Eichle'}
			/>
			<img onClick={() => chooseTrumpf(GameMode.TRUMPF, CardColor.CLUBS)} src={cardTypeImagePath + 'clubs.png'}
				 alt={'Clubs/Schelle'} title={'Clubs/Schelle'}
			/>
			<img onClick={() => chooseTrumpf(GameMode.TRUMPF, CardColor.SPADES)} src={cardTypeImagePath + 'spades.png'}
				 alt={'Spades/Schilte'} title={'Spades/Schilte'}
			/>
			<img onClick={() => chooseTrumpf(GameMode.UNDEUFE)} src={imagePath + 'undeufe.png'}
				 alt={'Bottom-Up/Unde-Ufe'} title={'Bottom-Up/Unde-Ufe'}
			/>
			<img onClick={() => chooseTrumpf(GameMode.OBEABE)} src={imagePath + 'obeabe.png'}
				 alt={'Top-Down/Obe-Abe'} title={'Top-Down/Obe-Abe'}
			/>
			{(() => {
				if (!props.isGeschoben) {
					return <img onClick={() => chooseTrumpf(GameMode.SCHIEBE)} src={imagePath + 'schiebe.png'}
								alt={'Shift/Schiebe'} title={'Shift/Schiebe'}
					/>;
				}
			})()}
		</div>
	);
};
