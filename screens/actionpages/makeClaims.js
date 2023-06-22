import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { Camera, CameraType } from "expo-camera";
import { styles } from "../../styles/styles";
import * as Location from "expo-location";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const MakeClaim = () => {
  const [category, setCategory] = useState("");
  const [operator, setOperator] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
    <DismissKeyboard>
      <View style={styles.loginWrapper}>
        <Formik
          initialValues={{
            comment: "",
            picture: "",
            category: category,
            operator: operator,
            location: location,
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(props) => (
            <View style={styles.loginForm}>
              <View style={styles.cameraWrapper}>
                {image ? (
                  <Image source={{ uri: image }} style={{ flex: 1 }} />
                ) : (
                  <View>
                    <Camera
                      style={styles.camera}
                      type={CameraType.back}
                      ratio={"1:1"}
                      ref={(ref) => setCamera(ref)}
                    ></Camera>
                    <View
                      style={{
                        position: "absolute",
                        bottom: 0,
                        flexDirection: "row",
                        flex: 1,
                        width: "100%",
                        padding: 20,
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          alignSelf: "center",
                          flex: 1,
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => takePicture()}
                          style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: "#fff",
                          }}
                        />
                      </View>
                    </View>
                  </View>
                )}
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
      </View>
    </DismissKeyboard>
  );
};

export default MakeClaim;
