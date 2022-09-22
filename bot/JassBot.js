/*jshint esversion: 6 */
/*jshint esversion: 8 */

import WebSocket from 'ws';
import * as GameType from '../server/game/gameType';
import {GameMode} from '../shared/game/gameMode';
import * as Card from '../shared/deck/card';
import {CardColor} from '../shared/deck/cardColor';
import Validation from '../shared/game/validation/validation';
import * as messages from '../shared/messages/messages';
import {MessageType} from '../shared/messages/messageType';
import {SessionChoice} from '../shared/session/sessionChoice';
import fetch from 'node-fetch';

let JassBot = {

    onMessage(messageJson) {
        let message = JSON.parse(messageJson);

        if (message.type === MessageType.REQUEST_PLAYER_NAME.name) {
            this.client.send(JSON.stringify(messages.create(MessageType.CHOOSE_PLAYER_NAME.name, this.name)));
        }

        if (message.type === MessageType.REQUEST_SESSION_CHOICE.name) {
            if (this.sessionName) {
                this.client.send(JSON.stringify(messages.create(
                    MessageType.CHOOSE_SESSION.name,
                    SessionChoice.JOIN_EXISTING,
                    {
                        sessionName: this.sessionName,
                        chosenTeamIndex: this.teamToJoin
                    }
                )));
            } else {
                this.client.send(JSON.stringify(messages.create(MessageType.CHOOSE_SESSION.name, SessionChoice.AUTOJOIN)));
            }
        }

        if (message.type === MessageType.DEAL_CARDS.name) {
            this.handcards = this.mapCardsFromJson(message.data);
        }

        if (message.type === MessageType.REQUEST_CARD.name) {

            //returns the Card from Thomas bot. Format:
            // {
            //     "card": "D9"
            // }
            fetchApiCardRequest(this.gameState).then(data => {
                this.botCard = data;
            });

            delay(2000).then(() => {

                let correctCard = this.cardTransition(this.botCard);
                let handCard2 = this.giveBotResponseCard(this.mapCardsFromJson(message.data), this.handcards, correctCard);

                //let handCard = this.giveValidCardFromHand(this.mapCardsFromJson(message.data), this.handcards);
                this.handcards.splice(this.handcards.indexOf(handCard2), 1);
                let chooseCardResonse = messages.create(MessageType.CHOOSE_CARD.name, handCard2);
                this.client.send(JSON.stringify(chooseCardResonse));
            });
        }

        if (message.type === MessageType.REQUEST_TRUMPF.name) {

            //returns the Trump from Thomas bot. Format:
            // {
            //     "trump": 1
            // }
            //DIAMONDS    = 0                         # type: int  # Ecken / Schellen
            // D           = DIAMONDS
            // HEARTS      = 1                         # type: int  # Herz / Rosen
            // H           = HEARTS
            // SPADES      = 2                         # type: int  # Schaufeln / Schilten
            // S           = SPADES
            // CLUBS       = 3                         # type: int  # Kreuz / Eichel
            // C           = CLUBS
            // OBE_ABE     = 4                         # type: int
            // O           = OBE_ABE
            // UNE_UFE     = 5                         # type: int
            // U           = UNE_UFE

            fetchApiTrumpRequest(this.gameState).then(data => {
                this.botTrump = data;
            });

            delay(2000).then(() => {

                let correctTrump = this.trumpTransition(this.botTrump);
                //console.log(correctTrump);

                let botsChosenTrump = messages.create(MessageType.CHOOSE_TRUMPF.name, this.trumpTransition(this.botTrump));
                //console.log(botsChosenTrump);

                //let chooseTrumpfResponse = messages.create(MessageType.CHOOSE_TRUMPF.name, this.gameType);
                this.client.send(JSON.stringify(botsChosenTrump));
            });
        }

        if (message.type === MessageType.REJECT_CARD.name) {
            throw new Error(`Played invalid card: ${JSON.stringify(message.data)}.\nAvailbable cards: ${JSON.stringify(this.handcards)}`);
        }

        if (message.type === MessageType.BROADCAST_TRUMPF.name) {
            if (message.data.mode !== GameMode.SCHIEBE) {
                this.gameType = GameType.create(message.data.mode, message.data.trumpfColor);
            }
        }
        //new if the gameState is Broadcasted
        if (message.type === MessageType.BROADCAST_GAMESTATE.name) {
            this.gameState = message.data;
        }
    },

    mapCardsFromJson(cards) {
        return cards.map((element) => {
            return Card.create(element.number, element.color);
        });
    },

    giveValidCardFromHand(tableCards, handCards) {
        let validation = Validation.create(this.gameType.mode, this.gameType.trumpfColor);

        for (let i = 0; i < handCards.length; i++) {
            let handCard = handCards[i];

            if (validation.validate(tableCards, handCards, handCard)) {
                return handCard;
            }
        }
    },

    /**
     * Searches for the correct card in the hand of the players
     * @param {array} tableCards card already on the table
     * @param {array} handCards cards left in players hand
     * @param {JSON} chosenCard card chosen from the bot via API call
     * @returns {*} card from handCards that matched the chosenCard
     */
    giveBotResponseCard(tableCards, handCards, chosenCard) {
        let validation = Validation.create(this.gameType.mode, this.gameType.trumpfColor);
        //console.log('CARD CHOSEN: ');
        //console.log(chosenCard);
        for (let i = 0; i < handCards.length; i++) {
            let handCard = handCards[i];
            if(handCard.number === chosenCard.number && handCard.color === chosenCard.color){
                if (validation.validate(tableCards, handCards, handCard)) {
                  //console.log('VALIDATED: ');
                  //console.log(handCard);
                  return handCard;
                }
            }
        }
    },

    /**
     * Translates the card from the API call into a card, that has the format of the jass-server-ui
     * @param {JSON} response card from the API call
     * @returns {{number: number, color: string}} card in jass-server-ui format
     */
    cardTransition(response) {
        var finalCard = {
            'number': 5,
            'color': 'EMPTY'
        };

        let cardString = response.card;
        let [color, number] = [cardString.slice(0, 1), cardString.slice(1)];

        switch (color) {
            case 'D':
                finalCard.color = 'DIAMONDS';
                break;
            case 'H':
                finalCard.color = 'HEARTS';
                break;
            case 'S':
                finalCard.color = 'SPADES';
                break;
            case 'C':
                finalCard.color = 'CLUBS';
                break;
            default:
                break;
        }

        switch (number) {
            case 'A':
                finalCard.number = 14;
                break;
            case 'K':
                finalCard.number = 13;
                break;
            case 'Q':
                finalCard.number = 12;
                break;
            case 'J':
                finalCard.number = 11;
                break;
            default:
                finalCard.number = parseInt(number);
                break;
        }
        return finalCard;
    },

    /**
     * Translates the trump answer from the API call into jass-server-ui format.
     * @param {JSON} response chosen trump from the bot
     * @returns {{mode: *, trumpfColor: *}} trump in jass-server-ui format
     */
    trumpTransition(response){

        let trumpTemp = response.trump;
        let botMode;

        switch (trumpTemp) {
            case 0:
                botMode = GameType.create(GameMode.TRUMPF, CardColor.DIAMONDS);
                break;
            case 1:
                botMode = GameType.create(GameMode.TRUMPF, CardColor.HEARTS);
                break;
            case 2:
                botMode = GameType.create(GameMode.TRUMPF, CardColor.SPADES);
                break;
            case 3:
                botMode = GameType.create(GameMode.TRUMPF, CardColor.CLUBS);
                break;
            case 4:
                //strange to give a color when undeufe/obeabe.
                botMode = GameType.create(GameMode.OBEABE, CardColor.SPADES);
                break;
            case 5:
                botMode = GameType.create(GameMode.UNDEUFE, CardColor.SPADES);
                break;
            default:
                break;
        }
        //console.log(botMode);
        return botMode;
    }
};

/**
 * Fetches an API card request to a bot.
 * @param {JSON} currentState this is the gameState of the current Game
 * @returns {Promise<*>} if successful we get a card, chosen from the bot
 */
async function fetchApiCardRequest(currentState) {

    try {
        //console.log(`InFetch state::: ${JSON.stringify(currentState)}`);
        console.log(currentState);
        let response = await fetch('http://jass-agent.abiz.ch/tiresias/action_play_card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentState),
        });
        let data = await response.json();
        return data;

    } catch (e){
        console.log(e);
    }
}


/**
 * Fetches an API trump request to a bot.
 * @param {JSON} currentState this is the gameState of the current Game
 * @returns {Promise<*>} if successful we get a trump, chosen from the bot
 */
async function fetchApiTrumpRequest(currentState) {

    try {
     //console.log(`InFetch state::: ${JSON.stringify(currentState)}`);

     let response = await fetch('http://jass-agent.abiz.ch/tiresias/action_trump', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(currentState),
            });

     let data = await response.json();
     return data;

     } catch (e){
        console.log(e);
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

export function create(name, url = 'ws://localhost:3000', sessionName, teamToJoin) {
    let clientBot = Object.create(JassBot);
    clientBot.handcards = [];
    clientBot.botCard = {};
    clientBot.botTrump = {};
    clientBot.client = new WebSocket(url);
    clientBot.client.on('message', clientBot.onMessage.bind(clientBot));
    clientBot.name = 'Computer';
    clientBot.sessionName = sessionName;
    clientBot.teamToJoin = teamToJoin;
    clientBot.gameType = GameType.create(GameMode.TRUMPF, CardColor.SPADES);
    clientBot.gameState = {};
    return clientBot;
}
