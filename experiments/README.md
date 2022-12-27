# Human vs AI experiments JSON documentation

### Data

In the course of the work, there were two series of experiments. All experiments were logged in JSON files. This enables us to
analyse the points scored based on this data. There were two series of experiments. The first round of experiments had all the participating teams play
with the same cards. The first round included many in-person experiments, including all the experiments from the Jass Challenge Event.
In all experiments the concept of double rounds was used.
The data set includes 12 teams, which played 16 rounds each. This
results in 192 rounds. In the second round, the cards were randomised, and the majority of
experiments were done remotely. In all experiments the concept of
double rounds was used.
The data set includes 13 teams, which played 16 rounds each. This
results in 208 rounds.

JSON documents starting with a 1 belong to the first experimental round.
JSON documents starting with a 2 belong to the second experimental round.
The documents contain the two names of the human participants and most of then have a timestamp (time at start of the game).

### What we find in a specific file

If we view a JSON file we can see all the broadcasted messages from the server communication.
We can inspect certain interesting broadcasts.
In the first broadcast for example we can see the names of the players, seatIds and team constalations. 

There are for each of the 16 rounds a bunch of messages, that are not very interesting beacause there are a huge amount of data without meaning or dublicates.
To find interesting data one can search the file for the `BROADCAST_GAME_FINISHED` messages. There are exactly 16 of them in each JSON file. One can see how much points
the teams have scored in the particular round but also the current overall points.
In order to find a JSON with the full documentation of one round, we can go from this message and scroll up by two JSON objects and we find a big `BROADCAST_GAMESTATE` message with all information about the round.
If one is interested in the starting hands and trump selection of a round, it is suggested to start from the `REQUEST_TRUMPF` messages. We can find the trump selection and starting hand in the surrounding 2-5 JSON objects.

Underneath is a example gamestate. We can read the entities as follows:
- "broadcast", "messageType" are not from interest.
- "data":{} contains all the information about a round.
	- "version" is not from interest.
	- "trump" see: DIAMONDS = 0 # Ecken / Schellen
				D = DIAMONDS
				HEARTS = 1 # Herz / Rosen
				H = HEARTS
				SPADES = 2 # Schaufeln / Schilten
				S = SPADES
				CLUBS = 3 # Kreuz / Eichel
				C = CLUBS
				OBE_ABE = 4 # Top-Down
				O = OBE_ABE
				UNE_UFE = 5 # Bottom-Up
				U = UNE_UFE
	- "dealer"	is the player, dealing the cards. Leftside of the starting player.
	- "currentPlayer" is the player, that has to make a move next.
	- "playerView" is not from interest.
	- "forehand" value 0 states geschoben, value 1 states not geschoben.
	- "tricks": [] there are 9 tricks in one round where four cards are played.
		- "cards": A = Ace/Ass
				   K = King/Koenig
				   Q = Queen/Dame
				   J = Jack/Bauer
		- "points" are the scored points in this trick.
		- "win" is the seatId of the player, that has won the trick.
		- "first" is the seatId of the player, that layed out the first card in this trick.
	- "player":	[] contains all the four players in the game. starting from player 0 then 1,2,3.
		- "hand" contains the current hand cards of a player.
	- "jassTyp" is not from interest.
	- "gameId" is not from interest.
	
```
  {
    "broadcast": true,
    "messageType": "BROADCAST_GAMESTATE",
    "data": {
      "version": "V0.2",
      "trump": 1,
      "dealer": 1,
      "currentPlayer": 3,
      "playerView": 3,
      "forehand": 0,
      "tricks": [
        {
          "cards": [
            "HJ",
            "D7",
            "H10",
            "H6"
          ],
          "points": 30,
          "win": 0,
          "first": 0
        },
        {
          "cards": [
            "D10"
          ],
          "first": 0
        }
      ],
      "player": [
        {
          "hand": []
        },
        {
          "hand": []
        },
        {
          "hand": []
        },
        {
          "hand": [
            "SQ",
            "S9",
            "S6",
            "DA",
            "D8",
            "CJ",
            "C8",
            "CK"
          ]
        }
      ],
      "jassTyp": "SCHIEBER",
      "gameId": 0
    }
  }
```

If there are any followup questions feel free to contact me: `martinezz99999@gmail.com`