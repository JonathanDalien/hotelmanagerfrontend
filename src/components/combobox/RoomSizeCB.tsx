import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useGetRoomSizesQuery } from "@/redux/slices/roomSizeSlice"
import { useSelector } from "react-redux"
import { RootState } from '@/redux/store'
import { UseFormSetValue } from "react-hook-form"

interface props {
    value: string | null
    onChange: (...event: any[]) => void
    setValue: UseFormSetValue<{
        roomNumber: number;
        roomSize: string;
        minibar: boolean;
    }>


}

export function RoomSizeCB({ value, setValue, onChange }: props) {
    const [open, setOpen] = React.useState(false)

    console.log(value)

    const { } = useGetRoomSizesQuery()

    const roomSizes = useSelector((state: RootState) => state.roomSize.roomSizeOptions)


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" w-full justify-between "
                >
                    {value
                        ? roomSizes.find((roomSize) => roomSize.value.toString() === value)?.label
                        : "Zimmergröße auswählen..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0 PopoverContent">
                <Command className="">
                    <CommandGroup>
                        {roomSizes.map((roomSize) => {
                            return (
                                < CommandItem
                                    key={roomSize.value}
                                    value={roomSize.value.toString()}
                                    onSelect={(currentValue) => {
                                        const selectedRoomSize = roomSizes.find(roomSize => roomSize.value.toString() === currentValue);
                                        // setValue("roomSize", selectedRoomSize?.value.toString());
                                        onChange(selectedRoomSize?.value.toString())
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === roomSize.value.toString() ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {roomSize.label}
                                </CommandItem>
                            )
                        }

                        )}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover >
    )
}
