import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLogout, userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
}

type RegistrationData = {}
export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(data, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        activation: builder.mutation({
            query: ({ token, activationCode }) => ({
                url: "activate-user",
                method: "POST",
                body: {
                    token,
                    activationCode
                },
            })
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "login",
                method: "POST",
                body: {
                    email,
                    password
                },
                credentials: "include" as const
            }),
            async onQueryStarted(data, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    console.log(result)
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        logout: builder.query({
            query: () => ({
                url: "logout",
                method: "GET",
                credentials: "include" as const
            }),
            async onQueryStarted(data, { queryFulfilled, dispatch }) {
                try {
                    dispatch(
                        userLogout()
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }),
})

export const { useLoginMutation, useLogoutQuery
    , useActivationMutation, useRegisterMutation } = authApi;