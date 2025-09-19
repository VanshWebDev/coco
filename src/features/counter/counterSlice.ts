// counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: string; // category name instead of number
}

const initialState: CounterState = {
  value: "", // initially empty
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    category: (state, action: PayloadAction<string>) => {
      state.value = action.payload; // store category name
    },
  },
});

export const { category } = counterSlice.actions;
export default counterSlice.reducer;
