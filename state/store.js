import { configureStore } from "@reduxjs/toolkit";
import addClaimSlice from "./addClaimSlice";
import userSlice from "./userSlice";
import categorySlice from "./categorySlice";
import clientSlice from "./clientSlice";

const store = configureStore({
  reducer: {
    claims: addClaimSlice.reducer,
    user: userSlice.reducer,
    categories: categorySlice.reducer,
    clients: clientSlice.reducer,
  },
});

export default store;
