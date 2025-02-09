import * as Deck from './deck/deck';
import * as Cycle from './cycle/cycle';
import {GameMode} from './../../shared/game/gameMode';
import * as GameState from './gameState';

function handleChooseTrumpf(game, gameType) {
	game.gameType = gameType;
	game.gameState.update('trump', gameType);
	game.clientApi.broadcastTrumpf(gameType);
	game.clientApi.broadcastGameState(game.gameState.getGameState);
	return game.nextCycle();
}

function handleChooseTrumpfGeschoben(game, actPlayer, gameType) {
	game.gameState.update('invertSchiebe', actPlayer.seatId);
	game.gameState.update('geschoben', actPlayer.seatId);
	game.clientApi.broadcastGameState(game.gameState.getGameState);

	if (gameType.mode !== GameMode.SCHIEBE) {
		return handleChooseTrumpf(game, gameType);
	}

	actPlayer.rejectTrumpf(gameType);
	return actPlayer.requestTrumpf(true).then((gameType) => {
		return handleChooseTrumpfGeschoben(game, actPlayer, gameType);
	});
}

function transformErrorMessageToErrorObject(player, message) {
	return new Promise((resolve, reject) => reject({
		message,
		data: player
	}));
}

let Game = {

	currentRound: 0,

	nextCycle(startPlayer) {
		if (this.currentRound < 9) {
			this.startPlayer = startPlayer || this.startPlayer;
			this.gameState.update('player', this.startPlayer.seatId);
			this.gameState.update('first', this.startPlayer.seatId);
			this.clientApi.broadcastGameState(this.gameState.getGameState);
			let cycle = Cycle.create(this.startPlayer, this.players, this.clientApi, this.gameType, this.gameState);
			this.currentRound++;
			return cycle.iterate().then((winner) => {

				this.gameState = cycle.gameState;
				this.gameState.update('win', winner.seatId);
				this.clientApi.broadcastGameState(this.gameState.getGameState);
				return this.nextCycle(winner);
			});
		} else {
			this.gameState.update('reset', this.currentRound);
			this.clientApi.broadcastGameState(this.gameState.getGameState);
		}
	},

	schieben() {
		for (let i = 0; i < this.players.length; i++) {
			let actPlayer = this.players[i];
			if (actPlayer !== this.startPlayer && actPlayer.team.name === this.startPlayer.team.name) {

				this.gameState.update('schiebe', actPlayer.seatId);
				this.clientApi.broadcastGameState(this.gameState.getGameState);

				return actPlayer.requestTrumpf(true)
					.catch(error => transformErrorMessageToErrorObject(actPlayer, error))
					.then(gameType => handleChooseTrumpfGeschoben(this, actPlayer, gameType)
					);
			}
		}
	},

	start() {
		return this.startPlayer.requestTrumpf(false)
			.catch(error => transformErrorMessageToErrorObject(this.startPlayer, error))
			.then((gameType) => {
				console.log(gameType.mode);
				console.log(gameType.trumpfColor);
				if (gameType.mode === GameMode.SCHIEBE) {
					this.clientApi.broadcastTrumpf(gameType);
					return this.schieben();
				} else {
					return handleChooseTrumpf(this, gameType);
				}
			});
	},
};

export function create(players, maxPoints, startPlayer, clientApi, seed = 0, oldDeckCards = null, allRounds) {
	let game = Object.create(Game);
	// the game now has a temporary gameState.
	game.gameState = GameState.create();
	game.clientApi = clientApi;
	game.gameState.update('player', startPlayer.seatId);
	game.gameState.update('dealer', startPlayer.seatId);
	game.clientApi.broadcastGameState(game.gameState.getGameState);
	game.deck = Deck.create(seed, oldDeckCards, allRounds);
	game.deckCards = game.deck.cards.slice(); // Store copy for potential future use for orthogonal cards enabled mode
	players.forEach(player => {
		game.deck.deal(player, 9);
	});

	game.gameState.update('cardDistribute', players);
	game.clientApi.broadcastGameState(game.gameState.getGameState);
	game.players = players;
	game.maxPoints = maxPoints;
	game.startPlayer = startPlayer;
	return game;
}
