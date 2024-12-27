import { createStore } from "redux";
import reducer from "../reducers/reducer";

// Create the Redux store
const store = createStore(reducer);

export default store;
