import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCustomerService, checkinService } from "../../services/customerServices"

export const getCustomerAction = createAsyncThunk('customer/getCustomer', async (data) => {
  const response = await getCustomerService(data)
  return response
})

export const checkinAction = createAsyncThunk('customer/checkin', async (data, { dispatch }) => {
  const response = await checkinService(data)
  if (response) {
    const { id } = data
    dispatch(getCustomerAction(id))
  }
  return response
})