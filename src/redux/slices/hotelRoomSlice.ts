import { AddHotelRoomBody, HotelRoomBody, Hotelroom } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";


type HotelRoomState = {
    hotelRooms: Hotelroom[]
}

const initialState: HotelRoomState = {
    hotelRooms: []
}

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHotelRooms: builder.query<Hotelroom[], void>({
            query: () => ({
                url: '/hotelrooms',
                method: 'GET'
            }),
            providesTags: ['HotelRooms']
        }),
        getHotelRoomById: builder.query<Hotelroom, number>({
            query: (id) =>({
                url: `/hotelroom/${id}`,
                method: 'GET'
            }),
            providesTags: ['HotelRoom']
        }),
        getHotelRoomByRoomNumber: builder.query<Hotelroom, number>({
            query: (roomNumber) => ({
                url: `/hotelroom/roomnumber/${roomNumber}`,
                method: 'GET'
            }),
            providesTags: ['HotelRoom']
        }),
        addHotelRoom: builder.mutation<Hotelroom, AddHotelRoomBody>({
            query: (body) => ({
                url: '/hotelroom',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['HotelRoom', 'HotelRooms']
        }),
        updateHotelRoomById: builder.mutation<HotelRoomBody, Hotelroom>({
            query: ({id, ...body}) => ({
                url: `/hotelroom/${id}`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['HotelRoom', 'HotelRooms']
        }),
        updateHotelRoomByRoomNumber: builder.mutation<Hotelroom, HotelRoomBody>({
            query: ({initialRoomNumber, ...body}) => ({
                url: `/hotelroom/roomnumber/${initialRoomNumber}`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['HotelRoom', 'HotelRooms']
        }),
        deleteHotelRoomById: builder.mutation<void, number>({
            query: (id) => ({
                url: `/hotelroom/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['HotelRoom', 'HotelRooms']
        }),

    })
})

export const hotelRoomSlice = createSlice({
    name: 'hotelRoom',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(extendedApiSlice.endpoints.getHotelRooms.matchFulfilled, (state, action) => {
            state.hotelRooms = action.payload
        })}
})

export default hotelRoomSlice.reducer

export const {
    useGetHotelRoomsQuery,
    useGetHotelRoomByIdQuery,
    useGetHotelRoomByRoomNumberQuery,
    useUpdateHotelRoomByIdMutation,
    useUpdateHotelRoomByRoomNumberMutation,
    useDeleteHotelRoomByIdMutation,
    useAddHotelRoomMutation
} = extendedApiSlice