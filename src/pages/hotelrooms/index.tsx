import AddRoom from '@/components/Dialogs/AddRoom'
import { columns } from '@/components/roomtable/columns'
import { DataTable } from '@/components/roomtable/data-table'
import RoomSizeSelectComponent from '@/components/select/RoomSizeSelectComponent'
import WithMiniBarSelectComponent from '@/components/select/WithMiniBarSelectComponent'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import RootLayout from '@/layout'
import { setWhithMinibarFilter, useGetHotelRoomsQuery } from '@/redux/slices/hotelRoomSlice'
import { RootState } from '@/redux/store'
import { Hotelroom } from '@/types/types'
import { CheckedState } from '@radix-ui/react-checkbox'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {}


const Hotelrooms = (props: Props) => {


    const withMinibar = useSelector((state: RootState) => state.hotelRoom.filters.withMinibar)
    const roomSizeIds = useSelector((state: RootState) => state.hotelRoom.filters.roomSizeIds)
    const dispatch = useDispatch();


    const { data, error, isLoading, refetch } = useGetHotelRoomsQuery({
        withMinibar: withMinibar,
        roomSizeIds: roomSizeIds
    })


    const handleCheckboxChange = (event: CheckedState) => {
        dispatch(setWhithMinibarFilter(event))
    };



    return (
        <div className='p-10 '>
            <div className='mb-2'>
                {/* Knopf zum hinzufügen eines Zimmers */}
                <AddRoom />
            </div>
            <div className='flex items-center gap-2 mb-2'>
                <RoomSizeSelectComponent />
                <WithMiniBarSelectComponent />
            </div>
            <DataTable columns={columns} data={data || []} />
        </div>
    )
}

export default Hotelrooms

Hotelrooms.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <div className=''>
            <RootLayout>
                {page}
            </RootLayout>
        </div >
    )
}