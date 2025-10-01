import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCustomerData,
  sendEmailInvoice,
  ecocashPayment,
  ecocashTransactionLookup,
} from "./checkout";
import { InvoiceNumber } from "invoice-number";
import { v4 as uuidV4 } from "uuid";

const initialState = {
  orderType: "",
  customer: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
  },
  items: [],
  subtotal: 0,
  paymentMethod: "",
  paymentDetails: {
    mastercard: {
      name: "",
      email: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },

    ecocash: {
      phone: "",
    },
  },
  orderPlaced: false,
  isLoading: false,
  error: null,
};

export const placeOrder = createAsyncThunk(
  "checkout/placeOrder",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { checkout } = getState();
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");

      let lastSequence = 0;
      lastSequence += 1;

      const invoiceNumber = InvoiceNumber.next(
        `INV-${year}${month}${String(lastSequence).padStart(3, "0")}`
      );

      const reference = uuidV4();
      const taxRate = 0.08;
      const taxAmount = checkout.subtotal * taxRate;
      const grandTotal = checkout.subtotal + taxAmount;

      const orderData = {
        orderNumber: invoiceNumber,
        orderDate: new Date().toISOString(),
        orderType: checkout.orderType,
        customer: checkout.customer,
        items: checkout.items,
        paymentMethod: checkout.paymentMethod,
        paymentDetails: checkout.paymentDetails,
        subtotal: checkout.subtotal,
        tax: taxAmount,
        total: grandTotal,
      };

      // 1️⃣ Add customer and create order first
      await addCustomerData(orderData);

      let paymentSuccess = false;

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      // 2️⃣ Process payment if needed
      if (checkout.paymentMethod === "ecocash") {
        const ecocashPhone = checkout.paymentDetails.ecocash?.phone;
        if (!ecocashPhone) throw new Error("EcoCash phone number is required");

        const payment = await ecocashPayment({
          phone: ecocashPhone.startsWith("+")
            ? ecocashPhone.slice(1)
            : ecocashPhone,
          total: grandTotal,
          reference,
        });

        await delay(5000);

        if (payment.status === 200) {
          const transactionLookup = await ecocashTransactionLookup({
            phone: ecocashPhone.startsWith("+")
              ? ecocashPhone.slice(1)
              : ecocashPhone,
            reference,
          });

          if (transactionLookup.status === "SUCCESS") {
            paymentSuccess = true;
          } else {
            paymentSuccess = false;
          }
        } else {
          throw new Error("Payment lookup failed");
        }
      }

      if (paymentSuccess) {
        await sendEmailInvoice(orderData);
        return { ...orderData, paymentSuccess: true };
      }

      return orderData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || error.error
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    setCustomerDetails: (state, action) => {
      state.customer = { ...state.customer, ...action.payload };
    },
    setItems: (state, action) => {
      state.items = action.payload;
      state.subtotal = action.payload.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setPaymentDetails: (state, action) => {
      const { method, details } = action.payload;
      state.paymentDetails[method] = {
        ...state.paymentDetails[method],
        ...details,
      };
    },
    resetCheckout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.paymentSuccess) {
          state.orderPlaced = true;
        }
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to place order";
        state.orderPlaced = false;
      });
  },
});

export const {
  setOrderType,
  setCustomerDetails,
  setItems,
  setPaymentMethod,
  setPaymentDetails,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
