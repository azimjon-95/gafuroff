import { api } from './api'; // Assuming api is defined elsewhere

export const todaysApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTodays: builder.query({
            query: ({ date, view }) => {
                const params = new URLSearchParams();

                if (date) params.append("date", date);

                if (view && view !== "all") params.append("view", view);

                return `/story/todays?${params.toString()}`;
            },
            providesTags: () => [{ type: "Stories", id: "LIST" }],
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