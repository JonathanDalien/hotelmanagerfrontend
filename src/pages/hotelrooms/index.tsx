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

//page for the hotelrooms
const Hotelrooms = (props: Props) => {

    //withMinibar and roomSizeIds state from redux store. is used for the query
    const withMinibar = useSelector((state: RootState) => state.hotelRoom.filters.withMinibar)
    const roomSizeIds = useSelector((state: RootState) => state.hotelRoom.filters.roomSizeIds)

    //query for hotelrooms with the filters from the redux store
    const { data } = useGetHotelRoomsQuery({
        withMinibar: withMinibar,
        roomSizeIds: roomSizeIds
    })

    return (
        <div className='p-10 '>
            <div className='mb-2'>
                {/* Button to open add room dialog */}
                <AddRoom />
            </div>
            <div className='flex items-center gap-2 mb-2'>
                {/* Select dropdown to filter rooms with minibar */}
                <RoomSizeSelectComponent />
                <WithMiniBarSelectComponent />
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