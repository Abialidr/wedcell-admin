let initialState = {
  errors: {},
  realWedding: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {

    // get vendors --------------------

    case "VENDORS":
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case "FETCH_VENDORS":
      return {
        ...state,
        vendors: action.payload.data,
      };

    // case "VENDORS_REJECTED":
    //   state = {
    //     ...state,
    //     loading: false,
    //     errors: action.payload,
    //   };
    //   break;

    // get venue --------------------

    case "VENUES":
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case "FETCH_VENUES":
      return {
        ...state,
        venues: action.payload.data,
      };

    // case "VENUES_REJECTED":
    //   state = {
    //     ...state,
    //     loading: false,
    //     errors: action.payload,
    //   };
    //   break;

    case "BLOGS":
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case "FETCH_BLOGS":
      return {
        ...state,
        blogs: action.payload.data,
      };

    case "REAL_WEDDING":
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case "FETCH_REAL_WEDDING":
      return {
        ...state,
        realWedding: action.payload,
      };
    case "REAL_WEDDING_REJECTED":
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default homeReducer;
