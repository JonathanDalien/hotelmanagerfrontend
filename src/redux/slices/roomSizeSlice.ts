import { Hotelroom, RoomSize } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

type roomSizeOptions = {
    value: number
    label: string
}

type RoomSizeState = {
    roomSizes: RoomSize[]
    roomSizeOptions: roomSizeOptions[]
}

const initialState: RoomSizeState = {
    roomSizes: [],
    roomSizeOptions: []
}

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRoomSizes: builder.query<RoomSize[], void>({
            query: () => ({
                url: '/roomsizes',
                method: 'GET'
            }),
        }),
    })
})

export const roomSizeSlice = createSlice({
    name: 'roomSize',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(extendedApiSlice.endpoints.getRoomSizes.matchFulfilled, (state, action) => {
            state.roomSizes = action.payload
        }),
            builder.addMatcher(extendedApiSlice.endpoints.getRoomSizes.matchFulfilled, (state, action) => {
                state.roomSizeOptions = action.payload.map((roomSize) => {
                    return {
                        value: roomSize.id,
                        label: roomSize.size
                    }
                })
            })
    }
})


export default roomSizeSlice.reducer

export const {
    useGetRoomSizesQuery,
} = extendedApiSlice

