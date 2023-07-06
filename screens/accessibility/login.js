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
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../state/userSlice";
import { styles } from "../../styles/styles";
import URL from "../../state/url";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleLogin = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axios.get(
        URL,
        { params: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { success, user } = response.data;
      if (success) {
        dispatch(addUser(user));
        navigation.navigate("Dashboard");
      } else {
        alert("Oops!. Seems the email is not registered. Please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email is required";
              }
              if (!values.password) {
                errors.password = "Password is required";
              }
              return errors;
            }}
            onSubmit={handleLogin}
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
