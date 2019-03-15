/*eslint no-console: 0*/
import chalk from 'chalk';
import EnvironmentUtil from './registry/environmentUtil';

const debug = Boolean(EnvironmentUtil.getDebug());

export const Logger = {
    debug (messageToLog) {
        if (debug){
            console.log(chalk.cyan(messageToLog));
        }
    },

    error (messageToLog) {
        console.error(chalk.red(messageToLog));
    },

    info (messageToLog) {
        console.info(messageToLog);
    }
};