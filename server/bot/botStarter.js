import {create as createJassBot} from '../../bot/JassBot';
import nameGenerator from 'docker-namesgenerator';
import EnvironmentUtil from '../registry/environmentUtil';

export function startRandomBot({sessionName, chosenTeamIndex}) {
	console.log('Starting Random Bot...');
	createJassBot(nameGenerator(), composeUrl(), sessionName, chosenTeamIndex);
}

export function startJassTheRipperBot({sessionName, chosenTeamIndex, advisedPlayer = null}) {
	console.log('Starting JassTheRipper Bot...');

	const {exec} = require('child_process');
	let botProcess = exec(`cd ../JassTheRipper && ./gradlew run -Pmyargs=${composeUrl()},${sessionName},${chosenTeamIndex},${advisedPlayer} --no-daemon`);

	botProcess.stdout.on('data', function (data) {
		console.log(data);
	});

	botProcess.stderr.on('data', function (data) {
		console.log('stderr: ' + data.toString());
	});

	botProcess.on('exit', function () {
		console.log('JassTheRipper left the game.');
	});
}

function composeUrl() {
	let protocol = EnvironmentUtil.getPort() === 443 ? 'wss' : 'ws';
	return `${protocol}://localhost:${EnvironmentUtil.getPort()}`;
}