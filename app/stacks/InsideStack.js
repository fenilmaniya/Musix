import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from '../components/BottomTab';

import HomeView from '../views/HomeView';
import AlbumView from '../views/AlbumView';
import SearchView from '../views/SearchView';
import LibraryView from '../views/LibraryView';
import PlaylistView from '../views/PlaylistView';
import PlayerView from '../views/PlayerView';

const BottomTab=createBottomTabNavigator();
function BottomTabStack() {
  return (
    <BottomTab.Navigator
      tabBar={props => <CustomBottomTab {...props} /> }
    >
       <BottomTab.Screen name="HomeView" options={{ title: 'Home', tabBarIcon: 'home'}} component={HomeView} />
       <BottomTab.Screen name="SearchView" options={{ title: 'Search', tabBarIcon: 'search'}} component={SearchView} />
       <BottomTab.Screen name="LibraryView" options={{ title: 'Library', tabBarIcon: 'book'}} component={LibraryView} />
    </BottomTab.Navigator>
  )
}


const Stack=createStackNavigator();
function InsideStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'BottomTabStack'} component={BottomTabStack} />
      <Stack.Screen name={'AlbumView'} component={AlbumView} />
      <Stack.Screen name={'PlaylistView'} component={PlaylistView} />
      <Stack.Screen name={'playerView'} component={PlayerView} />
    </Stack.Navigator>
  )
}

export default InsideStack;