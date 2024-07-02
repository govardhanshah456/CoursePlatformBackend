import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update-avatar",
                method: "PUT",
                body: { avatar },
                credentials: "include" as const
            })
        }),
        editProfile: builder.mutation({
            query: ({ name, email }) => ({
                url: "update-user-info",
                method: "PUT",
                body: { name, email },
                credentials: "include" as const
            })
        }),
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "update-password",
                method: "PUT",
                body: {
                    oldPassword,
                    newPassword
                },
                credentials: "include" as const
            })
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "get-all-users",
                method: "GET",
                credentials: "include" as const
            })
        }),
        updateUserRole: builder.mutation({
            query: ({ email, id, role }) => ({
                url: "update-user",
                method: "POST",
                body: { email, id, role },
                credentials: "include" as const
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `update-user/${id}`,
                method: "DELETE",
                credentials: "include" as const
            })
        })
    })
})
export const { useUpdatePasswordMutation, useGetAllUsersQuery, useUpdateAvatarMutation, useEditProfileMutation, useUpdateUserRoleMutation, useDeleteUserMutation } = userApi