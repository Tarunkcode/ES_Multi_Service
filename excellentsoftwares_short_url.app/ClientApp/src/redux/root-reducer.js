// this file pulls in all reducers that we have this would be base reducer file
// actual base reducer object that represent all of the state in our application
import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";



export default combineReducers({
    user: userReducer
});
