const EnvironmentUtil = {
	getMaxPoints() {
		return Number(process.env.MAX_POINTS) || 2500;
	},

	getDeckShuffleSeed() {
		return Number(process.env.DECK_SHUFFLE_SEED) || 42;
	},

	getClientRequestTimeoutInMillis() {
		return Number(process.env.CLIENT_REQUEST_TIMEOUT_IN_MILLIS) || 5000; // normal: 500, high so that failures happen less often due to players exceeding request timeout
	},

	getTournamentLogging() {
		return Boolean(process.env.TOURNAMENT_LOGGING) || true;
	},

	getTournamentLoggingDir() {
		return process.env.TOURNAMENT_LOGGING_DIR || 'experiments';
	},

	getPort() {
		return Number(process.env.PORT) || 3000;
	},

	getPublicServerAddress() {
		return process.env.PUBLIC_SERVER_ADDRESS || 'ws://localhost:3000';
	},

	getRegistryAddress() {
		return process.env.REGISTRY_URL || 'http://localhost:3001/api';
	}
};


export default EnvironmentUtil;