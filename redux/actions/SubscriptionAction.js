import axios from "axios";

import { PROXY } from '../../config'

export const addSubscriptions = (payload) => async (dispatch) => {
    try {
        dispatch({
            type: "ADD_SUBSCRIPTION",
        });

        const response = await axios.post(`${PROXY}/subscription`, payload);

        dispatch({
            type: "ADD_SUBSCRIPTION_SUCCESS",
            payload: response.data,
        });

    } catch (error) {
        console.log(error.message);
        dispatch({
            type: "ADD_SUBSCRIPTION_FAILURE",
        });

    }
};
export const getSubscriptions = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "GET_SUBSCRIPTION",
        });
        const response = await axios.get(`${PROXY}/subscription`);
        dispatch({
            type: "GET_SUBSCRIPTION_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: "GET_SUBSCRIPTION_FAILURE",
        });

    }
};
