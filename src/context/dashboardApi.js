import { api } from "./api";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: (month) => "/dashboard?month=" +  month,
      providesTags: [""],
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
