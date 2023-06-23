import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "../../styles/styles";

const Home = ({ navigation }) => {
  const pressHandler = () => {
    navigation.navigate("HomeOptions");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.logoHeader}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </View>

      <View style={styles.homeBody}>
        <Text style={styles.homeText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </View>

      <View style={styles.actionSide}>
        <TouchableOpacity style={styles.signupBtn} onPress={pressHandler}>
          <Text style={styles.getStartedText}>Get started !</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
