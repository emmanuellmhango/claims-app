import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MakeClaim from './makeClaims';
import Signout from './signout';
import ClaimHistory from './claimHistory';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        "tabBarActiveTintColor": "blue",
        "tabBarInactiveTintColor": "gray",
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = size;
          let iconColor = color;

          if (route.name === 'History') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          } else if (route.name === 'Claim') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            iconSize = focused ? size + 10 : size + 5;
            iconColor = 'coral';
          } else if (route.name === 'Signout') {
            iconName = focused ? 'log-out' : 'log-out-outline';
          }

          return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen name="History" component={ClaimHistory} />
      <Tab.Screen name="Claim" component={MakeClaim} />
      <Tab.Screen name="Signout" component={Signout} />
    </Tab.Navigator>
  );
};

const DashBoard = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default DashBoard;
