import { configureStore } from "@reduxjs/toolkit";
import addClaimSlice from "./addClaimSlice";

const store = configureStore({
  reducer: {
    claims: addClaimSlice.reducer,
  },
});

export default store;
