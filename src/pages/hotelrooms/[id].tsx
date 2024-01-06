"use client";
import { Button } from '@/components/ui/button';
import RootLayout from '@/layout'
import { useGetHotelRoomByIdQuery, useGetHotelRoomByRoomNumberQuery, useGetHotelRoomsQuery } from '@/redux/slices/hotelRoomSlice'
import { useRouter } from 'next/router'
import React from 'react'
import EditRoom from '@/components/Dialogs/EditRoom';
import DeleteRoom from '@/components/Alert Dialog/DeleteRoom';

type Props = {}

const SingleHotelRoom = (props: Props) => {

    const router = useRouter()
    const id = router.query.id as string



    const { data, error, isLoading } = useGetHotelRoomByIdQuery(parseInt(id))
    if (isLoading) return <p>Loading...</p>


    return (
        <>
            {data && (
                <div className='m-10 max-w-xl'>
                    <div className='flex justify-between mb-2'>
                        <p className='text-xl font-bold'>Zimmernummer {data.roomNumber}</p>
                        <div className='flex gap-2'>
                            <EditRoom roomData={data} />
                            <DeleteRoom id={parseInt(data.id)} onSucces={() => {
                                router.push('/hotelrooms')
                            }} />
                        </div>
                    </div>
                    <div className='bg-gray-200 max-w-xl p-5 rounded-md flex flex-col gap-4'>
                        <div className='flex justify-between'>
                            <p>Zimmergröße</p>
                            <p>{data?.roomSize.size}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Minibar</p>
                            <p>{data?.miniBar ? "Ja" : "Nein"}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SingleHotelRoom

SingleHotelRoom.getLayout = function getLayout(page: React.ReactElement) {



    return (
        <div className=''>
            <RootLayout>
                {page}
            </RootLayout>
        </div >
    )
}