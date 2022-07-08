import React from 'react';
import JassActions from '../jassActions';

export default ({ showPoints, teams}) => (
    <div id="points"
         className={(showPoints) ? 'shown' : ''}
         onClick={() => JassActions.toggleShowPoints()}
    >
        {teams.map((team) => {

            return (
                <div key={team.name} className="points-team">
                    {team.winner && <img className="points-trophy" src="/images/trophy.svg" />}
                    <h2 className="rounds">
                        {(team.name === 'Team 1') ? 'Rounds:' : '' }
                        {(team.name === 'Team 1') ? ` ${teams[0].myRound}/24` : ''}
                    </h2>
                    <h3>
                        {team.name}
                        {showPoints && <small> ({team.players[0].name} & {team.players[1].name})</small>}
                    </h3>
                    <div className="current-round-points">
                        {(showPoints) ? 'Current Round: ' : ''}{team.currentRoundPoints}
                    </div>
                    <div className="total-points">
                        {(showPoints) ? 'Total: ' : ''}{team.points}
                    </div>
                </div>
            );
        })}
    </div>
);