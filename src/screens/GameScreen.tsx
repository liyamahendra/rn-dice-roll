import * as React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

import RNShake from 'react-native-shake';

import Utils from '../core/Utils';
import Store from '../core/Store';
import Player from '../core/Player';
import Images from "../assets/images";

const GameScreen = ({ navigation, route }) => {
  const DICE_ROLL_DURATION = 5000;
  const DICE_ROLL_ANIMATION_DURATION = 500;

  const [message, setMessage] = React.useState("");
  const [result, setResult] = React.useState("");
  const [diceImage, setDiceImage] = React.useState(require("../assets/images/1.png"));

  React.useEffect(() => {
    if (Store.currentGame.isGameOver()) {
      setMessage("Game Over!");
      setResult("");
    } else {
      if (Store.currentGame.getPlayer() != null && Store.currentGame.getPlayer() != undefined) {
        setMessage(`It is ${Store.currentGame.getPlayer().getPlayerName()}'s now turn to roll the dice.`)
      }
    }
  });

  const simulateDiceRoll = () => {
    let duration = 0;

    const interval = setInterval(function () {
      let dice = Utils.getRandomValue(6);

      let diceName = "";
      switch (dice) {
        case 1:
          diceName = Images.one;
          break;
        case 2:
          diceName = Images.two;
          break;
        case 3:
          diceName = Images.three;
          break;
        case 4:
          diceName = Images.four;
          break;
        case 5:
          diceName = Images.five;
          break;
        case 6:
          diceName = Images.six;
          break;
      }
      setDiceImage(diceName)

      duration += DICE_ROLL_ANIMATION_DURATION;
      if (duration == DICE_ROLL_DURATION) {
        clearInterval(interval);
        diceRolled(dice);
      }
    }, 500);

  }

  const diceRolled = async (dice: number) => {
    let result = "";
    let rankOnCompletion = (Store.currentGame.getAllPlayersSequence().length - Store.currentGame.getCurrentlyPlayingPlayersSequence().length) + 1;

    let currentPlayer = Store.currentGame.getPlayer();
    Store.currentGame.getPlayer().addScore(dice, rankOnCompletion);

    if (Store.currentGame.isGameOver()) {
      setMessage("Game Over!");
      setResult("");
    } else {
      switch (dice) {
        case 6:
          result = `${currentPlayer.getPlayerName()} scored ${dice}.`;
          if (currentPlayer.isGameComplete()) {
            result += ` Your game is complete.`;
          } else {
            result += ` You get to roll the dice again.`;
          }
          break;
        default:
          result = `${currentPlayer.getPlayerName()} scored ${dice}.`;
          if (currentPlayer.isGameComplete()) {
            result += ` Your game is complete.`;
          }
          break;
      }

      if (!Store.currentGame.isGameOver() && (!currentPlayer.isGameComplete() && dice != 6)) {
        Store.currentGame.moveToNextPlayer();
      }

      if(Store.currentGame.isGameOver()) {
        setMessage("Game Over!");
      }

      setResult(result);
    }
  }

  React.useEffect(() => {
    RNShake.addEventListener('ShakeEvent', () => {
      if(!Store.currentGame.isGameOver()) {
        simulateDiceRoll();
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.result}>{result}</Text>
      <View style={styles.diceContainer}>
        <Image
          source={diceImage}
          style={styles.dice}
        />
        <TouchableOpacity onPress={simulateDiceRoll} style={styles.rollDiceButton}>
          <Text style={styles.rollDiceLabel}>Roll Dice</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chart}>
        <Text style={styles.rollDiceLabel}>Players In Game</Text>
        {Store.currentGame.getCurrentlyPlayingPlayersSequence().map((player: Player, index) => {
          return <Text key={index} style={styles.playerName}>{`${player.getPlayerName()} ::  Rank: ${player.rank} ::  Score: ${player.getTotalScore()}`}</Text>;
        })}
        <Text style={styles.rollDiceLabel}>{"\n\n"}</Text>

        <Text style={styles.rollDiceLabel}>Leaderboard</Text>
        {Store.currentGame.getAllPlayersSequence().map((player: Player, index) => {
          return <Text key={index} style={styles.playerName}>{`${player.getPlayerName()} ::  Rank: ${player.rank} ::  Score: ${player.getTotalScore()}`}</Text>;
        })}
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  message: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    alignSelf: "center"
  },
  result: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    alignSelf: "center"
  },
  diceContainer: {

  },
  dice: {
    marginTop: "8%",
    alignSelf: "center",
    height: 60,
    width: 60
  },
  rollDiceButton: {
    marginTop: 16,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8
  },
  rollDiceLabel: {
    color: "red",
    fontWeight: "500",
  },
  chart: {
    marginTop: 20
  },
  playerName: {
    fontWeight: "700",
  }
});
