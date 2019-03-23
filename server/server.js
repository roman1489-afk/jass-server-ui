import http from 'http';
import https from 'https';
import {Server as WebSocketServer} from 'ws';
import SessionHandler from './session/sessionHandler';
import {Logger} from './logger';

let server;

export function start(port, app) {
	if (port === 443)
		try {
			// Run These commands on the production server to generate the certificates
			// sudo certbot certonly --manual
			// or sudo certbot certonly --standalone -d jass.joeli.to
			// openssl dhparam -out /var/www/jass.joeli.to/sslcert/dh-strong.pem 2048

			Logger.info('Starting https server...');
			let fs = require('fs');
			const options = {
				key: fs.readFileSync('/etc/letsencrypt/live/jass.joeli.to/privkey.pem'),
				cert: fs.readFileSync('/etc/letsencrypt/live/jass.joeli.to/fullchain.pem'),
				//dhparam: fs.readFileSync('/var/www/jass.joeli.to/sslcert/dh-strong.pem')
			};

			let helmet = require('helmet');
			app.use(helmet());

			server = https.createServer(options, app);

			startRedirectServer();
		} catch (e) {
			Logger.info(e);
			Logger.info('There has been a problem starting the https server. Starting a normal http server now...');

			server = http.createServer(app);
		}
	else
		server = http.createServer(app);

	new WebSocketServer({server}).on('connection', (ws) => {
		SessionHandler.handleClientConnection(ws);
	});

	server.listen(port, () => {
		Logger.info(`Server listening on port: ${server.address().port}`);
	});

	process.on('SIGTERM', () => {
		console.info('SIGTERM signal received.');
		console.log('Shutting down Jass Server');
		SessionHandler.resetInstance();
		server.close();
		process.exit(0);
	});
}

export function stop() {
	SessionHandler.resetInstance();
	server.close();
}

/**
 * Starts a server which redirects the users to the https site
 * https://stackoverflow.com/questions/7450940/automatic-https-connection-redirect-with-node-js-express
 */
function startRedirectServer() {
	Logger.info('Starting redirect server...');
	// set up plain http server
	let redirectServer = http.createServer();

	// set up a route to redirect http to https
	redirectServer.get('*', function (req, res) {
		res.redirect('https://' + req.headers.host + req.url);

		// Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
		// res.redirect('https://example.com' + req.url);
	});
}