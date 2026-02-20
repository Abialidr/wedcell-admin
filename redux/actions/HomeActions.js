import axios from "axios";

import { PROXY } from "../../config";
export const GetStudents = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    const response = await axios.post(`${PROXY}/student/getall`, config);

    dispatch({
      type: "FETCH_STUDENT",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "VENDORS_REJECTED",
      payload: error.response,
    });
  }
};
export const GetVendors = (page) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROXY}/vendoruser/getall`, {
      type: "Vendor",
      page,
      isAdmin: true,
    });

    console.log(
      "🚀 ~ file: HomeActions.js:34 ~ GetVendors ~ response.data:",
      response.data
    );
    dispatch({
      type: "FETCH_VENDORS",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "VENDORS_REJECTED",
      payload: error.response,
    });
  }
};

export const GetSearchForVendors =
  ({ page, searchTerm }) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${PROXY}/vendoruser/fullTextSearch/${searchTerm}?page=${page}&isAdmin=${true}`,
        {
          isAdmin: true,
        }
      );

      console.log(
        "🚀 ~ file: HomeActions.js:34 ~ GetVendors ~ response.data:",
        response.data
      );
      dispatch({
        type: "FETCH_VENDORS",
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "VENDORS_REJECTED",
        payload: error.response,
      });
    }
  };

export const GetSearchForVenues =
  ({ page, searchTerm }) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${PROXY}/venueuser/fullTextSearch/${searchTerm}?page=${page}&isAdmin=${true}`,
        {
          isAdmin: true,
        }
      );

      console.log(
        "🚀 ~ file: HomeActions.js:34 ~ GetVendors ~ response.data:",
        response.data
      );
      dispatch({
        type: "FETCH_VENUES",
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "VENUES_REJECTED",
        payload: error.response,
      });
    }
  };
export const GetSearchForInhouseOthers =
  ({ page, searchTerm }) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${PROXY}/inhouse/other/:${searchTerm}&page=${page}`,
        {
          isAdmin: true,
        }
      );

      console.log(
        "🚀 ~ file: HomeActions.js:34 ~ GetVendors ~ response.data:",
        response.data
      );
      dispatch({
        type: "FETCH_VENUES",
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: "VENUES_REJECTED",
        payload: error.response,
      });
    }
  };

export const GetVenues = (page) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROXY}/venueuser/getall`, {
      type: "Venue",
      page,
      isAdmin: true,
    });
    console.log(
      "🚀 ~ file: HomeActions.js:46 ~ GetVenues ~ response :",
      response
    );

    dispatch({
      type: "FETCH_VENUES",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "VENUES_REJECTED",
      payload: error.response,
    });
  }
};

export const GetBlogs = () => async (dispatch) => {
  try {
    const response = await axios.get(`${PROXY}/blog/getAll`);

    console.log("blogs:", response.data);

    dispatch({
      type: "FETCH_BLOGS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "Blogs_REJECTED",
      payload: error.response,
    });
  }
};

export const GetReadWedding = () => async (dispatch) => {
  try {
    const response = await axios.get(`${PROXY}/admin/alladminUpload/all`, {});

    dispatch({
      type: "FETCH_REAL_WEDDING",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "REAL_WEDDING_REJECTED",
      payload: error.response,
    });
  }
};
