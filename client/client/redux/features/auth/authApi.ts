import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

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
        })
    }),
})

export const { useActivationMutation, useRegisterMutation } = authApi;