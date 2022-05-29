import { useSelector } from "react-redux";
import { authSelector } from "../redux/modules/auth/action";
import { localStorageKey } from "./localStorageKey";

export const useAuthToken = () => {
	const { 
		data: accessToken,
		resetPasswordToken,
		email,
		isAuth,
		role
	} = useSelector(authSelector);

	return {
		getIsAuth: () => (isAuth || JSON.parse(localStorage.getItem(localStorageKey.IS_AUTH))),
		getAccessToken: () => {
			return accessToken ?? localStorage.getItem(localStorageKey.ACCESS_TOKEN);
		},
		getRole: () => {
			return role ?? localStorage.getItem(localStorageKey.ROLE);
		},
		getUserName: () => {
			return email ?? localStorage.getItem(localStorageKey.EMAIL);
		},
		getUserId: () => {
			return localStorage.getItem(localStorageKey.USER_ID);
		},
		getResetPasswordToken: () => {
			return resetPasswordToken ?? localStorage.getItem(localStorageKey.RESET_PASSWORD_TOKEN);
		}
	}
}