# Ponies
The Ponies Game as implemented by me, with direction from my father.

# What is the Ponies?
Ponies, or "Playing the Ponies" refers to a betting game in which players are assigned random outcomes to root for concerning a sport (in this case, curling). For my implementation, players can have the following outcomes as their "pony":
    - Blank end
    - Take 1
    - Take 2
    - Take 3
    - Take 4+
    - Steal 1
    - Steal 2
    - Steal 3+

We have 8 total outcomes to represent the 8 total players sitting a table behind the glass. That is, 8 players are in a match of curling, and as is custom, the 8 players sit together before and after their match.
Players will then ante in with an agreed upon amount of money. In my implementation, I will allow players to select whether they want to play for points (a static value, tracked across different individual pony "races"), or for cash (a temporary variable, used only for tracking the outcome of that game; gentleman's matches or "off-the-books"). The difference between these is that with points, we will track a player's points in a backend database (WiP). 

To run the program, please use 'npm start'. This will initiate in dev mode. As far as production is concerned, I am going to implement the prod scritp at a later date.
