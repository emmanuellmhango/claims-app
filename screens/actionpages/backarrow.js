import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomBackArrow = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons
        name="md-arrow-undo-outline"
        size={24}
        style={{
          color: "#fff",
          marginLeft: 8,
        }}
      />
    </TouchableOpacity>
  );
};

export default CustomBackArrow;
