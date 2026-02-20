import axios from "axios";

import { PROXY } from '../../config'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN",
    });

    const response = await axios.post(`${PROXY}/users/adminlogin`, {
      email,
      password,
    });

    dispatch({
      type: "LOGIN_FULFILLED",
      payload: response.data,
    });

  } catch (error) {

    dispatch({
      type: "LOGIN_REJECTED",
      payload: error.response,
    });

  }
};
