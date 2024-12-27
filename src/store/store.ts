import { createStore } from "redux";
import reducer from "../reducers/reducer";

const store = createStore(reducer);
export type AppState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
