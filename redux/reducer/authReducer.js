/* eslint-disable default-case */

let initialState = {
  loading: false,
  isAuthenticated: false,
  errors: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      state = {
        ...state,
        loading: true,
        errors: {},
      };
      break;
    case "LOGIN_FULFILLED":
      state = {
        ...state,
        auth: action.payload.data,
        isAuthenticated: true,
        loading: false,
      };
      
      localStorage.setItem("wedcell", JSON.stringify(action.payload.data));
      break;

    case "LOGIN_REJECTED":
      if (action.payload.status === 422) {
        state = {
          ...state,
          errors: action.payload.data.errors,
          loading: false,
        };
      } else {
        state = {
          ...state,
          errors: action.payload.data,
          loading: false,
        };
      }
      break;
  }
  return state;
};

export default authReducer;
