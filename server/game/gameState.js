/*jshint esversion: 9 */
/*jshint esversion: 8 */
/*jshint esversion: 6 */

/**
 * Gamestate to keep track of cards played, trump, points etc. This is then used for the API calls see: .jass-server-ui-4/bot/JassBot.js
 * @type {{update: GameState.update, readonly getGameState: {jassTyp: string, gameId: number, trump: number, currentPlayer: number, dealer: number, tricks: *[], playerView: number, version: string, forehand: number, player: [{hand: *[]},{hand: *[]},{hand: *[]},{hand: *[]}]}|{default: number}}}
 */
const GameState = {

    // updates the gameState according to the information it is getting from the message
    // in case 'trump' its getting this:
    // {
    //   type: 'BROADCAST_TRUMPF',
    //   data: { mode: 'TRUMPF', trumpfColor: 'HEARTS' }
    // }
    update: function update(type, message){

      switch(type) {
        case 'trump':

          // if it was not geschoben, then declare, that it is forehand trump
          // if it was geschoben, it was previously set to 0, so this does not do anything
          if(forehand === -1){
            forehand = 1;
          }
          if(message.mode === 'TRUMPF') {
            let color = JSON.parse(JSON.stringify(message.trumpfColor));
            //let color = message.trumpfColor;
            switch(color){
              case 'DIAMONDS':
                trump = 0;
                break;
              case 'HEARTS':
                trump  = 1;
                break;
              case 'SPADES':
                trump = 2;
                break;
              case 'CLUBS':
                trump = 3;
                break;
            }
          }
          if(message.mode === 'OBEABE') {
            trump  = 4;
          }
          if(message.mode === 'UNDEUFE') {
            trump  = 5;
          }
          break;

        case 'player':
          let tempPlayer = JSON.parse(JSON.stringify(message));
          currentPlayer = tempPlayer;

          //have to do a switch because different systems. Thomas plays 0=>3=>2=>1=>0 etc.
          if(tempPlayer === 1){
            currentPlayer = 3;
          } else if (tempPlayer === 3) {
           currentPlayer = 1;
         }
          break;

       case 'dealer':

         //find correct dealer (thomas system)
          let tempPlayer1 = JSON.parse(JSON.stringify(message));
          if(tempPlayer1 === 1){
            tempPlayer1 = 3;
          } else if (tempPlayer1 === 3) {
           tempPlayer1 = 1;
          }
          dealer = tempPlayer1 === 3 ? 0 : tempPlayer1+1;
          break;

       case 'schiebe':
          let tempPlayer2 = JSON.parse(JSON.stringify(message));
          currentPlayer = tempPlayer2;
          //have to do a switch because different systems. Thomas plays 0=>3=>2=>1=>0 etc.
          if(tempPlayer2 === 1){
            currentPlayer = 3;
          } else if (tempPlayer2 === 3) {
           currentPlayer = 1;
          }
          break;

       case 'invertSchiebe':

          let tempPlayer3 = JSON.parse(JSON.stringify(message));
          currentPlayer = (tempPlayer3 + 2) % 4;
          break;

       case 'geschoben':

          forehand = 0;
          break;

       case 'cardDistribute':

          for (let i = 0; i < 4; i++) {
            switch (i) {
              case 0:
                var tempArray0 = JSON.parse(JSON.stringify(message[0].cards));
                hand0 = handleCardToHands(tempArray0);
                break;
              case 1:
                var tempArray1 = JSON.parse(JSON.stringify(message[1].cards));
                hand3 = handleCardToHands(tempArray1);
                break;
              case 2:
                var tempArray2 = JSON.parse(JSON.stringify(message[2].cards));
                hand2 = handleCardToHands(tempArray2);
                break;
              case 3:
                var tempArray3 = JSON.parse(JSON.stringify(message[3].cards));
                hand1 = handleCardToHands(tempArray3);
                break;
              default:
                break;
            }
          }
       break;

       case 'first':

           let tempPlayer4 = JSON.parse(JSON.stringify(message));

           //have to do a switch because different systems. Thomas plays 0=>3=>2=>1=>0 etc.
           if(tempPlayer4 === 1){
             tempPlayer4 = 3;
           } else if (tempPlayer4 === 3) {
            tempPlayer4 = 1;
           }
           tricks.push({first: tempPlayer4});
          break;

       case 'win':

         //need to check if the order must be exactly as postman example. If not we can leave it like this.
          let temp = {};
          temp = tricks.pop();

          let tempPlayer5 = JSON.parse(JSON.stringify(message));

           //have to do a switch because different systems. Thomas plays 0=>3=>2=>1=>0 etc.
           if(tempPlayer5 === 1){
             tempPlayer5 = 3;
           } else if (tempPlayer5 === 3) {
            tempPlayer5 = 1;
           }

          Object.assign(temp, { win: tempPlayer5});

          let tempWin = temp.first;
          delete temp.first;
          temp.first = tempWin;

          tricks.push(temp);
          break;

       case 'addCards':
          //convert card to thomas style
          let tempCard = JSON.parse(JSON.stringify(message));
          let usableCard = cardTransition(tempCard);

          //find the trick it needs to be put in
          let whereToPutCard = helpFindFreeSlot();

          tricks[whereToPutCard].cards.push(usableCard);
          break;

        case 'reduceHand':

         let tempCard2 = JSON.parse(JSON.stringify(message));
         let cardToCut = cardTransition(tempCard2);

         //console.log(`CARD TO DELETE: ${cardToCut}`);
         //console.log(`WHOS HAND?: ${currentPlayer}`);

         //current player is already the next player => switch back to old player.
         let oldPlayer = currentPlayer -1 % 4;
         if(oldPlayer === -1){
           oldPlayer = 3;
         }
          for (let num = 0; num < 4; num++) {

             switch (num) {

               case 0:
                 hand0.find((value, index) => {
                   if (value === `${cardToCut}`) {
                     hand0.splice(index, 1);
                     //console.log(`DELETED CARD: ${cardToCut}`);
                   }
                 });
                 break;
               case 1:
                 hand1.find((value, index) => {
                   if (value === `${cardToCut}`) {
                     hand1.splice(index, 1);
                     //console.log(`DELETED CARD: ${cardToCut}`);
                   }
                 });
                 break;
               case 2:
                 hand2.find((value, index) => {
                   if (value === `${cardToCut}`) {
                     hand2.splice(index, 1);
                     //console.log(`DELETED CARD: ${cardToCut}`);
                   }
                 });
                 break;
               case 3:
                 hand3.find((value, index) => {
                   if (value === `${cardToCut}`) {
                     hand3.splice(index, 1);
                     //console.log(`DELETED CARD: ${cardToCut}`);
                   }
                 });
                 break;
               default:
                 break;
             }
         }

         break;

       case 'points':

          let tmp = tricks.pop();
          Object.assign(tmp, { points: message});

          let tempPoints = tmp.first;
          delete tmp.first;
          tmp.first = tempPoints;

          tricks.push(tmp);
          break;

       case 'playerInCycle':

          let tempPlayerInCycle = JSON.parse(JSON.stringify(message));
          currentPlayer = (tempPlayerInCycle+1) % 4;

          //have to do a switch because different systems. Thomas plays 0=>3=>2=>1=>0 etc.
          if(currentPlayer === 1){
             currentPlayer = 3;
          } else if (currentPlayer === 3) {
            currentPlayer = 1;
          }
          break;

       case 'reset':

          let tempRounds = JSON.parse(JSON.stringify(message));
          resetToDefault(tempRounds);
          break;

       default :
          break;

     }
},
	get getGameState(){
		return createExport();
    }
};
let version = 'V0.2';

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
// MAX_TRUMP   = 5
let trump = -1;

/*
Thomas BOT seatIds:
# Players (players are numbered clockwise), playing is done counterclockwise
# noinspection PyPep8
NORTH       = 0                         # type: int
EAST        = 1                         # type: int
SOUTH       = 2                         # type: int
WEST        = 3                         # type: int
MAX_PLAYER  = 3                         # type: int

UI iDs:
NORTH       = 2
EAST        = 1
SOUTH       = 0
WEST        = 3
MAX_PLAYER  = 3


=> often have to "alibi-switch" player 1 and 3
*/

let dealer = 1;
let currentPlayer = 0;
let forehand = -1;
let jassTyp = 'SCHIEBER';
let gameId = 0;
let tricks = [];
let hand0 = [];
let hand1 = [];
let hand2 = [];
let hand3 = [];

/**
 * This generates the JSON, that is used for the API calls.
 * @returns {{jassTyp: string, gameId: number, trump: number, currentPlayer: number, dealer: number, tricks: *[], playerView: number, version: string, forehand: number, player: [{hand: *[]},{hand: *[]},{hand: *[]},{hand: *[]}]}|{default: number}} the agent from thomas needs this format
 */
export function createExport(){

  //hand1 should be cards from OUR player 3 and hand3 should have cards from OUR player 1
  let myState = {};
  switch (currentPlayer) {
    case 0:
      myState = {
        'version': version,
        'trump': trump,
        'dealer': dealer,
        'currentPlayer': currentPlayer,
        'playerView': currentPlayer,
        'forehand': forehand,
        'tricks': tricks,
        'player': [
          {
            'hand': hand0
          },
          {
            'hand': []
          },
          {
            'hand': []
          },
          {
            'hand': []
          }
        ],
        'jassTyp': jassTyp,
        'gameId': gameId
      };
      break;
    case 1:
      myState = {
        'version': version,
        'trump': trump,
        'dealer': dealer,
        'currentPlayer': currentPlayer,
        'playerView': currentPlayer,
        'forehand': forehand,
        'tricks': tricks,
        'player': [
          {
            'hand': []
          },
          {
            'hand': hand1
          },
          {
            'hand': []
          },
          {
            'hand': []
          }
        ],
        'jassTyp': jassTyp,
        'gameId': gameId
      };
      break;
    case 2:
      myState = {
        'version': version,
        'trump': trump,
        'dealer': dealer,
        'currentPlayer': currentPlayer,
        'playerView': currentPlayer,
        'forehand': forehand,
        'tricks': tricks,
        'player': [
          {
            'hand': []
          },
          {
            'hand': []
          },
          {
            'hand': hand2
          },
          {
            'hand': []
          }
        ],
        'jassTyp': jassTyp,
        'gameId': gameId
      };
      break;
    case 3:
      myState = {
        'version': version,
        'trump': trump,
        'dealer': dealer,
        'currentPlayer': currentPlayer,
        'playerView': currentPlayer,
        'forehand': forehand,
        'tricks': tricks,
        'player': [
          {
            'hand': []
          },
          {
            'hand': []
          },
          {
            'hand': []
          },
          {
            'hand': hand3
          }
        ],
        'jassTyp': jassTyp,
        'gameId': gameId
      };
      break;
    default:
      myState = {'default': currentPlayer};
      break;

  }

  return myState;
}

/**
 * Swaps the hand into a hand, that can be used by the bot from thomas
 * @param {array} hand the hand in jass-server-ui format
 * @returns {*[]} the hand in API call usable format
 */
function handleCardToHands(hand = []){
  let finalHand = hand;
  for (let i = 0; i < finalHand.length; i++) {
      let card = finalHand[i];
      finalHand[i] = cardTransition(card);
  }
  return finalHand;
}

//translate the cards from our setup into the one from thomas.
/**
 * Translate the cards from our setup into the one from thomas
 * @param {json} card card to translate
 * @returns {string} translated card
 */
function cardTransition(card){
  var finalCard = '';

  let number = card.number;
  let color = card.color;

  switch(color){
    case 'DIAMONDS':
      finalCard += 'D';
      break;
    case 'HEARTS':
      finalCard += 'H';
      break;
    case 'SPADES':
      finalCard += 'S';
      break;
    case 'CLUBS':
      finalCard += 'C';
      break;
    default:
      break;
  }
  switch(number){
    case 14:
      finalCard += 'A';
      break;
    case 13:
      finalCard += 'K';
      break;
    case 12:
      finalCard += 'Q';
      break;
    case 11:
      finalCard += 'J';
      break;
    default:
      finalCard += `${number}`;
      break;
  }

  return finalCard;
}

/**
 * Finds out, where the next free slot in the tricks is.
 * @returns {number} this is the trick number, that a card needs to be put in
 */
function helpFindFreeSlot(){

  let cardArray = [];
  for (let i = 0; i < 9; i++) {

    //check if its the first card, then we have to create the card entry
    if (Object.keys(tricks[i]).length === 1) {
      let temp = tricks.pop();
      Object.assign(temp, {cards: cardArray});

      //reordering the tricks, so order is => cards,first
      let tmp = temp.first;
      delete temp.first;
      temp.first = tmp;

      tricks.push(temp);
    }

    if (tricks[i].cards.length !== 4) {
      return i;
    }
  }
}

/**
 * simply resets the gameState
 * @param {number} currentRounds if you want to have track about it but not really used
 */
function resetToDefault(currentRounds) {
  trump = -1;
  dealer = 1;
  currentPlayer = 0;
  forehand = -1;
  tricks = [];
  hand0 = [];
  hand1 = [];
  hand2 = [];
  hand3 = [];
}

/**
 * This creates the gameState and returns it
 * @returns {{update: GameState.update, readonly getGameState: {}}} gameState used for API calls
 */
export function create() {
  let gameState = Object.create(GameState);

  return gameState;
}
