import React from 'react';
import JassActions from '../jassActions';

export default (props) => {
	let suggestionEnabled = props.suggestionEnabled;
	return (
		<div id="suggestionEngineToggler">
			<img src={'/images/recommended.png'} className={suggestionEnabled ? '' : 'disabled'}
				 onClick={() => JassActions.toggleSuggestionEngine(!suggestionEnabled)}
				 alt={'Toggle Suggestion Engine'} title={'Toggle Suggestion Engine'}
			/>
		</div>
	);
};
