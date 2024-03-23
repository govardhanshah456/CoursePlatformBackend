import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadVideo: builder.mutation({
            query: (files) => ({
                url: "upload-video",
                method: "POST",
                body: { files },
                credentials: "include" as const,
                headers: {
                    'Content-type': "multipart/form-data"
                },
            }),
            async onQueryStarted(data, { queryFulfilled, dispatch }) {
                try {
                    const url = data.url
                    return url;
                } catch (error) {
                    console.log(error)
                }
            }
        }),
    })
})
export const { useUploadVideoMutation } = courseApi