import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import InsideStack from './stacks/InsideStack';

const Stack=createStackNavigator();
function AppContainer() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen
          name='InsideStack'
          component={InsideStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppContainer;