import React from 'react';
import JassActions from '../jassActions';

export default (props) => {

    let sessions = props.sessions || [];

	let classes = 'session-choice';
	if (!sessions.length) {
		classes += ' hidden';
	}

    return (
        <div className={classes}>
			<h2>Join an existing session</h2>
            <ul>
                {sessions.map((session) => {
                    return (
                        <li key={session}>
                            <div onClick={() => JassActions.joinExistingSession(session)}>{session}</div>
                            <div onClick={() => JassActions.joinExistingSessionAsSpectator(session)}>as spectator</div>
                        </li>);
                })}
            </ul>
        </div>
    );
};
