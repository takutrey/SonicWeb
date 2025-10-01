import axios from "axios";
import { toast } from "sonner";

const baseUrl = "http://localhost:5050/api";

export async function AllBlogs() {
  try {
    return await axios.get(`${baseUrl}/all-blogs`);
  } catch (error) {
    toast.error(error.message);
  }
}

export async function getSingleBlog(id) {
  try {
    return await axios.get(`${baseUrl}/blog/${id}`);
  } catch (error) {
    toast.error(error.message);
  }
}

export async function getBlogsByCategory(id) {
  try {
    return await axios.get(`${baseUrl}/category-blog/${id}`);
  } catch (error) {
    toast.error(error.message);
  }
}
