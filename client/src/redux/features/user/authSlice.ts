import { createSlice } from "@reduxjs/toolkit";

interface User {
    _id: string
    name: string
    email: string
}

interface AuthState {
    user: User | null
    isLoggedIn: boolean
}

const initialState: AuthState = {
    user: (() => {
        const data = sessionStorage.getItem('user')
        try {
            return data ? JSON.parse(data) : null
        } catch {
            return null
        }
    })(),   //Immediately invoke arrow function

    isLoggedIn: !!sessionStorage.getItem('token')
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { user, token } = action.payload
            state.user = user;
            state.isLoggedIn = true;

            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('token', token)
        },
        logOut: (state) => {
            state.user = null;
            state.isLoggedIn = false;

            sessionStorage.clear()
        }
    }
})
export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer