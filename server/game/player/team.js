import * as Deck from './../deck/deck';

export function create(name) {
    return {
        name,
        points: 0,
        currentRoundPoints: 0,
        myRound: 0
    };
}