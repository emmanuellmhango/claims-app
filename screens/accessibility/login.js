import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { Formik } from "formik";
import { styles } from "../../styles/styles";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = ({ navigation }) => {
  return (
    <DismissKeyboard>
      <View style={styles.loginWrapper}>
        <ImageBackground
          source={require("../../assets/bg.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              if (values.email === "Admin" && values.password == "admin") {
                navigation.navigate("ClaimOne");
              } else {
                alert("Invalid Credentials");
              }
            }}
          >
            {(props) => (
              <View style={styles.loginForm}>
                <Image
                  source={require("../../assets/logo.png")}
                  style={styles.logo}
                />
                <Text style={styles.textLeft}>Email</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                />
                <Text style={styles.textLeft}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                />
                <View style={styles.forgotDiv}>
                  <Text style={styles.loginForgotPassword}>
                    Forgot Password?
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.getStartedText}>Sign in</Text>
                </TouchableOpacity>

                <View style={styles.bottomDiv}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Signup")}
                  >
                    <Text style={styles.signupTextFromLogin}>
                      New Account? Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          <View style={styles.bottomSpace}>
            <Text style={styles.bottomText}>{/* */}</Text>
          </View>
        </ImageBackground>
      </View>
    </DismissKeyboard>
  );
};

export default Login;
