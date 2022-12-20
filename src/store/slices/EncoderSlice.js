import { createSlice } from "@reduxjs/toolkit";

const encoderSlice = createSlice({
  name: "encoder",
  initialState: { encoders: [] },
  reducers: {
    setEncoders: (state, action) => {
      state.encoders = action.payload;
    },
    addEncoder: (state, action) => {
      state.encoders.push(action.payload);
    },
    editEncoder: (state, action) => {
      const index = state.encoders.findIndex(encoder=>encoder.id == action.payload.id);
      state.encoders[index] = action.payload;
    },
    deleteEncoder: (state, action) => {
      const index= state.encoders.findIndex(encoder=>encoder.id*1 === action.payload*1)
      state.encoders.splice(index,1)
    },
  },
});
export const encoderAction = encoderSlice.actions;
export default encoderSlice.reducer;
