import React from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import { styles } from "../../styles/styles";
import URL from "../../state/url";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Signup = ({ navigation }) => {
  const handleSignup = async (values) => {
    const dob = `${values.dd}/${values.mm}/${values.yy}`;
    const data = {
      user: {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        dob: dob,
      },
    };
    try {
      const response = await axios.post(URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.code === 2200) {
        alert("You have successfully signed up. Please login to continue.");
        navigation.navigate("Login");
      } else {
        alert("Oops!. Seems there was an error. Please try again");
      }
    } catch (error) {
      console.log(error.response.data);
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
            initialValues={{
              name: "",
              email: "",
              password: "",
              phone: "",
              dd: "",
              mm: "",
              yy: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.name) {
                errors.name = "Name is required";
              }
              return errors;
            }}
            onSubmit={handleSignup}
          >
            {(props) => (
              <View style={styles.loginForm}>
                <Image
                  style={styles.signupLogo}
                  source={require("../../assets/logo.png")}
                />
                <Text style={styles.textLeft}>Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                  onBlur={props.handleBlur("name")}
                />
                <Text style={styles.textLeft}>Email</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                />
                <Text style={styles.textLeft}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                />
                <Text style={styles.textLeft}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  onChangeText={props.handleChange("phone")}
                  value={props.values.phone}
                />
                <Text style={styles.textLeft}>Date of Birth</Text>
                <View style={styles.dobContainer}>
                  <TextInput
                    style={styles.ddInput}
                    maxLength={2}
                    placeholder="DD"
                    keyboardType="number-pad"
                    onChangeText={props.handleChange("dd")}
                    value={props.values.dd}
                  />
                  <TextInput
                    style={styles.mmInput}
                    maxLength={2}
                    placeholder="MM"
                    keyboardType="number-pad"
                    onChangeText={props.handleChange("mm")}
                    value={props.values.mm}
                  />
                  <TextInput
                    style={styles.yyInput}
                    maxLength={4}
                    placeholder="YYYY"
                    keyboardType="number-pad"
                    onChangeText={props.handleChange("yy")}
                    value={props.values.yy}
                  />
                </View>
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.getStartedText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.bottomDiv}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.signupTextFromLogin}>
                      Already have an account? Sign in
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ImageBackground>
      </View>
    </DismissKeyboard>
  );
};

export default Signup;
