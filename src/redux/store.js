import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, createStore } from "redux";
import { userReducer } from "./userRedecer";
const rootReducer = combineReducers({
  users: userReducer,
});
export const store = createStore(rootReducer, composeWithDevTools());
