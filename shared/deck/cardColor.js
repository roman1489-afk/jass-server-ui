export const CardColor = {
	HEARTS: 'HEARTS',
	DIAMONDS: 'DIAMONDS',
	CLUBS: 'CLUBS',
	SPADES: 'SPADES'
};

export function getCardTitleString(color) {
	switch (color) {
		case CardColor.HEARTS:
			return 'Hearts/Rose';
		case CardColor.DIAMONDS:
			return 'Diamonds/Eichle';
		case CardColor.CLUBS:
			return 'Clubs/Schelle';
		case CardColor.SPADES:
			return 'Spades/Schilte';
	}
}