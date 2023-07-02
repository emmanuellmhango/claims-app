import { configureStore } from "@reduxjs/toolkit";
import addClaimSlice from "./addClaimSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    claims: addClaimSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
