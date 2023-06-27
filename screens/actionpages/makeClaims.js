import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addClaim } from "../../state/addClaimSlice";
import { styles } from "../../styles/styles";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const MakeClaim = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [operator, setOperator] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const { images } = route.params;

  useEffect(() => {
    getLocationAsync();
  }, [location]);

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    } catch (error) {
      console.log("Error retrieving location:", error);
    }
  };

  const categories = [
    { label: "Apple", value: "apple" },
    { label: "Mango", value: "mango" },
    { label: "Banana", value: "banana" },
    { label: "Pear", value: "pear" },
    { label: "Pepper", value: "pepper" },
  ];

  const operators = [
    { label: "Vodacom", value: "vodacom" },
    { label: "MTN", value: "mtn" },
    { label: "Cell C", value: "cellc" },
    { label: "Telkom", value: "telkom" },
    { label: "Rain", value: "rain" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.claimContainer}>
      <DismissKeyboard>
        <View style={styles.loginWrapper}>
          <ImageBackground
            source={require("../../assets/bg.png")}
            resizeMode="cover"
            style={styles.image}
          >
            <Formik
              initialValues={{
                comment: "",
                picture: "",
                category: "",
                operator: "",
                location: "",
              }}
              onSubmit={(values) => {
                values.location = location;
                values.operator = operator;
                values.category = category;
                values.picture = image;
                if (
                  values.category &&
                  values.operator &&
                  values.location &&
                  values.picture
                ) {
                  dispatch(addClaim(values));
                  console.log(values);
                  alert("Claim submitted successfully");
                } else {
                  alert("Please fill in all fields");
                }
              }}
            >
              {(props) => (
                <View style={styles.loginForm}>
                  <View style={styles.imagesClaimSubmit}>
                    {images &&
                      images.map((image, index) => {
                        <View style={styles.imagesClaimSubmit} key={index}>
                          <Image
                            source={{ uri: image }}
                            style={styles.capturedImage}
                          />
                        </View>;
                      })}
                  </View>
                  <View style={styles.border}>
                    <Picker
                      selectedValue={category}
                      onValueChange={(itemValue, itemIndex) =>
                        setCategory(itemValue)
                      }
                      style={styles.inputSelector}
                    >
                      <Picker.Item label="Select Category" value="" />
                      {categories.map((item, index) => {
                        return (
                          <Picker.Item
                            label={item.label}
                            value={item.value}
                            key={index}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  <View style={styles.border}>
                    <Picker
                      selectedValue={operator}
                      onValueChange={(itemValue, itemIndex) =>
                        setOperator(itemValue)
                      }
                      style={styles.inputSelector}
                    >
                      <Picker.Item label="Select Operator" value="" />
                      {operators.map((item, index) => {
                        return (
                          <Picker.Item
                            label={item.label}
                            value={item.value}
                            key={index}
                          />
                        );
                      })}
                    </Picker>
                  </View>

                  <TextInput
                    style={styles.hiddenField}
                    onChangeText={props.handleChange("location")}
                    value={props.values.location}
                  />
                  <TextInput
                    multiline
                    style={styles.inputComment}
                    placeholder="Comment"
                    onChangeText={props.handleChange("comment")}
                    value={props.values.comment}
                  />
                  <TouchableOpacity
                    style={styles.LoginButton}
                    onPress={props.handleSubmit}
                  >
                    <Text style={styles.loginTestButton}>Submit</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ImageBackground>
        </View>
      </DismissKeyboard>
    </ScrollView>
  );
};

export default MakeClaim;
