import axios from "axios";

const baseUrl = "http://localhost:5050/api"

export async function AllProducts() {
    try {
      return await axios.get(`${baseUrl}/all-product`);
    } catch (error) {
      console.log(error);
    }
  }