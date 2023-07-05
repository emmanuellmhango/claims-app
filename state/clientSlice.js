import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: [],
};
const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addClient: (state, action) => {
      state.clients = action.payload;
    },
    deleteClient: (state, action) => {
      state.clients = state.clients.filter(
        (client) => client.id !== action.payload
      );
    },
  },
});

export const { addClient, deleteClient } = clientSlice.actions;
export default clientSlice;
