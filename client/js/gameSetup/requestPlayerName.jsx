import React from 'react';
import JassActions from '../jassActions';
import {GameSetupState} from './gameSetupStore';

function choosePlayerName(event) {
    let inputElement = event.target,
        playerName = inputElement.value;

    if (event.charCode === 13 && playerName.trim()) {
        inputElement.disabled = true;
        JassActions.choosePlayerName(playerName);
    }
}

export default (props) => {
    return (
        <div id="requestPlayerName" className={(props.setupState === GameSetupState.SET_PLAYER_NAME ? '' : 'hidden')}>
			<h1 className="jumbotron">Welcome to the Jass Server</h1>
            <input type="text" placeholder="Player Name..." onKeyPress={choosePlayerName}/>
            <p>Press enter to continue...</p>
        </div>
    );
};
