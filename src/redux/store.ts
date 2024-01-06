import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { apiSlice } from './api/apiSlice'
import hotelRoomSliceReducer from './slices/hotelRoomSlice'
import roomSizeSliceReducer from './slices/roomSizeSlice'

type Props = {}

export const store = configureStore({
    reducer: {
     hotelRoom: hotelRoomSliceReducer,
     roomSize: roomSizeSliceReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    })

    export type RootState = ReturnType<typeof store.getState>