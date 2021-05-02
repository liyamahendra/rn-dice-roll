import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const GameOverScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>GameOverScreen</Text>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  container: {}
});
