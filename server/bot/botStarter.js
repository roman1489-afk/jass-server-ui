import {create as createJassBot} from '../../bot/JassBot';
import nameGenerator from 'docker-namesgenerator';

export function startRandomBot({url, sessionName, chosenTeamIndex}) {
	createJassBot(nameGenerator(), url, sessionName, chosenTeamIndex);
}

export function startJassTheRipperBot({url, sessionName, chosenTeamIndex}) {
	console.log('Bot started');
	const { exec } = require('child_process');

	exec('cd ../JassTheRipper && ./gradlew run -Pmyargs=ws://127.0.0.1 --no-daemon', (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
}