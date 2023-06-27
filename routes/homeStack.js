import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Home from "../screens/startscreens/home";
import Login from "../screens/accessibility/login";
import Signup from "../screens/accessibility/signup";
import Dashboard from "../screens/actionpages/dashboard";
import MakeClaim from "../screens/actionpages/makeClaims";
import { styles } from "../styles/styles";

const CustomBackArrow = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons name="md-arrow-undo-outline" size={24} style={styles.backArrow} />
  </TouchableOpacity>
);

const CustomLogoutArrow = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons
      name="log-in-outline"
      size={28}
      color="black"
      style={styles.rightIcon}
    />
  </TouchableOpacity>
);
const CustomMenuIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>{/*  */}</TouchableOpacity>
);

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: "",
      headerStyle: {
        backgroundColor: "#612cfe",
      },
      headerLeft: () => <CustomBackArrow onPress={() => navigation.goBack()} />,
    }),
  },
  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation }) => ({
      title: "",
      headerStyle: {
        backgroundColor: "#612cfe",
      },
      headerLeft: () => <CustomBackArrow onPress={() => navigation.goBack()} />,
    }),
  },
  MakeClaim: {
    screen: MakeClaim,
    navigationOptions: ({ navigation }) => ({
      title: "Claim",
      headerStyle: {
        backgroundColor: "#612cfe",
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
      },
      headerLeft: () => <CustomBackArrow onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <CustomMenuIcon onPress={() => alert("Claim History")} />
      ),
    }),
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: ({ navigation }) => ({
      /*title: "Home",
      headerStyle: {
        backgroundColor: "#612cfe",
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
      },
      headerLeft: () => (
        <CustomMenuIcon onPress={() => alert("Claim History")} />
      ),
      headerRight: () => (
        <CustomLogoutArrow onPress={() => navigation.goBack()} />
      ),*/
      headerShown: false,
    }),
  },
};

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
