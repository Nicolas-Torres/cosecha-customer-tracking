import { createSlice } from "@reduxjs/toolkit";
import { getCustomerAction } from "../actions/customerAction";

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
    message: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerAction.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCustomerAction.fulfilled, (state, action) => {
        state.status = 'success',
        state.data = action.payload
      })
      .addCase(getCustomerAction.rejected, (state) => {
        state.status = 'failed'
        state.error = "Error seteado 1"
      })
  }
})