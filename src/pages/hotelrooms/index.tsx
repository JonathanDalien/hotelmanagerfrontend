import AddRoom from '@/components/Dialogs/AddRoom'
import { columns } from '@/components/roomtable/columns'
import { DataTable } from '@/components/roomtable/data-table'
import RoomSizeSelectComponent from '@/components/select/RoomSizeSelectComponent'
import WithMiniBarSelectComponent from '@/components/select/WithMiniBarSelectComponent'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import RootLayout from '@/layout'
import { setRoomNumberFilter, setWhithMinibarFilter, useGetHotelRoomsQuery } from '@/redux/slices/hotelRoomSlice'
import { RootState } from '@/redux/store'
import { Hotelroom } from '@/types/types'
import { CheckedState } from '@radix-ui/react-checkbox'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {}

//page for the hotelrooms
const Hotelrooms = (props: Props) => {

    //withMinibar, roomSizeIds and roomNumber state from redux store. is used for the query
    const withMinibar = useSelector((state: RootState) => state.hotelRoom.filters.withMinibar)
    const roomSizeIds = useSelector((state: RootState) => state.hotelRoom.filters.roomSizeIds)
    const roomNumber = useSelector((state: RootState) => state.hotelRoom.filters.roomNumber)

    const dispatch = useDispatch();

    //query for hotelrooms with the filters from the redux store
    const { data } = useGetHotelRoomsQuery({
        withMinibar: withMinibar,
        roomSizeIds: roomSizeIds,
        roomNumber: roomNumber
    })

    return (
        <div className='p-10 '>
            <div className='mb-2'>
                {/* Button to open add room dialog */}
                <AddRoom />
            </div>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2 mb-2'>
                    {/* Select dropdown to filter rooms with minibar */}
                    <RoomSizeSelectComponent />
                    <WithMiniBarSelectComponent />
                </div>
                <Input
                    className='w-1/12'
                    type='number'
                    placeholder='Zimmernummer suchen'
                    value={roomNumber}
                    onChange={(e) => {
                        if (parseInt(e.target.value) > 0 || e.target.value === '')
                            dispatch(setRoomNumberFilter(e.target.value))
                    }}
                />
            </div>
            <DataTable columns={columns} data={data || []} />
        </div>
    )
}

export default Hotelrooms

//Layout for the page
Hotelrooms.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <div className=''>
            <RootLayout>
                {page}
            </RootLayout>
        </div >
    )
}