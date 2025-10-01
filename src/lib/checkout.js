import axios from "axios";

export const sendEmailInvoice = async (orderData) => {
  try {
    await axios.post(
      "https://sonicsignal-website.onrender.com/api/send-invoice",
      {
        email: orderData.customer.email,
        orderData: orderData,
      }
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const addCustomerData = async (orderData) => {
  try {
    const response = await axios.post(
      "https://sonicsignal-website.onrender.com/api/customers/add-customer",
      orderData
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ecocashPayment = async (paymentData) => {
  const { phone, total, reference } = paymentData;
  try {
    const response = await axios.post(
      "https://sonicsignal-website.onrender.com/api/ecocash/ecocash-pay",
      { phone, total, reference }
    );

    return response;
  } catch (error) {
    return false;
  }
};

export const ecocashTransactionLookup = async (paymentData) => {
  const { phone, reference } = paymentData;

  try {
    const response = await axios.post(
      "https://sonicsignal-website.onrender.com/api/ecocash/check-transaction",
      { phone, reference }
    );

    return response;
  } catch (error) {
    return false;
  }
};
