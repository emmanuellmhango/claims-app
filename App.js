import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, StyleSheet } from "react-native";
import Home from "./screens/startscreens/home";
import Login from "./screens/accessibility/login";
import Signup from "./screens/accessibility/signup";
import Dashboard from "./screens/actionpages/dashboard";
import ClaimOne from "./screens/actionpages/claimOne";
import ClaimTwo from "./screens/actionpages/claimTwo";
import CustomBackArrow from "./screens/actionpages/backarrow";
import MakeClaim from "./screens/actionpages/makeClaims";
import Explore from "./screens/actionpages/explore";
import ViewMap from "./screens/actionpages/viewmap";
import { Provider } from "react-redux";
import store from "./state/store";

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerLeft: () => <CustomBackArrow />,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerLeft: () => <CustomBackArrow />,
            }}
          />
          <Stack.Screen
            name="ClaimOne"
            component={ClaimOne}
            options={{
              title: "Claim",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerTitleStyle: {
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
              },
              headerTitleAlign: "center",
              headerLeft: () => <CustomBackArrow />,
              headerRight: () => <Text> {/* */} </Text>,
            }}
          />
          <Stack.Screen
            name="ClaimTwo"
            component={ClaimTwo}
            options={{
              title: "Claim",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerTitleStyle: {
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
              },
              headerTitleAlign: "center",
              headerLeft: () => <CustomBackArrow />,
              headerRight: () => <Text> {/* */} </Text>,
            }}
          />
          <Stack.Screen
            name="MakeClaim"
            component={MakeClaim}
            options={{
              title: "Claim",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerTitleStyle: {
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
              },
              headerTitleAlign: "center",
              headerLeft: () => <CustomBackArrow />,
              headerRight: () => <Text> {/* */} </Text>,
            }}
          />
          <Stack.Screen
            name="ViewMap"
            component={ViewMap}
            options={{
              title: "View On Map",
              headerStyle: {
                backgroundColor: "#612cfe",
              },
              headerTitleStyle: {
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
              },
              headerTitleAlign: "center",
              headerLeft: () => <CustomBackArrow />,
              headerRight: () => <Text> {/* */} </Text>,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Explore"
            component={Explore}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
