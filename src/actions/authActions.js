import { LOGOUT } from "./actionTypes";

export const loggedout = () => async (dispatch) => {
	dispatch({
		type: LOGOUT,
		payload: null,
	});
};
