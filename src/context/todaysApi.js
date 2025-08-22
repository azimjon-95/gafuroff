import { api } from './api'; // Assuming api is defined elsewhere

export const todaysApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTodays: builder.query({
            query: () => '/story/todays',
            providesTags: () => [{ type: 'Stories', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetAllTodaysQuery
} = todaysApi;