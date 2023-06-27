<View style={styles.flyItem}>
  <View style={styles.flyImageContainer}>
    <Image
      source={require("../../assets/image_uploads/pothole.jpg")}
      style={styles.flyImage}
      resizeMode="contain"
    />
  </View>
  <View style={styles.flyTextContainer}>
    <Text style={styles.flyText}>Broken water pipe</Text>
    <Text style={styles.flyText}>10/10/2021</Text>
  </View>
</View>;

import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator } from "react-navigation-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import store from "./state/store";
import Home from "./screens/startscreens/home";
import Login from "./screens/accessibility/login";
import Signup from "./screens/accessibility/signup";
import Dashboard from "./screens/actionpages/dashboard";
import ClaimOne from "./screens/actionpages/claimOne";
import ClaimTwo from "./screens/actionpages/claimTwo";

const Stack = createStackNavigator();

// const CustomLogoutArrow = ({ onPress }) => (
//   <TouchableOpacity onPress={onPress}>
//     <Ionicons
//       name="log-in-outline"
//       size={28}
//       color="black"
//       style={{
//         color: "#fff",
//         marginRight: 8,
//       }}
//     />
//   </TouchableOpacity>
// );

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Sign In"
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
            name="Sign Up"
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
            name="Claim"
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
