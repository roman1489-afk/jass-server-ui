import {create as createJassBot} from '../../bot/JassBot';
import nameGenerator from 'docker-namesgenerator';

export function startRandomBot({url, sessionName, chosenTeamIndex}) {
	createJassBot(nameGenerator(), url, sessionName, chosenTeamIndex);
}

export function startJassTheRipperBot({url, sessionName, chosenTeamIndex}) {
	console.log('Starting Bot...');

	const {exec} = require('child_process');
	let botProcess = exec('cd ../JassTheRipper && ./gradlew run -Pmyargs=ws://127.0.0.1 --no-daemon');


	botProcess.stdout.on('data', function (data) {
		console.log(data);
	});

	botProcess.stderr.on('data', function (data) {
		console.log('stderr: ' + data.toString());
	});

	botProcess.on('exit', function (code) {
		console.log('child process exited with code ' + code.toString());
	});
}