import { api } from "./api";

export const potsentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPotsents: builder.query({
      query: () => "/client/all",
      providesTags: ["Potsents"],
    }),
    addPotsents: builder.mutation({
      query: (potsent) => ({
        url: "/client/create",
        method: "POST",
        body: potsent,
      }),
      invalidatesTags: ["Potsents"],
    }),
    updatePotsents: builder.mutation({
      query: ({ id, ...potsent }) => ({
        url: `/client/update/${id}`,
        method: "PUT",
        body: potsent,
      }),
      invalidatesTags: ["Potsents"],
    }),
    deletePotsents: builder.mutation({
      query: (id) => ({
        url: `/client/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Potsents"],
    }),
    getByIdPotsents: builder.mutation({
      query: (id) => ({
        url: `/client/${id}`,
        method: "GET",
      }),
    }),
    // /client/updateBmi/:id
    updateBmiPotsents: builder.mutation({
      query: ({ id, data }) => ({
        url: `/client/updateBmi/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Potsents"],
    }),

    findPatientByPhone: builder.query({
      query: (phone) => `client/findByPhone/${phone}`,
      providesTags: ["Patient"],
    }),
  }),
});

export const {
  useGetPotsentsQuery,
  useAddPotsentsMutation,
  useUpdatePotsentsMutation,
  useDeletePotsentsMutation,
  useGetByIdPotsentsMutation,
  useUpdateBmiPotsentsMutation,
  useLazyFindPatientByPhoneQuery,
} = potsentApi;
