# Roll Dice

## General 

- N-players roll a 6 faced dice in Round robin fashion
- Shake the phone to roll the dice. Their points increase by the number (1 to 6) achieved by the roll.
- As soon as the player accumulates M points the game complets for that users and a rank is assigned. Remaining players continue to play until they accumulate M points. Game ends when all players have collected M points

## Rules

* The order in which users roll the dice is randomly decided at the start of the game.
* If a player roles the value '6' then they get another chance to roll the dice again.
* If a player roles the value '1' two consecutive times, they have to skip their next turn as a penalty.
* A player stops playing the game when atleast M points are scored.

## Implementation Details:

* App asks for M (points to acculate) and N (the number of players)
* Name players as Player-1 to Player-N and randomly assign the order in which they will roll the dice. Display this order before the start of the game.
* When its Player-X's turn, prompt a message saying: "It's Player-X's turn now".
* Randomly simulate a dice roll upon shake, display the points achieved and add to the user's score.
* Display the current rank table to show the points of all users and their rank after each roll, before next player's turn.
* Show appropriate message on screen if the user gets another chance or is penalized.
* If a user completes the game, display an appropriate message on screen with their rank and continue game with the remaining users.