import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  claims: [],
};
const addClaimSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    addClaim: (state, action) => {
      state.claims = action.payload;
    },
  },
});

export const { addClaim } = addClaimSlice.actions;
export default addClaimSlice;
