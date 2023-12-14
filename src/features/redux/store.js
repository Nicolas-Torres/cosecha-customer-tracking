import { configureStore } from "@reduxjs/toolkit"
import { customerSlice } from "./slices/customerSlice"

export const store = configureStore({
  reducer: {
    customer: customerSlice.reducer
  },
  middleware: (getDefaultMiddleare) => getDefaultMiddleare({
    immutableCheck: false,
    serializableCheck: false
  })
})

export default store