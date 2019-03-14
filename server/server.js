import http from 'http';
import https from 'https';
import {Server as WebSocketServer} from 'ws';
import SessionHandler from './session/sessionHandler';
import {Logger} from './logger';

let server;

export function start(port, app) {

	try {
		// Run These commands on the production server to generate the certificates
		// sudo certbot certonly --webroot -w /var/www/jass.joeli.to/ -d www.jass.joeli.to -d jass.joeli.to
		// openssl dhparam -out /var/www/jass.joeli.to/sslcert/dh-strong.pem 2048

		Logger.info('Trying to start https server');
		let fs = require('fs');
		const options = {
			key: fs.readFileSync('/srv/www/keys/my-site-key.pem'),
			cert: fs.readFileSync('/srv/www/keys/chain.pem'),
			dhparam: fs.readFileSync('/var/www/jass.joeli.to/sslcert/dh-strong.pem')
		};

		let helmet = require('helmet');
		app.use(helmet());

		server = https.createServer(options, app);
	} catch (e) {
		Logger.info(e);
		Logger.info('There has been a problem starting the https server. Starting a normal http server now...');

		server = http.createServer(app);
	}


    new WebSocketServer({server}).on('connection', (ws) => {
        SessionHandler.handleClientConnection(ws);
    });

    server.listen(port, () => {
        Logger.info(`Server listening on port: ${server.address().port}`);
    });
}

export function stop() {
    SessionHandler.resetInstance();
    server.close();
}