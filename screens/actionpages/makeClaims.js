import React from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Dropdown } from 'react-native-material-dropdown';
import { styles } from "../../styles/styles";

const MakeClaim = ({ navigation }) => {
  let data = [
    {
      value: 'Banana',
    },
    {
      value: 'Mango',
    },
    {
      value: 'Pear',
    },
  ];
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
            <Text style={styles.signupTitle}>Submit Claim</Text>
            <Text>Picture</Text>
            <Text>Category</Text>
            <Dropdown
              label='Favorite Fruit'
              data={data}
            />
            <Text>Location</Text>

            <TextInput
              multiline
              style={styles.input}
              placeholder="Comment"
              onChangeText={props.handleChange("phone")}
              value={props.values.phone}
            />
            <TouchableOpacity style={styles.LoginButton} onPress={props.handleSubmit}>
              <Text style={styles.loginTestButton}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default MakeClaim;
