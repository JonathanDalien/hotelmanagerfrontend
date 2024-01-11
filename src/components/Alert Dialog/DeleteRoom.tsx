import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteHotelRoomByIdMutation } from '@/redux/slices/hotelRoomSlice'
import toast from 'react-hot-toast'

type Props = {
    id: number
    onSucces?: () => void
}

// alert dialog to delete a hotelroom
const DeleteRoom = ({ id, onSucces }: Props) => {

    //mutation to delete a hotelroom by id
    const [deleteHotelRoomById, { data, error, isLoading }] = useDeleteHotelRoomByIdMutation()

    //handle delete function
    const handleDelete = async () => {
        try {
            await deleteHotelRoomById(id).unwrap()
            toast.success('Zimmer erfolgreich gelöscht')
            onSucces && onSucces()

        } catch (error) {
            toast.error('Fehler beim Löschen')
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className=' bg-red-100 p-2 rounded-md hover:bg-red-200'>Löschen</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Sind Sie sich sicher?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Diese Aktion kann nicht rückgängig gemacht werden.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                        handleDelete()
                    }}>Fortfahren</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteRoom