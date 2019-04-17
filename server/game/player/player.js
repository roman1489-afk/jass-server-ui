import {GameMode} from '../../../shared/game/gameMode';


const Player = {

		dealCards(cards) {
			this.cards = cards;
			if (this.isHuman && this.advisor)
				this.advisor.dealCards(cards);
			return this.clientApi.dealCards(cards);
		},

		rejectCard(card, cardsOnTable) {
			if (this.isHuman && this.advisor)
				this.advisor.rejectCard(card, cardsOnTable);
			return this.clientApi.rejectCard(card, cardsOnTable);
		},

		requestCard(cardsOnTable) {
			if (this.isHuman && this.advisor)
				this.advisor.requestCard(cardsOnTable).then(card => this.clientApi.suggestCard(card));
			return this.clientApi.requestCard(cardsOnTable);
		},

		requestTrumpf(isGeschoben) {
			if (this.isHuman && this.advisor)
				this.advisor.requestTrumpf(isGeschoben).then(trumpf => this.clientApi.suggestTrumpf(trumpf));
			return this.clientApi.requestTrumpf(isGeschoben);
		},

		rejectTrumpf(gameType) {
			if (this.isHuman && this.advisor)
				this.advisor.rejectTrumpf(gameType);
			return this.clientApi.rejectTrumpf(gameType);
		}
		,

		removeCard(cardToRemove) {
			this.cards = this.cards.filter((card) => {
				return !card.equals(cardToRemove);
			});
		}
	}
;

export function create(team, name, id, seatId, isHuman, clientApi) {
	let player = Object.create(Player);
	player.id = id;
	player.seatId = seatId;
	player.name = name;
	player.team = team;
	player.isHuman = isHuman;
	player.clientApi = clientApi;
	return player;
}
