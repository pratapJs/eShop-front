import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducers";
import { searchReducer } from "./reducers/searchReducers";
import { cartReducer } from "./reducers/cartReducers";
import { drawerReducer } from "./reducers/drawerReducer";
import { couponReducer } from "./reducers/couponReducer";
import { CODReducer } from "./reducers/CODReducer";
import reduxThunk from "redux-thunk";

const rootReducer = combineReducers({
	user: userReducer,
	search: searchReducer,
	cart: cartReducer,
	drawer: drawerReducer,
	coupon: couponReducer,
	COD: CODReducer,
});

/* const userInfoFromStorage = localStorage.getItem("emailForRegistration")
	? JSON.parse(localStorage.getItem("emailForRegistration"))
	: null;

const initialState = {
	user: { userInfo: userInfoFromStorage },
};
 */
const middleware = [reduxThunk];
const store = createStore(
	rootReducer,

	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
