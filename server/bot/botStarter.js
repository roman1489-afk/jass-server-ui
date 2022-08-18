import {create as createJassBot} from '../../bot/JassBot';
import nameGenerator from 'docker-namesgenerator';
import EnvironmentUtil from '../registry/environmentUtil';

export function startRandomBot({sessionName, chosenTeamIndex}) {
	console.log('Starting Random Bot...');
	createJassBot(nameGenerator(), composeUrl(), sessionName, chosenTeamIndex);
}

/*
export function startJassTheRipperBot({sessionName, chosenTeamIndex, advisedPlayerName: advisedPlayerName = null}) {
	let botName = 'JassTheRipper';
	if (advisedPlayerName)
		botName = advisedPlayerName + '-Advisor';

	console.log('Starting JassTheRipper Bot...');

	const {exec} = require('child_process');
	let botProcess = exec(`cd ../JassTheRipper && ./gradlew run -Pmyargs=${composeUrl()},${sessionName},${chosenTeamIndex},${advisedPlayerName},${botName} --no-daemon`);

	botProcess.stdout.on('data', function (data) {
		console.log(data);
	});

	botProcess.stderr.on('data', function (data) {
		console.log('stderr: ' + data.toString());
	});

	botProcess.on('exit', function () {
		console.log('JassTheRipper left the game.');
	});
}*/


// working to start game with random bots, for simplification under the function name JassTheRipperBot. BUT it is random!
export function startJassTheRipperBot({sessionName, chosenTeamIndex}) {
	console.log('Starting Random Bot...');
	//console.log(sessionName);
	//console.log(chosenTeamIndex);
	//console.log(composeUrl());
	//let botUrl = 'http://jass-agent.abiz.ch/tiresias';
	let botName = 'RandomBot';
	createJassBot(botName, composeUrl(), sessionName, chosenTeamIndex);
}

/*
export function startJassTheRipperBot({sessionName, chosenTeamIndex, advisedPlayerName: advisedPlayerName = null}) {
	let botName = 'AbizBotReal';
	if (advisedPlayerName)
		botName = advisedPlayerName + '-Advisor';

	console.log('Starting Abiz BotReal...');

	const {exec} = require('child_process');
	const url = 'http://jass-agent.abiz.ch/tiresias';
	let botProcess = exec(`start microsoft-edge:${url}`);

	botProcess.stdout.on('data', function (data) {
		console.log(data);
	});

	botProcess.stderr.on('data', function (data) {
		console.log('stderr: ' + data.toString());
	});

	botProcess.on('exit', function () {
		console.log('AbizBotReal left the game.');
	});
}
*/

function composeUrl() {
	let protocol = EnvironmentUtil.getPort() === 443 ? 'wss' : 'ws';
	return `${protocol}://localhost:${EnvironmentUtil.getPort()}`;
}
