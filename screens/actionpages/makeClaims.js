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
import axios from "axios";
import { GENERAL_URL } from "../../state/url";
import { useDispatch, useSelector } from "react-redux";
import { addClaim } from "../../state/addClaimSlice";
import { addCategory } from "../../state/categorySlice";
import { addClient } from "../../state/clientSlice";
import { styles } from "../../styles/styles";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const MakeClaim = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.categories);
  const { clients } = useSelector((state) => state.clients);

  const { images } = route.params;

  useEffect(() => {
    getLocationAsync();
  }, [location]);

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Oops!, Please add location permissions first.");
      return;
    }
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    } catch (error) {
      console.log("Error retrieving location:", error);
    }
  };

  const getCategories = async () => {
    const response = await axios.get(`${GENERAL_URL}/categories`);
    const { success, categories } = response.data;
    if (success) {
      dispatch(addCategory(categories));
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${GENERAL_URL}/clients`);
      const { success, clients } = response.data;
      if (success) {
        dispatch(addClient(clients));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  };

  const generateImgData = (img) => {
    const uriParts = img.split(".");
    const fileType = uriParts[uriParts.length - 1];
    const fname = generateRandomString();
    return {
      uri: img,
      type: `image/${fileType}`,
      name: `${fname}.${fileType}`,
    };
  };
  const onSubmit = async (values) => {
    const modifiedValues = {
      ...values,
      category_id: category,
      client_id: client,
      location: JSON.stringify(location),
      comment: values.comment,
    };
    const formData = new FormData();
    formData.append("claim[category_id]", modifiedValues.category_id);
    formData.append("claim[client_id]", modifiedValues.client_id);
    formData.append("claim[location]", modifiedValues.location);
    formData.append("claim[comment]", modifiedValues.comment);
    formData.append("claim[forwarded]", "false");
    formData.append("claim[user_id]", user.id);

    for (let i = 0; i < images.length; i++) {
      formData.append(`claim[images][]`, generateImgData(images[i]));
    }

    if (
      modifiedValues.category_id &&
      modifiedValues.client_id &&
      location &&
      images.length === 2
    ) {
      try {
        const response = await axios.post(`${GENERAL_URL}/claims`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const { success, claims } = response.data;
        if (success) {
          dispatch(addClaim(claims));
          Alert.alert("CONFIRMATION", "The Claim has been submitted", [
            null,
            { text: "OK", onPress: () => navigation.navigate("Explore") },
          ]);
        } else {
          alert("Oops! something went wrong, please try again");
        }
      } catch (error) {
        alert("Oops! something went wrong, please try again");
        console.log(error);
      }
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
                          label={item.name}
                          value={item.id}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <Text style={styles.textLeftClaim}>Client</Text>
                <View style={styles.border}>
                  <Picker
                    selectedValue={client}
                    onValueChange={(itemValue, itemIndex) =>
                      setClient(itemValue)
                    }
                    style={styles.inputSelector}
                  >
                    <Picker.Item label="Select Client" value="" />
                    {clients.map((client, index) => {
                      return (
                        <Picker.Item
                          label={client.name}
                          value={client.id}
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
