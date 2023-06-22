import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { Formik } from "formik";
import { styles } from "../../styles/styles";

const Login = ({ navigation }) => {
  return (
    <View style={styles.loginWrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          if (values.email === "admin" && values.password == "admin") {
            navigation.navigate("Dashboard");
          } else {
            alert("Invalid Credentials");
          }
        }}
      >
        {(props) => (
          <View style={styles.loginForm}>
            <Image
              style={styles.loginLogo}
              source={require("../../assets/logo.png")}
            />
            <Text style={styles.loginTitle}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={props.handleChange("password")}
              value={props.values.password}
            />
            <TouchableOpacity
              style={styles.LoginButton}
              onPress={props.handleSubmit}
            >
              <Text style={styles.loginTestButton}>Login</Text>
            </TouchableOpacity>

            <View style={styles.forgotDiv}>
              <Text style={styles.loginForgotPassword}>Forgot Password?</Text>
            </View>
          </View>
        )}
      </Formik>

      <View style={styles.bottomDiv}>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupTextFromLogin}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
