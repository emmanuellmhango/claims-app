import React from "react";
import { Provider } from "react-redux";
import Navigator from "./routes/homeStack";
import store from "./state/store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
