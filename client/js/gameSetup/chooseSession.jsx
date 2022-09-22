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
            <h1 className="jumbotron">Wähle ein Spiel aus</h1>
            <ExistingSessions sessions={props.setupState.sessions}/>
            <div className="session-choice">
                <h2>Starte ein neues Spiel</h2>
                <input type="text" name="createNewSession" placeholder="Name des Spiels..."
                       onKeyPress={(event) => createNewSession(SessionType.SINGLE_GAME, false, event)}
                />
				<p>Drücke Enter um fortzufahren</p>
            </div>
            <div className="session-choice">
				<h2>Starte ein neues Turnier</h2>
                <input type="text" name="createNewTournament" placeholder="Name des Turniers..."
                       onKeyPress={(event) => createNewSession(SessionType.TOURNAMENT, true, event)}
                />
				<p>Drücke Enter um fortzufahren</p>
            </div>
            <div className="session-choice">
                <button type="button" name="autoJoin" onClick={JassActions.autojoinSession}>Beitreten!</button>
				<p>Tritt einem existierenden Spiel bei oder erstelle ein neues Spiel.</p>
            </div>
        </div>
    );
};
