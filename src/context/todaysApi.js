import { api } from './api'; // Assuming api is defined elsewhere

export const todaysApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTodays: builder.query({
            query: () => '/story/todays',
            providesTags: () => [{ type: 'Stories', id: 'LIST' }],
        }),
        deleteUnconfirmedAppointments: builder.mutation({
            query: () => ({
                url: "/patients/unconfirmed",
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetAllTodaysQuery,
    useDeleteUnconfirmedAppointmentsMutation
} = todaysApi;