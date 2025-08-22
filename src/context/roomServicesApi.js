import { api } from "./api";

export const roomServicesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoomServices: builder.query({
      query: () => ({
        url: "/roomservices/all",
        method: "GET",
      }),
      providesTags: ["RoomServices"],
    }),
    createRoomServices: builder.mutation({
      query: (data) => ({
        url: "/roomservices/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["RoomServices"],
    }),
    updateRoomServices: builder.mutation({
      query: ({ id, data }) => ({
        url: `/roomservices/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["RoomServices"],
    }),

    deleteRoomServices: builder.mutation({
      query: (id) => ({
        url: `/roomservices/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RoomServices"],
    }),
  }),
});

export const {
  useGetRoomServicesQuery,
  useCreateRoomServicesMutation,
  useUpdateRoomServicesMutation,
  useDeleteRoomServicesMutation,
} = roomServicesApi;
