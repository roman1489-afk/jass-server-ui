# Human vs AI experiments

### Installation

Installing node.js: 

See http://nodejs.org/download/

Install node modules:
```sh
$ npm install
```

Start the server:
```sh
$ npm start
```

You can now reach the server via: `localhost:3000` port.

### Setup

To set up the two players on individual devices, you can connect 
to the same server via: `yourDeviceName:3000` port. 

The rounds played aswell as the cards distributed are manually configured.
To configure rounds played see `singleGameSession.js` at line 264
(here it is set to 2 rounds.) :
```
if (pointsTeamA > pointsTeamB && (game.deck.getRounds === 2)) {
	return this.teams[0];
}

if (pointsTeamB > pointsTeamA && (game.deck.getRounds === 2)) {
	return this.teams[1];
}
```


To configure cards distributed see `deck.js` at line 38:
```
switch (rounds){
	case 1:
	// all "Kreuz"
		deck.cards[1] = [deck.cards[4], deck.cards[4]=deck.cards[1]][0];
		deck.cards[2] = [deck.cards[8], deck.cards[8]=deck.cards[2]][0];
		deck.cards[3] = [deck.cards[12], deck.cards[12]=deck.cards[3]][0];
		deck.cards[4] = [deck.cards[16], deck.cards[16]=deck.cards[4]][0];
		deck.cards[5] = [deck.cards[20], deck.cards[20]=deck.cards[5]][0];
		deck.cards[6] = [deck.cards[24], deck.cards[24]=deck.cards[6]][0];
		deck.cards[7] = [deck.cards[28], deck.cards[28]=deck.cards[7]][0];
		deck.cards[8] = [deck.cards[32], deck.cards[32]=deck.cards[8]][0];
		break;
```
**Note:** _You can expand the rounds by expanding the switch-statement. To see what numbers are assigned
to which cards, there is a `console.log` at line 95. Cards 0-8 are distributed to
the first player, then 9-17,18-26 and 27-35._


### Outcome

Once a game is finished you will find a JSON-formatted file in 
the `Experiments` folder.
Naming convention: 
- *First player of Team 1* **vs** *First player of Team 2* **_** *Date* **-** *Time* **.json**
- Example: roman vs bello_2022-07-01-15-17.json

*Note, that you might want to convert the JSON to be more readable. For example
by using: https://onlinejsontools.com/prettify-json*