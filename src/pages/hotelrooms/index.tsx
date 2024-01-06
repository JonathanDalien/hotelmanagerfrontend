import AddRoom from '@/components/Dialogs/AddRoom'
import { columns } from '@/components/roomtable/columns'
import { DataTable } from '@/components/roomtable/data-table'
import { Button } from '@/components/ui/button'
import RootLayout from '@/layout'
import { useGetHotelRoomsQuery } from '@/redux/slices/hotelRoomSlice'
import { RootState } from '@/redux/store'
import { Hotelroom } from '@/types/types'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

type Props = {}


const Hotelrooms = (props: Props) => {

    const { data, error, isLoading } = useGetHotelRoomsQuery()


    const hotelrooms = useSelector((state: RootState) => state.hotelRoom.hotelRooms)

    console.log(hotelrooms)

    return (
        <div className='p-10 '>
            <div className='mb-2'>
                <AddRoom />
            </div>
            <DataTable columns={columns} data={hotelrooms} />
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