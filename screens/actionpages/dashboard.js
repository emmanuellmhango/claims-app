import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "./home";
import MakeClaim from "./makeClaims";
import ClaimHistory from "./claimHistory";

const Tab = createBottomTabNavigator();

const MyTabs = ({ navigation }) => {
  const options = {
    headerStyle: {
      backgroundColor: "#f2f5f7",
    },
    headerTitleStyle: {
      color: "#6f7173",
      fontWeight: "bold",
      alignSelf: "center",
      textAlign: "center",
    },
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = size;
          let iconColor = color;

          if (route.name === "History") {
            iconName = focused ? "list-circle" : "list-circle-outline";
          } else if (route.name === "Claim") {
            iconName = focused ? "add-circle" : "add-circle-outline";
            iconSize = focused ? size + 10 : size + 5;
            iconColor = "coral";
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          }

          return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={options} />
      <Tab.Screen name="Claim" component={MakeClaim} options={options} />
      <Tab.Screen name="History" component={ClaimHistory} options={options} />
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
