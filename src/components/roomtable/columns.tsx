
import { Hotelroom } from "@/types/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import DeleteRoom from "../Alert Dialog/DeleteRoom"



export const columns: ColumnDef<Hotelroom>[] = [
    {
        accessorKey: "roomNumber",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Zimmernummer
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "roomSize",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Zimmertyp
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return row.getValue("roomSize").size
        }
    },
    {
        accessorKey: "miniBar",
        header: "Minibar",
        cell: ({ row }) => {
            return row.getValue("miniBar") ? "Ja" : "Nein"
        }
    },
    {
        accessorKey: "function",
        header: () => (<div className="text-end">Funktionen</div>),
        cell: ({ row }) => {
            console.log(row.original)
            return (
                <div className='flex gap-2 justify-end'>
                    <Link href={`hotelrooms/${row.original.id}`} className=' bg-gray-100 p-2 rounded-md hover:bg-gray-200  transition-all'>Details</Link>
                    <DeleteRoom id={parseInt(row.original.id)} />
                </div>
            )
        }
    }
]
