import React from 'react';
import JassActions from '../jassActions';

function addBot(sessionName, seatId, playerBoxId, botStartingMessage) {
	JassActions.joinBot(sessionName, Number(seatId) % 2);
	document.getElementById(playerBoxId).innerText = botStartingMessage;
	setTimeout(() => {
		if (document.getElementById(playerBoxId).innerText === botStartingMessage) {
			botStartingMessage = 'Bot crashed! Restarting now...';
			addBot(sessionName, seatId, playerBoxId, botStartingMessage);
		}
	}, 25000);
}

function isSeatOccupiedOrNotAllowedForBot(players, player) {
	return isSeatOccupied(player) || isSeatNotAllowedForBot(players, player)
}

function isSeatOccupied(player) {
	return !player.isEmptyPlaceholder;
}

function isSeatNotAllowedForBot(players, player) {
	return (player.seatId === 3 && players.find(p => p.seatId === 1 && p.isEmptyPlaceholder));
}

export default (props) => {

	let players = props.players || [],
		playerSeating = props.playerSeating,
		nextStartingPlayerIndex = props.nextStartingPlayerIndex,
		roundPlayerIndex = props.roundPlayerIndex;

	return (
		<div id="playerNames">
			{players.map((player, index) => {
				let botStartingMessage = 'Bot Starting ...';

				let classes = [];
				let addBotClasses = [];

				if (nextStartingPlayerIndex === index) {
					classes.push('active');
				}

				if (roundPlayerIndex === index) {
					classes.push('round-player');
				}

				if (isSeatOccupiedOrNotAllowedForBot(players, player)) {
					addBotClasses.push('hidden');
				}

				let playerBoxId = 'player-' + playerSeating[index];

				return (
					<div key={player.id} id={playerBoxId} className={classes.join(' ')}>
						<span>{player.name}</span>
						<span title="Add bot player" className={addBotClasses.join(' ')}>
							&nbsp;or&nbsp;
							<button id={'add-bot-button'}
									onClick={() => addBot(props.chosenSession, player.seatId, playerBoxId, botStartingMessage)}
							>
								Add Bot <img className={'add-bot-icon'} src="./images/robot.svg"/>
							</button>
						</span>
						<object data="/images/startingPlayer.svg" type="image/svg+xml"/>
					</div>);
			})}
		</div>
	);
};
