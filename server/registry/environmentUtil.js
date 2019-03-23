const EnvironmentUtil = {
	getMaxPoints() {
		return Number(process.env.MAX_POINTS) || 2500;
	},

	getDeckShuffleSeed() {
		return Number(process.env.DECK_SHUFFLE_SEED) || 0; // 0 for totally random shuffling, any positive (!) number for the same sequence of hands (only in the tournament mode!)
	},

	getClientRequestTimeoutInMillis() {
		return Number(process.env.CLIENT_REQUEST_TIMEOUT_IN_MILLIS) || 15000; // normal: 500, high so that failures happen less often due to players exceeding request timeout
	},

	getTournamentLogging() {
		return Boolean(process.env.TOURNAMENT_LOGGING) || true;
	},

	getTournamentCounting() {
		return Boolean(process.env.TOURNAMENT_COUNTING) || true;
	},

	getTournamentRounds() {
		return Number(process.env.TOURNAMENT_ROUNDS) || 1;
	},

	getTournamentLoggingDir() {
		return String(process.env.TOURNAMENT_LOGGING_DIR) || 'experiments';
	},

	getPort() {
		return Number(process.env.PORT) || 3000;
	},

	getDebug() {
		return Boolean(process.env.DEBUG) || false;
	},

	getPublicServerAddress() {
		return String(process.env.PUBLIC_SERVER_ADDRESS) || 'ws://localhost:3000';
	},

	getRegistryAddress() {
		return String(process.env.REGISTRY_URL) || 'http://localhost:3001/api';
	}
};


export default EnvironmentUtil;