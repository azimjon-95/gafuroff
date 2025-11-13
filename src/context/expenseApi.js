import { api } from "./api";

export const expenseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createExpense: builder.mutation({
      query: (expense) => ({
        url: "/expense/create",
        method: "POST",
        body: expense,
      }),
      invalidatesTags: ["Expenses"],
    }),
    getExpenses: builder.query(
      {
        query: () => "/expense/all",
      },
      {
        providesTags: ["Expenses"],
      }
    ),

    updateExpense: builder.mutation({
      query: ({ id, expense }) => ({
        url: `/expense/update/${id}`,
        method: "PUT",
        body: expense,
      }),
      invalidatesTags: ["Expenses"],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expense/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenses"],
    }),
  }),
});

export const {
  useCreateExpenseMutation,
  useGetExpensesQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
