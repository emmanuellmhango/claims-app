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
  Alert,
} from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
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
  const [location, setLocation] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const { images } = route.params;

  useEffect(() => {
    getLocationAsync();
  }, [location]);

  useEffect(() => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    const curDate = `${day}/${month}/${year} ${hours}:${min}:${sec}`;
    setCurrentDate(curDate);
  }, [currentDate]);

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
  const onSubmit = (values) => {
    const modifiedValues = {
      ...values,
      location: location,
      operator: operator,
      category: category,
      pictures: [...images],
      date: currentDate,
    };
    if (
      modifiedValues.category &&
      modifiedValues.operator &&
      modifiedValues.location &&
      modifiedValues.pictures
    ) {
      dispatch(addClaim(modifiedValues));
      Alert.alert("CONFIRMATION", "The Claim has been submitted", [
        null,
        { text: "OK", onPress: () => navigation.navigate("Explore") },
      ]);
    } else {
      alert("Please fill in all fields");
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.claimContainer}>
      <DismissKeyboard>
        <View style={styles.makeClaimWrapper}>
          <Formik
            initialValues={{
              comment: "",
            }}
            onSubmit={onSubmit}
          >
            {(props) => (
              <View style={styles.loginForm}>
                <View style={styles.imagesClaimSubmitContainer}>
                  {images &&
                    images.map((image, index) => {
                      return (
                        <View style={styles.imagesClaimSubmit} key={index}>
                          <Image
                            source={{ uri: image }}
                            style={styles.capturedImageClaim}
                          />
                        </View>
                      );
                    })}
                </View>
                <Text style={styles.textLeftClaim}>Category</Text>
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
                <Text style={styles.textLeftClaim}>Client</Text>
                <View style={styles.border}>
                  <Picker
                    selectedValue={operator}
                    onValueChange={(itemValue, itemIndex) =>
                      setOperator(itemValue)
                    }
                    style={styles.inputSelector}
                  >
                    <Picker.Item label="Select Client" value="" />
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
                <Text style={styles.textLeftClaim}>Comment</Text>
                <TextInput
                  multiline
                  style={styles.inputComment}
                  placeholder="Comment"
                  onChangeText={props.handleChange("comment")}
                  value={props.values.comment}
                />
                <TouchableOpacity
                  style={styles.loginBtnClaim}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.loginTestButton}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </DismissKeyboard>
    </ScrollView>
  );
};

export default MakeClaim;
