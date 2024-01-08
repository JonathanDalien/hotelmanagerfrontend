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
import { Controller, FieldValue, set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Hotelroom, } from '@/types/types'
import { Switch } from '../ui/switch'
import { useAddHotelRoomMutation } from '@/redux/slices/hotelRoomSlice'
import toast from 'react-hot-toast'

type Props = {
}

type FieldValues = {
    roomNumber: number
    roomSize: string
    miniBar: boolean
}

const AddRoom = ({ }: Props) => {

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const [addHotelRoomMutation, { data, error, isLoading }] = useAddHotelRoomMutation()
    const schema = yup.object().shape({
        roomNumber: yup.number().required("Zimmernummer ist erforderlich"),
        roomSize: yup.string().required("Zimmergröße ist erforderlich"),
        miniBar: yup.boolean().required("Minibar ist erforderlich")
    })


    const { register, handleSubmit, control, getValues, setValue, reset, formState: { errors } } = useForm<FieldValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            roomNumber: undefined,
            roomSize: undefined,
            miniBar: false,

        }
    })

    const onSubmit = async (data: any) => {
        try {
            await addHotelRoomMutation(data).unwrap()
            toast.success('Zimmer wurde erfolgreich hinzugefügt')
            setOpen(false)
        } catch (error) {
            toast.error('Zimmer konnte nicht hinzugefügt werden. Möglichweise existiert bereits ein Zimmer mit dieser Zimmernummer.')
        }
    }




    return (
        <Dialog open={open} onOpenChange={(e) => {
            reset()
            setOpen(e)
        }}>
            <DialogTrigger asChild>
                <Button className='bg-green-200 text-black hover:bg-green-100'>Neues Zimmer</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl]">
                <DialogHeader>
                    <DialogTitle>Zimmer hinzufügen</DialogTitle>
                    <DialogDescription>
                        Füllen Sie das Formular aus um ein neues Zimmer hinzuzufügen.
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

export default AddRoom