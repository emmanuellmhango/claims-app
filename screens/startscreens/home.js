import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../styles/styles";

const Home = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const goTosignUp = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.wrapper}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.homeText}>Tag it. Fix it</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={() => goToLogin()}>
            <Text style={styles.getStartedText}> Sign in </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => goTosignUp()}
          >
            <Text style={styles.getStartedText}> Sign up </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;
