# Ponies
The Ponies Game as implemented by me, with direction from my father.

# What is the Ponies?
Ponies, or "Playing the Ponies" refers to a betting game in which players are assigned random outcomes to root for concerning a distinct game segement. For my implementation the game segment ("race") is an end of a curling match. The players ("jockeys") are randomly assigned the following outcomes (each a "pony") for the race:
    - Blank end
    - Take 1
    - Take 2
    - Take 3
    - Take 4+
    - Steal 1
    - Steal 2
    - Steal 3+

8 ponies are provided because it is assumed that there will be 8 jockeys. This number is derived from two curling teams of four players watching the subsequent match on the sheet of ice on which they played, while they enjoy a snack and conversation following their match. If fewer than 8 jockeys are at the table, the least likely outcomes, Take 4+ and Steal 3+, can be eliminated from the deck, replaced by Take 3+ and Steal 2+, respectively.

Each race is worth a single point per jockey - the winning jockey takes all the points (i.e., 8 points if there are 8 jockeys) and the losing jockeys are each docked a point. In my implementation, I will allow jockeys to select whether they want to play for points (a static value, tracked across different individual pony "races"), or for cash (a temporary variable, used only for tracking the outcome of that game; gentleman's matches or "off-the-books"). The difference between these is that with points, we will track a jockey's points in a backend database (WiP).

It is envisioned that Ponies can be used to entertain the participants in a curling tournament or "bonspiel" while they are off the ice before or after their matches. A leaderboard can be created to show the most successful jockey's and a prizes can be awarded by the bonspiel organizers to add to the air of excitement at the bonspiel.

To run the program, please use 'npm start'. This will initiate in dev mode. As far as production is concerned, I am going to implement the prod scritp at a later date.
