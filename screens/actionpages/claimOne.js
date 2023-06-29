import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Formik } from "formik";
import { Camera, CameraType } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/styles";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ClaimOne = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);

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
                pictureA: "",
              }}
              onSubmit={(values) => {
                values.pictureA = image;
                if (values.pictureA) {
                  navigation.navigate("ClaimTwo", {
                    imageA: image,
                  });
                } else {
                  alert("Please capture the image first");
                }
              }}
            >
              {(props) => (
                <View style={styles.loginForm}>
                  <View style={styles.cameraWrapper}>
                    {image ? (
                      <View>
                        <Image
                          source={{ uri: image }}
                          style={styles.capturedImage}
                        />
                        <View style={styles.deleteButtonContainer}>
                          <TouchableOpacity
                            onPress={() => setImage(null)}
                            style={styles.deleteButton}
                          >
                            <Ionicons name="trash" size={25} color="red" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.captureButtonContainerAction}>
                          <View style={styles.icon}>
                            <Ionicons
                              name="checkmark"
                              size={24}
                              color="#fff"
                              style={styles.captureButtonSubmitIcon}
                            />
                          </View>
                          <TouchableOpacity
                            onPress={props.handleSubmit}
                            style={styles.captureButtonSubmit}
                          >
                            <Text style={styles.loginTestButton}>Submit</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <Camera
                          style={styles.camera}
                          type={CameraType.back}
                          ratio={"1:1"}
                          ref={(ref) => setCamera(ref)}
                        />
                        <View style={styles.captureButtonContainer}>
                          <TouchableOpacity
                            onPress={() => takePicture()}
                            style={styles.captureButton}
                          >
                            <Ionicons name="camera" size={30} color="#fff" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </Formik>
          </ImageBackground>
        </View>
      </DismissKeyboard>
    </ScrollView>
  );
};

export default ClaimOne;
