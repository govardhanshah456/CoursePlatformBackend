import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: "",
    user: ""
}

const authSlice: any = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action) => {
            state.token = action.payload.token
        },
        userLoggedIn: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
        },
        userLogout: (state) => {
            state.token = ""
            state.user = ""
        }
    }
})

export const { userRegistration, userLoggedIn, userLogout } = authSlice.actions
export default authSlice.reducer