import axios from "axios";

const baseUrl = "http://localhost:5050/api"

export async function AllProducts() {
    try {
      return await axios.get(`${baseUrl}/all-product`);
    } catch (error) {
      console.log(error);
    }
  }

  export async function getSingleProduct(id) {
    try {
      return await axios.get(`${baseUrl}/product/${id}`);
    } catch (error) {
      console.log(error);
    }
  }


  export async function getRelatedProducts(categoryId, productId) {
    try {
      const url = `${baseUrl}/category-product/${categoryId}`;
      const response = await axios.get(productId ? `${url}?productId=${productId}` : url);
      return response;
    } catch (error) {
      console.error("Error fetching related products:", error);
      throw error;
    }
  }
  