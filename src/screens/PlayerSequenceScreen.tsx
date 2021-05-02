import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Store from "../core/Store";
import Player from "../core/Player";

const PlayerSequenceScreen = ({ navigation, route }) => {

  const letsPlay = () => {
    navigation.replace("Game");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.infoMessage}>Below is the sequence in which the players which get their turn to roll the dice: </Text>
      <View style={styles.sequenceWrapper}>
        {Store.currentGame.getCurrentlyPlayingPlayersSequence().map((player: Player, index) => {
          return <Text key={index} style={styles.playerName}>{` \u2022 ${player.getPlayerName()}`}</Text>;
        })}
      </View>
      <TouchableOpacity onPress={letsPlay} style={styles.letsPlayButton}>
        <Text style={styles.letsPlay}>Let's Play</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayerSequenceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  infoMessage: {
    marginTop: 16,
    fontSize: 16
  },
  sequenceWrapper: {
    marginTop: "16%",
    alignSelf: "center"
  },
  playerName: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "700"
  },
  letsPlayButton: {
    marginTop: "16%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8
  },
  letsPlay: {
    color: "red",
    fontWeight: "500",
  }
});
