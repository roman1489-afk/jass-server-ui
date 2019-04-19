import {getCardTitleString} from '../deck/cardColor';

export const GameMode = {
	TRUMPF: 'TRUMPF',
	OBEABE: 'OBEABE',
	UNDEUFE: 'UNDEUFE',
	SCHIEBE: 'SCHIEBE'
};

export function getTrumpfTitleString(mode, color) {
	switch (mode) {
		case GameMode.TRUMPF:
			return getCardTitleString(color);
		case GameMode.OBEABE:
			return 'Top-Down/Obe-Abe';
		case GameMode.UNDEUFE:
			return 'Bottom-Up/Unde-Ufe';
		case GameMode.SCHIEBE:
			return 'Shifted/Geschoben';
	}
}

export function getTrumpfImagePath(cardType, mode, color) {
	let basePath = '/images/trumpf/';
	switch (mode) {
		case GameMode.TRUMPF:
			return basePath + cardType + '/' + color.toLowerCase() + '.png';
		case GameMode.OBEABE:
			return basePath + 'obeabe.png';
		case GameMode.UNDEUFE:
			return basePath + 'undeufe.png';
		case GameMode.SCHIEBE:
			return basePath + 'schiebe.png';
	}
}
