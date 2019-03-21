import {create as createJassBot} from '../../bot/JassBot';
import nameGenerator from 'docker-namesgenerator';

export function startRandomBot({url, sessionName, chosenTeamIndex}) {
	console.log('Starting Random Bot...');
	createJassBot(nameGenerator(), url, sessionName, chosenTeamIndex);
}

export function startJassTheRipperBot({url, sessionName, chosenTeamIndex}) {
	console.log('Starting JassTheRipper Bot...');

	const {exec} = require('child_process');
	let botProcess = exec(`cd ../JassTheRipper && ./gradlew run -Pmyargs=${url},${chosenTeamIndex} --no-daemon`);

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