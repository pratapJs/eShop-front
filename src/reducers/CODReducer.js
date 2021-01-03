import { COD } from "../actions/actionTypes";

export const CODReducer = (state = false, action) => {
	switch (action.type) {
		case COD:
			return action.payload;
		default:
			return state;
	}
};
