import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

// Bazaviy query — token bilan avtomatik headerga qo‘shiladi
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8040/api", // API bazaviy manzili
  // baseUrl: "https://medme-b-test.medme.uz/api", // API bazaviy manzili
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Diqqat: ko‘p API-larda "Authorization" bo‘ladi, sizda "authentication" bo‘lsa ham, tekshiring
    }
    return headers;
  },
});

// Retry bilan o‘rash — 2 marta qayta urinish imkoniyati
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

// RTK Query API obyektini yaratish
export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: [
    "Workers",
    "DoctorPatientsStory",
    "PatientStory",
    "PatientsStory",
    "Potsents",
    "Room",
    "Expenses",
    "Stories",
    "PatientDoctorStory",
    "DoctorStories",
    "RoomServices",
  ], // kerakli taglar
  endpoints: () => ({}), // endpointlar keyinchalik qo‘shiladi
});
