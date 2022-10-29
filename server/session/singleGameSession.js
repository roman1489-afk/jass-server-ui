import * as ClientApi from '../communication/clientApi';
import * as Game from '../game/game';
import * as Player from '../game/player/player';
import * as Advisor from '../game/player/advisor';
import * as Team from '../game/player/team';
import {SessionType} from '../../shared/session/sessionType';
import SessionHandler from './sessionHandler';
import {startJassTheRipperBot} from '../bot/botStarter';
import {Logger} from '../logger';
import EnvironmentUtil from '../registry/environmentUtil';
import * as JsonResultProxy from '../communication/jsonResultProxy';

const tournamentLogging = EnvironmentUtil.getTournamentLogging();
const tournamentLoggingDir = EnvironmentUtil.getTournamentLoggingDir();

function createTeamsArrayForClient(session) {
	return session.teams.map((team) => {
		return {
			name: team.name,
			players: session.players.filter((player) => {
				return player.team.name === team.name;
			}).map((player) => {
				return {
					name: player.name,
					id: player.id,
					seatId: player.seatId
				};
			})
		};
	});
}

function getPlayersInTeam(session, team) {
	return session.players.filter(player => player.team.name === team.name);
}

function getPlayerByName(session, playerName) {
	return session.players.filter(player => player.name === playerName)[0];
}

function getFirstAvailableTeamIndex(session) {
	const firstFreePlayerIndex = session.players.findIndex((player, index) => player.seatId !== index);
	if (firstFreePlayerIndex !== -1) {
		return firstFreePlayerIndex % 2;
	} else {
		return session.players.length % 2;
	}
}

function assignTeamIndex(session, teamIndex = getFirstAvailableTeamIndex(session)) {
	let playersInTeam = getPlayersInTeam(session, session.teams[teamIndex]).length;
	if (playersInTeam === 2) {
		// can not assign to this team, use other team.
		teamIndex = (teamIndex === 0) ? 1 : 0;
	}
	return teamIndex;
}

function bindClientApi(session, webSocket) {
	return {
		dealCards: session.clientApi.dealCards.bind(session.clientApi, webSocket),
		requestTrumpf: session.clientApi.requestTrumpf.bind(session.clientApi, webSocket),
		rejectTrumpf: session.clientApi.rejectTrumpf.bind(session.clientApi, webSocket),
		suggestTrumpf: session.clientApi.suggestTrumpf.bind(session.clientApi, webSocket),
		requestCard: session.clientApi.requestCard.bind(session.clientApi, webSocket),
		rejectCard: session.clientApi.rejectCard.bind(session.clientApi, webSocket),
		suggestCard: session.clientApi.suggestCard.bind(session.clientApi, webSocket),
	};
}

/**
 * @param chosenTeamIndex index of the team the player would like to join (optional, otherwise the next free place is assigned)
 */
function createPlayer(session, webSocket, playerName, chosenTeamIndex, isHuman) {
	// Calculate team and player index (depending on chosen team or assign one)
	const teamIndex = assignTeamIndex(session, chosenTeamIndex);
	const playersInTeam = getPlayersInTeam(session, session.teams[teamIndex]).length;
	const seatId = (playersInTeam * 2) + teamIndex;
	const playerId = uuidv4();
	webSocket.jassChallengeId = `${playerName}#${seatId}`;

	return Player.create(session.teams[teamIndex], playerName, playerId, seatId, isHuman, bindClientApi(session, webSocket));
}

// from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function insertPlayer(session, player) {
	if (player.seatId > session.players.length) {
		session.players.push(player);
	} else {
		session.players.splice(player.seatId, 0, player);
	}
}

function registerPlayerAsClient(session, webSocket, player) {
	session.clientApi.addClient(webSocket).catch(({code: code, message: message}) => {
		session.handlePlayerLeft(player, code, message);
	});
}

function registerClientAndBroadcastSessionJoined(session, webSocket, playerJoined) {

	registerPlayerAsClient(session, webSocket, playerJoined);

	session.lastSessionJoin = {
		player: {
			id: playerJoined.id,
			seatId: playerJoined.seatId,
			name: playerJoined.name
		},
		playersInSession: session.players
			.map(player => {
				return {
					id: player.id,
					seatId: player.seatId,
					name: player.name
				};
			})
	};
	session.clientApi.broadcastSessionJoined(
		session.name,
		session.lastSessionJoin.player,
		session.lastSessionJoin.playersInSession
	);
}

