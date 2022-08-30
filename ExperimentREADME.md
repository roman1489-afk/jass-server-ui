# Human vs AI experiments

### Installation

Installing node.js: 

See http://nodejs.org/download/

Install node modules:
```sh
$ npm install
```


### Setup

The rounds played as well as the cards distributed are manually configured.
Note, that 16 rounds is the intended amount, each player can choose trump 4 times.
To configure rounds played see `./server/session/singleGameSession.js` at line 269 and following
(here it is set to 16 rounds.) :
```
if (pointsTeamA > pointsTeamB && (game.deck.getRounds === 16)) {
	return this.teams[0];
}

if (pointsTeamB > pointsTeamA && (game.deck.getRounds === 16)) {
	return this.teams[1];
}
```

There are 4 different set of defined cards to play with. If you want wo switch see:
`./server/game/deck` at line 30:  `let gameNumber = 1;`


To configure cards distributed see `./server/game/deck` at line 65 and following:

**Note:** To see what numbers are assigned to which cards, there is a `console.log` at line 356. Cards 0-8 are distributed to
the first player, then 9-17,18-26 and 27-35.


### Staring a Game

Start the server:
```sh
$ npm start
```

You can now reach the server via: `localhost:3000` port.

To set up two or more players on individual devices, you can connect
to the same server via: *yourDeviceName*`:3000` port.

Once you have all Human players connected you can add Bots by clicking on the white *add bot* button.
If all seats are occupied, the 16 round game starts. After the 16 rounds the game declares the team with more points as *winner*.


### Outcome

Once a game is finished you will find a JSON-formatted file in 
the `Experiments` folder.
Naming convention: 
- *First player of Team 1* **vs** *First player of Team 2* **_** *Date* **-** *Time* **.json**
- Example: roman vs bello_2022-07-01-15-17.json

*Note, that you might want to convert the JSON to be more readable. For example
by using: https://onlinejsontools.com/prettify-json*
