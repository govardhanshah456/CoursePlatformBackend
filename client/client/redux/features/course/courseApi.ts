import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadVideo: builder.mutation({
            query: (file) => ({
                url: "upload-video",
                method: "POST",
                body: file,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${file._boundary}`,
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