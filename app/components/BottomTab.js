import React from 'react';
import { colors } from '../constants';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import StickyPlayer from '../views/PlayerView/stickyPlayer';

export default function BottomTab({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const Tabs = () => (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = 
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;
        const icon= options.tabBarIcon;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={label}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.title}
            onPress={onPress}
            style={{ 
              flex: 1, 
              backgroundColor: colors.grey,
              borderTopWidth: 0,
              paddingVertical: 6,
              alignItems: 'center'
            }}
          >
            <Icon size={22} name={icon} color={isFocused ? colors.white : colors.greyInactive} />
            <Text style={{ 
              color: isFocused ? colors.white : colors.greyInactive,
              marginTop: 5
            }}> { label } </Text>
          </TouchableOpacity>
        );

      })}
    </View>
  )
  

  return (
    <View>
      <StickyPlayer navigation={navigation}/>
      <Tabs />
    </View>
  )
}