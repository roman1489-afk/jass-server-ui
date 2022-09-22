import React from 'react';
import JassActions from '../jassActions';

export default (props) => {
	let suggestionEnabled = props.suggestionEnabled;
	return (
		<div id="suggestionEngineToggler">
			<img src={'/images/IPT.png'} className={suggestionEnabled ? '' : 'disabled'}
				 //onClick={() => JassActions.toggleSuggestionEngine(!suggestionEnabled)}
				 alt={'Gesponsert von IPT'} title={'Gesponsert von IPT'}
			/>
		</div>
	);
};
