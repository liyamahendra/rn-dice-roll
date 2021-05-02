import * as React from 'react';
import { Text, TextInput, TouchableOpacity, Alert, View, StyleSheet } from 'react-native';

import Store from "../core/Store";
import Player from "../core/Player";
import Utils from "../core/Utils";
import Game from '../core/Game';

const StartUpScreen = ({ navigation, route }) => {

  const [totalPlayers, setTotalPlayers] = React.useState("");
  const [totalToScore, setTotalToScore] = React.useState("");

  const startGame = () => {

    // Reset game on 'Restart' click
    Store.currentGame = new Game(0, 0);
    let players = parseInt(totalPlayers);
    let score = parseInt(totalToScore);

    if(isNaN(players) || players <= 0) {
      return Utils.displayAlert("Error", "Atleast 1 players is required to play the game.");
    }

    if(isNaN(score) || score < 0) {
      return Utils.displayAlert("Error", "The score should be greater than Zero.");
    }

    let newGame = new Game(players, score);

    let randomSequence = Utils.randomize(players);

    let sequenceOfPlayers = [];
    for(var i=0; i<randomSequence.length; i++) {
      var player: Player = new Player();
      player.setPlayerName(`Player ${randomSequence[i]}`);
      player.setTotalToScore(score);
      sequenceOfPlayers.push(player);
    }

    newGame.setPlayerSequence(sequenceOfPlayers);

    Store.currentGame = newGame;

    navigation.navigate("PlayerSequence");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeLabel}>Welcome!</Text>
      <Text style={styles.infoLabel}>Please provide the below details to begin playing the game:</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          value={totalPlayers}
          style={styles.inputText}
          placeholder={"total players"}
          keyboardType={"numeric"}
          onChangeText={setTotalPlayers}
        />
        <TextInput
          value={totalToScore}
          style={styles.inputText}
          placeholder={"total to score"}
          keyboardType={"numeric"}
          onChangeText={setTotalToScore}
        />
      </View>

      <TouchableOpacity onPress={startGame} style={styles.startGameButton}>
        <Text style={styles.startGame}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  welcomeLabel: {
    marginTop: "10%",
    fontSize: 24,
    alignSelf: "center",
  },
  infoLabel: {
    marginTop: "6%",
    fontSize: 16,
    alignSelf: "center",
    textAlign: "center"
  },
  inputWrapper: {
    marginTop: 32,
  },
  inputText: {
    height: 36,
    backgroundColor: "white",
    padding: 8,
    textAlign: "center",
    borderRadius: 6,
    marginBottom: 12,
  },
  startGameButton: {
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
  startGame: {
    color: "red",
    fontWeight: "500",
  }
});
