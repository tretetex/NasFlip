# Nebulas Coin Flip

The application allows you to play in coin toss. You can choose the side of the coin, specify the bet size and toss the coin several times. The game results of your wallet will be saved and will be available for viewing.

![profile](https://github.com/tretetex/NasFlip/blob/master/img/game%20panel.png?raw=true)

## Smart Contract

- `getGamesCount()` 
Returns count of all games.

- `getUser(wallet)` 
Returns user info.

- `getUserGames(wallet)`
Returns user games.

- `getLastTenGames()` 
Returns last 10 games of all games.

- `playGame(rnd, flipsCount, coinSide, date)`
Plays and saves new games.
