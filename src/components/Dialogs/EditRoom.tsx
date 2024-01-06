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

type Props = {
    roomData: Hotelroom
}

type FormValues = {
    roomNumber: number
    roomSize: number
    minibar: boolean
}

const EditRoom = ({ roomData }: Props) => {

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const [updateHotelRoomByRoomNumber, { data, error, isLoading }] = useUpdateHotelRoomByRoomNumberMutation()

    const schema = yup.object().shape({
        roomNumber: yup.number().required(),
        roomSize: yup.string().required(),
        minibar: yup.boolean().required()
    })

    const { register, handleSubmit, control, getValues, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        values: {
            roomNumber: roomData.roomNumber,
            roomSize: roomData.roomSize.id.toString(),
            minibar: roomData.miniBar
        }
    })

    const onSubmit = async (data: any) => {
        setLoading(true)
        updateHotelRoomByRoomNumber({
            initialRoomNumber: roomData.roomNumber,
            roomNumber: data.roomNumber,
            roomSize: parseInt(data.roomSize),
            miniBar: data.minibar
        }).then((res) => {
            setLoading(false)
            toast.success("Zimmer erfolgreich bearbeitet")
            setOpen(false)
        }).catch((err) => {
            setLoading(false)
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
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Zimmernummer
                        </Label>
                        <Controller
                            name="roomNumber"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} type='number' id="name" className="col-span-3" />
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Minibar
                        </Label>
                        <Controller
                            name="minibar"
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