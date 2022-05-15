import axiosInstance from "../axiosInstance";
import { FETCH_PROFILE, LOGIN, LOGOUT } from "../constants/actionTypes";
import { clearToken, handleError, setToken } from "../helper";

export function login(email, password) {
    return async dispatch => {
        try {
            dispatch({ type: LOGIN, payload: { inProgress: true } });
            const response = await axiosInstance.post('/api/auth/login', { email, password })
            setToken(response.data.data.token)
            dispatch({ type: LOGIN, payload: { inProgress: false, user: response.data.data } });
        } catch (e) {
            dispatch({ type: LOGIN, payload: { errors: handleError(e) } });
            throw new Error(e)
        }
    }
}

export function fetchUser() {
    return async dispatch => {
        try {
            dispatch({ type: FETCH_PROFILE, payload: { inProgress: true } });
            const response = await axiosInstance.get('/api/auth/profile')
            dispatch({ type: FETCH_PROFILE, payload: { inProgress: false, user: response.data.data } });
        } catch (e) {
            dispatch({ type: FETCH_PROFILE, payload: { errors: handleError(e) } });
            throw new Error(e)
        }
    }
}


export function logout() {
    return async dispatch => {
        try {
            dispatch({ type: LOGOUT, payload: { inProgress: true } });
            await axiosInstance.post('/api/auth/logout')
            clearToken();
            dispatch({ type: LOGOUT, payload: {} });
        } catch (e) {
            dispatch({ type: LOGOUT, payload: { errors: handleError(e) } });
            throw new Error(e)
        }
    }
} 