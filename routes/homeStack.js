import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Home from "../screens/startscreens/home";
import HomeOptions from "../screens/startscreens/homeOptions";
import Login from "../screens/accessibility/login";
import Signup from "../screens/accessibility/signup";
import Dashboard from "../screens/actionpages/dashboard";


const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    }
  },
  HomeOptions: {
    screen: HomeOptions,
    navigationOptions: {
      headerShown: false,
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: '',
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: '',
    }
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      headerShown: false,
    }
  },
};

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);