import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartUpScreen from './src/screens/StartUpScreen';
import PlayerSequenceScreen from './src/screens/PlayerSequenceScreen';
import GameScreen from './src/screens/GameScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartUp" component={StartUpScreen} options={{ title: "Roll the Dice" }} />
        <Stack.Screen name="PlayerSequence" component={PlayerSequenceScreen} options={{ title: "Player Sequence", headerBackTitle: "Back" }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: "Roll the Dice", headerLeft: () => null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;