const Session = {
	maxPoints: EnvironmentUtil.getMaxPoints(),
	orthogonalCardsEnabled: EnvironmentUtil.getOrthogonalCardsEnabled(),
	oldDeckCards: null,
	startingPlayer: 0,
	type: SessionType.SINGLE_GAME,
	finishGame: undefined,
	started: false,
	finished: false,

	/**
	 * @param chosenTeamIndex index of the team the player would like to join (optional, otherwise the next free place is assigned)
	 */
	addPlayer(webSocket, playerName, chosenTeamIndex, isHuman) {
		const player = createPlayer(this, webSocket, playerName, chosenTeamIndex, isHuman);
		insertPlayer(this, player);
		registerClientAndBroadcastSessionJoined(this, webSocket, player);

		// why if isHuman we start a bot?
		/*if (isHuman)
			startJassTheRipperBot({
				sessionName: this.name,
				chosenTeamIndex: chosenTeamIndex,
				advisedPlayerName: playerName
			});*/

		// Why does there have to be a joinBotListener for every player added?

		this.joinBotListeners.push(this.clientApi.subscribeToJoiningBotsMessage(webSocket));
	},

	addSpectator(webSocket) {
		this.clientApi.addClient(webSocket);
		this.clientApi.sessionJoined(webSocket, this.name, {name: 'Spectator'}, this.lastSessionJoin.playersInSession);
	},

	addAdvisor(webSocket, advisedPlayerName) {
		let advisedPlayer = getPlayerByName(this, advisedPlayerName);
		advisedPlayer.advisor = Advisor.create(advisedPlayerName + '-Advisor', bindClientApi(this, webSocket));
		this.clientApi.addClient(webSocket);
		this.clientApi.sessionJoined(webSocket, this.name, {name: advisedPlayer.advisor.name}, this.lastSessionJoin.playersInSession);
	},

	isComplete() {
		return this.players.length === 4;
	},

	getNextStartingPlayer() {
		return this.startingPlayer++ % 4;
	},

	start(seed = 0) {
		if (!this.isComplete()) {
			throw 'Not enough players to start game!';
		}

		this.joinBotListeners.forEach(joinBotListener => joinBotListener());

		let resultProxy;

		let fs = require('fs');
		try {
			if (!fs.existsSync(tournamentLoggingDir)) {
				fs.mkdirSync(tournamentLoggingDir, {recursive: true});
			}
		} catch (err) {
			console.error(err)
		}
		// set local time
		let dateInCurrentTimeZone = new Date();
		let today = dateInCurrentTimeZone.toISOString().slice(0, 10)
		let timeNow = `${dateInCurrentTimeZone.getHours()}-${dateInCurrentTimeZone.getMinutes()}`;
		let todayFormat = today.concat('-', timeNow);
		resultProxy = JsonResultProxy.create(`${tournamentLoggingDir}/${this.players[0].name} vs ${this.players[1].name}_${todayFormat}`);
		this.clientApi.setCommunicationProxy(resultProxy);

		this.clientApi.broadcastTeams(createTeamsArrayForClient(this));

		return new Promise((resolve) => {
			this.started = true;
			this.finishGame = winningTeam => {
				this.started = false;
				this.finished = true;
				this.clientApi.broadcastWinnerTeam(winningTeam);
				resolve(winningTeam);
			};

			this.gameCycle(seed)
				.then((winningTeam) => {
					this.finishGame(winningTeam);

					if (tournamentLogging) {
						resultProxy.destroy();
					}
				})
				.catch(error => {
					if (error && error.data) {
						const failingPlayer = error.data;
						Logger.error(`Player ${failingPlayer.name}: ${error.message}`);
						const winningTeam = this.teams.find(team => team.name !== failingPlayer.team.name);
						this.finishGame(winningTeam);
					} else {
						Logger.error(error);
						const winningTeam = this.teams[0].points >= this.teams[1].points ? this.teams[0] : this.teams[1];
						this.finishGame(winningTeam);
					}

					if (tournamentLogging) {
						resultProxy.destroy();
					}
				});
		});
	},

	gameCycle(seed = 0, nextStartingPlayer = this.getNextStartingPlayer()) {
		this.teams[0].myRound++;
		this.teams[1].myRound++;

		let players = this.players.slice();
		let game = Game.create(players, this.maxPoints, this.players[nextStartingPlayer], this.clientApi, seed, this.oldDeckCards, this.allRounds);


		this.allRounds[(game.deck.getRounds-1)] = game.deckCards;

		console.log('In session:')
		console.log(this.allRounds);


		if (this.orthogonalCardsEnabled) {
			if (!this.oldDeckCards)
				this.oldDeckCards = game.deckCards;
			else
				this.oldDeckCards = null;
		}

		// decider if the game is finished or not!
		return game.start().then(() => {
			let pointsTeamA = this.teams[0].points;
			let pointsTeamB = this.teams[1].points;

			//for our experiment the amount of rounds is set to 10!
			console.log('Amount of rounds:' + game.deck.getRounds);
			console.log('Team 1 currentRound:' + this.teams[0].myRound);
			if (pointsTeamA > pointsTeamB && (game.deck.getRounds === 16)) {
				return this.teams[0];
			}

			if (pointsTeamB > pointsTeamA && (game.deck.getRounds === 16)) {
				return this.teams[1];
			}

			// If there is a seed set (has to be a positive number!)
			if (seed > 0)
				seed++; // Increase seed with every round, so that we get different cards each round
			return this.gameCycle(seed, this.getNextStartingPlayer());
		});
	},

	close(message) {
		this.clientApi.closeAll(message);
	},

	handlePlayerLeft(player, code, message) {
		if (!this.finished) {
			const messageToPrint = message || 'No Message given';

			Logger.error(`Player ${player.name} left with reason: ${code}|${messageToPrint}`);
			this.clientApi.broadcastPlayerLeft(player.name);

			const team = this.teams.filter(team => team.name !== player.team.name)[0];

			if (this.started) {
				this.finishGame(team);
			} else {
				this.close(message);
				SessionHandler.removeSession(this);
			}
		}
	},

	dispose() {
		this.clientApi.dispose();
	}
};

export function create(name, timeoutInMillis) {
	let session = Object.create(Session);
	session.players = [];
	session.advisors = [];
	session.name = name;
	session.teams = [
		Team.create('Team 1'),
		Team.create('Team 2')
	];
	session.clientApi = ClientApi.create(timeoutInMillis);
	session.isTournament = false;
	session.finalizeRegistrationForPlayerFunctions = {};
	session.joinBotListeners = [];
	session.allRounds = [[], [], [], [], [], [], [], []];
	return session;
}
