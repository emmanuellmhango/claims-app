import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "../../styles/styles";

const HomeOptions = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const goTosignUp = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.wrapper}>
      
      <View style={styles.logoHeader}>
        <Image source={require("../../assets/logo.png")} style={ styles.logo} /> 
      </View>

      <View style={styles.homeBodyOptions}>
        <Text style={styles.homeText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </View>
      <View style={styles.actionSideOptions}>
        <TouchableOpacity style={styles.loginBtn} onPress = {() => goToLogin()}>
          <Text style={styles.getStartedText}> Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupBtn} onPress = {() => goTosignUp()}>
          <Text style={styles.getStartedText}> Sign up </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeOptions;