import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles/styles";

const Signout = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={styles.LoginButton}
        onPress={() => handleLogout(this)}
      >
        <Text style={styles.loginTestButton}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signout;
