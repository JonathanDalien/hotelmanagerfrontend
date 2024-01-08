import { AddHotelRoomBody, HotelRoomBody, Hotelroom, HotelroomTable } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

type HotelRoomFilters = {
    withMinibar?: boolean[]
    roomSizeIds?: number[]
}

//Typ definieren für den State
type HotelRoomState = {
    filters: HotelRoomFilters
}

//Initial State definieren
const initialState: HotelRoomState = {
    filters: {
        withMinibar: [],
        roomSizeIds: []
    }
}

//endpoints definieren für die API
export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //Api-Call für Hotelrooms
        getHotelRooms: builder.query<Hotelroom[], { withMinibar?: boolean[], roomSizeIds?: number[] }>({
            query: ({ withMinibar, roomSizeIds }) => {
                return {
                    url: `/hotelrooms`,
                    params: { withMinibar, roomSizeIds },
                    method: 'GET'
                };
            },
            providesTags: ['HotelRooms']
        }),
        //Api-Call für Hotelroom mit bestimmter ID
        getHotelRoomById: builder.query<Hotelroom, number>({
            query: (id) => ({
                url: `/hotelroom/${id}`,
                method: 'GET'
            }),
            providesTags: ['HotelRoom']
        }),
        //Api-Call für Hotelroom mit bestimmter RoomNumber
        getHotelRoomByRoomNumber: builder.query<Hotelroom, number>({
            query: (roomNumber) => ({
                url: `/hotelroom/roomnumber/${roomNumber}`,
                method: 'GET'
            }),
            providesTags: ['HotelRoom']
        }),
        //Api-Call zum Hinzufügen eines Hotelrooms
        addHotelRoom: builder.mutation<Hotelroom, AddHotelRoomBody>({
            query: (body) => ({
                url: '/hotelroom',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['HotelRoom', 'HotelRooms']
        }),
        //Api-Call zum Updaten eines Hotelrooms mit bestimmter ID
        updateHotelRoomById: builder.mutation<HotelRoomBody, Hotelroom>({
            query: ({ id, ...body }) => ({
                url: `/hotelroom/${id}`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['HotelRoom', 'HotelRooms']
        }),
        //Api-Call zum Updaten eines Hotelrooms mit bestimmter RoomNumber
        updateHotelRoomByRoomNumber: builder.mutation<Hotelroom, HotelRoomBody>({
            query: ({ initialRoomNumber, ...body }) => ({
                url: `/hotelroom/roomnumber/${initialRoomNumber}`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['HotelRoom', 'HotelRooms']
        }),
        //Api-Call zum Löschen eines Hotelrooms mit bestimmter ID
        deleteHotelRoomById: builder.mutation<void, number>({
            query: (id) => ({
                url: `/hotelroom/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['HotelRoom', 'HotelRooms']
        }),

    })
})

//Slice definieren
export const hotelRoomSlice = createSlice({
    name: 'hotelRoom',
    initialState,
    reducers: {
        setWhithMinibarFilter: (state, action) => {
            state.filters.withMinibar = action.payload
        },
        setRoomSizeFilter: (state, action) => {
            state.filters.roomSizeIds = action.payload
        }
    },
})

export default hotelRoomSlice.reducer

export const { setWhithMinibarFilter, setRoomSizeFilter } = hotelRoomSlice.actions;

export const {
    useGetHotelRoomsQuery,
    useGetHotelRoomByIdQuery,
    useGetHotelRoomByRoomNumberQuery,
    useUpdateHotelRoomByIdMutation,
    useUpdateHotelRoomByRoomNumberMutation,
    useDeleteHotelRoomByIdMutation,
    useAddHotelRoomMutation
} = extendedApiSlice