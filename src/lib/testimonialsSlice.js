import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5050/api/testimonials";

const initialState = {
  testimonial: [],
  isLoading: false,
  error: null,
};

export const addTestimonial = createAsyncThunk(
  "testimonials/addTestimonial",
  async (testimonialData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(testimonialData).forEach((key) => {
        formData.append(key, testimonialData[key]);
      });
      const response = await axios.post(
        `${baseUrl}/add-testimonial`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add testimonial"
      );
    }
  }
);

export const fetchActiveTestimonials = createAsyncThunk(
  "testimonials/fetchActiveTestimonials",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/active-testimonials`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch testimonials"
      );
    }
  }
);

const TestimonialSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTestimonial.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testimonial.push(action.payload);
      })

      .addCase(addTestimonial.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchActiveTestimonials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchActiveTestimonials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testimonial = action.payload;
      })

      .addCase(fetchActiveTestimonials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = TestimonialSlice.actions;
export default TestimonialSlice.reducer;
