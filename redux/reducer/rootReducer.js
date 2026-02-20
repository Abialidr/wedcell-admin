import { combineReducers } from "redux";
import authReducer from "./authReducer";
import homeReducer from "./homeReducer";
import subcriptionReducer from "./subcriptionReducer";

const rootReducer = combineReducers({
  authReducer,
  homeReducer,
  subcriptionReducer
});

export default rootReducer;
