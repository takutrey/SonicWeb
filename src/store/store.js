import { configureStore } from "@reduxjs/toolkit";
import testimonialReducer from "../lib/testimonialsSlice";
import checkoutReducer from "../lib/orderDetails";

const store = configureStore({
  reducer: {
    testimonials: testimonialReducer,
    checkout: checkoutReducer,
  },
});

export default store;
