import ThemeOptions from "./ThemeOptions";
import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import backdrops from "./backdrops";
import account from "./account";
import taxpro from "./taxpro"; // Import the taxpro reducer
import transcript from "./tranScript";
const reducers = combineReducers({
  auth,
  message,
  backdrops,
  ThemeOptions,
  account,
  taxpro,
  transcript,
});

export default reducers;
