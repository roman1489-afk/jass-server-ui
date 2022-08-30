import {create as createJassBot} from '../../bot/JassBot';
import nameGenerator from 'docker-namesgenerator';
import EnvironmentUtil from '../registry/environmentUtil';

export function startRandomBot({sessionName, chosenTeamIndex}) {
	console.log('Starting Random Bot...');
	createJassBot(nameGenerator(), composeUrl(), sessionName, chosenTeamIndex);
}

// working to start game with random bots, for simplification under the function name JassTheRipperBot. BUT it is random!
export function startJassTheRipperBot({sessionName, chosenTeamIndex}) {
	console.log('Starting Random Bot...');
	let botName = 'RandomBot';
	createJassBot(botName, composeUrl(), sessionName, chosenTeamIndex);
}

function composeUrl() {
	let protocol = EnvironmentUtil.getPort() === 443 ? 'wss' : 'ws';
	return `${protocol}://localhost:${EnvironmentUtil.getPort()}`;
}
