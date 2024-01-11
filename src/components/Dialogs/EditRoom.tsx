import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RoomSizeCB } from '../combobox/RoomSizeCB'
import * as yup from 'yup'
import { Controller, set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Hotelroom, } from '@/types/types'
import { Switch } from '../ui/switch'
import { useUpdateHotelRoomByRoomNumberMutation } from '@/redux/slices/hotelRoomSlice'
import toast from 'react-hot-toast'
import { hotelRoomSchema } from '../schemas/HotelRoomSchema'

type Props = {
    roomData: Hotelroom
}


type FieldValues = {
    roomNumber: number
    roomSize: string
    miniBar: boolean
}

// dialog to edit a hotelroom
const EditRoom = ({ roomData }: Props) => {

    // open state for the dialog
    const [open, setOpen] = useState(false)

    // mutation to update a hotelroom
    const [updateHotelRoomByRoomNumber, { data, error, isLoading }] = useUpdateHotelRoomByRoomNumberMutation()



    // react hook form
    const { register, handleSubmit, control, getValues, setValue, formState: { errors } } = useForm<FieldValues>({
        resolver: yupResolver(hotelRoomSchema),
        values: {
            roomNumber: roomData.roomNumber,
            roomSize: roomData.roomSize.id.toString(),
            miniBar: roomData.miniBar
        }
    })

    // handle submit function
    const onSubmit = async (data: any) => {
        updateHotelRoomByRoomNumber({
            initialRoomNumber: roomData.roomNumber,
            roomNumber: data.roomNumber,
            roomSize: parseInt(data.roomSize),
            miniBar: data.miniBar
        }).unwrap().then((res) => {
            toast.success("Zimmer erfolgreich bearbeitet")
            setOpen(false)
        }).catch((err) => {
            toast.error("Fehler beim bearbeiten des Zimmers")
            console.log(err)
        })
    }



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>Bearbeiten</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl]">
                <DialogHeader>
                    <DialogTitle>Zimmer bearbeiten</DialogTitle>
                    <DialogDescription>
                        Bearbeiten Sie hier die Daten des Zimmers. Klicken Sie auf "Speichern", um die Änderungen zu übernehmen.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid  py-4">
                    <div className="grid grid-cols-4  items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Zimmernummer
                        </Label>
                        <Controller
                            name="roomNumber"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type='number' id="name" className="col-span-3" placeholder='Zimmernummer' />
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-4 mb-4 items-center gap-4">

                        <div className='col-span-3 col-start-2'>
                            <p className='text-xs text-red-500'>{errors.roomNumber?.message}</p>

                        </div>
                    </div>
                    <div className="grid grid-cols-4  items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Zimmergröße
                        </Label>
                        <div className='col-span-3'>
                            <Controller
                                name="roomSize"
                                control={control}
                                render={({ field }) => (
                                    <RoomSizeCB value={field.value} setValue={setValue} onChange={field.onChange} />
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 mb-4 items-center gap-4">

                        <div className='col-span-3 col-start-2'>
                            <p className='text-xs text-red-500'>{errors.roomSize?.message}</p>

                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Minibar
                        </Label>
                        <Controller
                            name="miniBar"
                            control={control}
                            render={({ field }) => (
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            )}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => {
                        handleSubmit(onSubmit)()
                    }} type="submit">Speichern</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditRoom