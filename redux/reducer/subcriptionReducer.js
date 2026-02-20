/* eslint-disable default-case */

let initialState = {
    loading: false,
    subscriptions: [],
};

const subcriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_SUBSCRIPTION":
            return {
                ...state,
                loading: true,
            };
            break;
        case "ADD_SUBSCRIPTION_SUCCESS":
            return {
                ...state,
                subscriptions: action.payload,
                loading: false,
            };
            break;

        case "ADD_SUBSCRIPTION_FAILURE":
            return {
                ...state,
                loading: false,
            };
            break;
        case "GET_SUBSCRIPTION":
            return {
                ...state,
                loading: true,
            };
            break;
        case "GET_SUBSCRIPTION_SUCCESS":
            return {
                ...state,
                subscriptions: action.payload,
                loading: false,
            };
            break;

        case "GET_SUBSCRIPTION_FAILURE":
            return {
                ...state,
                subscriptions: action.payload.data,
                loading: false,
            };
            break;
    }
    return state;
};

export default subcriptionReducer;
