import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ["HotelRooms", "HotelRoom"],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api', mode: 'cors' }),
    endpoints: (builder) => ({})
})

export const { } = apiSlice