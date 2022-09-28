/*jshint esversion: 6 */
/*jshint esversion: 8 */

import Validation from '../../../shared/game/validation/validation';
import stichGranter from './stichGranter';
import * as Counter from '../counter/counter';
import * as messages from "../../../shared/messages/messages";
import {MessageType} from "../../../shared/messages/messageType";

const Cycle = {
    iterate() {
        const handleChosenCard = (player, card) => {
            this.currentPlayer = player;

            //console.log('UPDATE CORRECT PLAYER INSIDE CYCLE');
            this.gameState.update('playerInCycle', player.seatId);
	        this.clientApi.broadcastGameState(this.gameState.getGameState);



            if (this.validator.validate(this.playedCards, this.currentPlayer.cards, card)) {
                this.playedCards.push(card);
                this.currentPlayer.removeCard(card);
                this.clientApi.broadcastCardPlayed(this.playedCards);

                //console.log('TESTING CARDS');
                //console.log(card);
                this.gameState.update('addCards', card);
                //console.log('DONE ADD CARD TO TRICK');
                this.gameState.update('reduceHand', card);
                //console.log('DONE REDUCE HAND');
                this.clientApi.broadcastGameState(this.gameState.getGameState);

            } else {
                this.currentPlayer.rejectCard(card, this.playedCards);

                return this.currentPlayer.requestCard(this.playedCards)
                    .then(handleChosenCard.bind(null, player));
            }

            return this.playedCards;
        };

        const getOtherTeam = team => this.players.find(player => player.team !== team).team;

        const broadcastAndReturnWinner = (playedCards) => {

            // visual delay for better gamefeeling of humasn players
            // cards will lay on the carpet for 2 seconds after a "stich" 
             delay(2000).then(() => {
                console.log('worked');
            });

            let winner = stichGranter.determineWinner(this.gameType.mode, this.gameType.trumpfColor, playedCards, this.players);
            let winnerTeam = winner.team;
            let loserTeam = getOtherTeam(winnerTeam);
            let actPoints = Counter.count(this.gameType.mode, this.gameType.trumpfColor, playedCards);

            //console.log('TESTING ACT POINTS');
            //console.log(actPoints);
            this.gameState.update('points', actPoints);
            this.clientApi.broadcastGameState(this.gameState.getGameState);

            winnerTeam.points += actPoints;
            winnerTeam.currentRoundPoints += actPoints;

            if (winner.cards.length === 0) {
                const lastStichPoints = Counter.calculateLastStichValue(this.gameType.mode, this.gameType.trumpfColor);
                winnerTeam.points += lastStichPoints;
                winnerTeam.currentRoundPoints += lastStichPoints;

                if (loserTeam.currentRoundPoints === 0) {
                    let matchPoints = Counter.calculateMatchValues(this.gameType.mode, this.gameType.trumpfColor);
                    winnerTeam.points += matchPoints;
                    winnerTeam.currentRoundPoints += matchPoints;
                }

                this.clientApi.broadcastStich(createStichMessage(winner));
                this.clientApi.broadcastGameFinished([winnerTeam, loserTeam]);
                winnerTeam.currentRoundPoints = 0;
                loserTeam.currentRoundPoints = 0;
            } else {
                this.clientApi.broadcastStich(createStichMessage(winner));
            }

            return winner;
        };

        const createStichMessage = winner => ({
            name: winner.name,
            id: winner.id,
            seatId: winner.seatId,
            playedCards: this.playedCards,
            teams: [
                winner.team,
                getOtherTeam(winner.team)
            ]
        });


        return this.players.reduce((previousPlayer, currentPlayer, index) => {
            let previousPromise;

            if (index === 1) {
                previousPromise = previousPlayer.requestCard(this.playedCards)
                    .then(card => handleChosenCard(previousPlayer, card))
                    .catch(message => new Promise((resolve, reject) => reject({ message, data: previousPlayer})));
            } else {
                previousPromise = previousPlayer;
            }

            return previousPromise.then((cardsOnTable) => {
                return currentPlayer.requestCard(cardsOnTable)
                    .then(card => handleChosenCard(currentPlayer, card))
                    .catch(message => new Promise((resolve, reject) => reject({ message, data: currentPlayer})));
            });
        }).then(broadcastAndReturnWinner);
    }
};

function rotatePlayersToCurrentPlayer(players, currentPlayer) {
    for (; players[0] !== currentPlayer;) {
        players.push(players.shift());
    }
}

/**
 * Helper function to get a delay. Used to ensure the API calls.
 * @param {number} time how much time to wait in milliseconds
 * @returns {Promise<unknown>} after the set time the flow of the program resumes
 */
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


export function create(currentPlayer, players, clientApi, gameType, gameState) {
    let cycle = Object.create(Cycle);
    cycle.currentPlayer = currentPlayer;
    cycle.gameState = gameState;
    rotatePlayersToCurrentPlayer(players, currentPlayer);
    cycle.players = players;
    cycle.gameType = gameType;
    cycle.clientApi = clientApi;
    cycle.validator = Validation.create(gameType.mode, gameType.trumpfColor);
    cycle.playedCards = [];
    return cycle;
}
