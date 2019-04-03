import React from 'react';
import ExistingSessions from './existingSessions.jsx';
import {GameSetupState} from './gameSetupStore';
import JassActions from '../jassActions';
import {SessionType} from '../../../shared/session/sessionType';

function createNewSession(sessionType, asSpectator, event) {
    let inputElement = event.target,
        sessionName = inputElement.value;

    if (event.charCode === 13 && sessionName.trim()) {
        inputElement.disabled = true;
        JassActions.createNewSession(sessionType, sessionName, asSpectator);
    }
}

export default (props) => {

    let status = props.setupState.status;

    return (
        <div id="chooseSession" className={(status !== GameSetupState.CHOOSE_SESSION ? 'hidden' : '')}>
            <h1 className="jumbotron">Choose Session</h1>
            <ExistingSessions sessions={props.setupState.sessions}/>
            <div className="session-choice">
                <h2>Start a fresh single game</h2>
                <input type="text" name="createNewSession" placeholder="Single Game Name..."
                       onKeyPress={(event) => createNewSession(SessionType.SINGLE_GAME, false, event)}
                />
				<p>Press enter to continue...</p>
            </div>
            <div className="session-choice">
				<h2>Start a fresh tournament</h2>
                <input type="text" name="createNewTournament" placeholder="Tournament Name..."
                       onKeyPress={(event) => createNewSession(SessionType.TOURNAMENT, true, event)}
                />
				<p>Press enter to continue...</p>
            </div>
            <div className="session-choice">
                <button type="button" name="autoJoin" onClick={JassActions.autojoinSession}>Just Join!</button>
				<p>Join an existing single game or tournament or create a new one if none is running</p>
            </div>
        </div>
    );
};
