import React, { useState } from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { styles } from "../../styles/styles";

const Signup = ({ navigation }) => {

  return (
    <View style={styles.loginWrapper}>
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
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => (
          <View style={styles.loginForm}>
            <Image
              style={styles.signupLogo}
              source={require("../../assets/logo.png")}
            />
            <Text style={styles.signupTitle}>Sign Up !</Text>
            <TextInput
              style={styles.input}
              placeholder="name"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
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
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              onChangeText={props.handleChange("phone")}
              value={props.values.phone}
            />
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
            <TouchableOpacity style={styles.LoginButton} onPress={props.handleSubmit}>
              <Text style={styles.loginTestButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.bottomDiv}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupTextFromLogin} >
            Signin
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
