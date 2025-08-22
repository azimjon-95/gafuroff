import { api } from "./api";

export const choosedRoomServicesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    assignRoomServices: builder.mutation({
      query: (data) => ({
        url: "/room-services/assign",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ChoosedRoomServices"],
    }),

    getPatientServices: builder.query({
      query: (patientId) => `/room-services/${patientId}`,
      providesTags: ["ChoosedRoomServices"],
    }),

    markTreatmentDone: builder.mutation({
      query: (data) => ({
        url: "/room-services/mark",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ChoosedRoomServices"],
    }),
    updateChoosedServices: builder.mutation({
      query: (data) => ({
        url: "/room-services/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ChoosedRoomServices"],
    }),

    getPatientServicesByPatientId: builder.query({
      query: (patientId) => `/room-services/patient/${patientId}`,
      providesTags: ["ChoosedRoomServices"],
    }),

    getUnassignedPatients: builder.query({
      query: () => `/room-services/unassigned`,
      providesTags: ["ChoosedRoomServices"],
    }),

    // /room-services-story/:patientId
    getRoomServicesStory: builder.query({
      query: (patientId) => `/room-services-story/${patientId}`,
      providesTags: ["ChoosedRoomServices"],
    }),

    markTreatmentDoneByStoryId: builder.mutation({
      query: (data) => ({
        url: "/room-services-story/mark",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ChoosedRoomServices"],
    }),
  }),
});

export const {
  useAssignRoomServicesMutation,
  useGetPatientServicesQuery,
  useMarkTreatmentDoneMutation,
  useUpdateChoosedServicesMutation,
  useGetPatientServicesByPatientIdQuery,
  useGetUnassignedPatientsQuery,
  useGetRoomServicesStoryQuery, // <-- shu functionni export qildim
  useMarkTreatmentDoneByStoryIdMutation,
} = choosedRoomServicesApi;
