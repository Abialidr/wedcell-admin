import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer/rootReducer";
import { createWrapper } from "next-redux-wrapper";

const middleware = [thunk]


export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)


const makeStore = () => store



export const wrappper = () => createWrapper(makeStore)