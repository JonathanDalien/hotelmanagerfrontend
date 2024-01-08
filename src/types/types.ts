export type Hotelroom = {
    id: string
    roomNumber: number
    roomSize: RoomSize
    miniBar: boolean
}

export type HotelroomTable = {
    id: string
    roomNumber: number
    roomSize: string
    miniBar: boolean
}

export type HotelRoomBody = {
    initialRoomNumber: number
    roomNumber: number
    roomSize: number
    miniBar: boolean
}

export type AddHotelRoomBody = {
    roomNumber: number
    roomSize: number
    miniBar: boolean
}

export type RoomSize = {
    id: number
    size: string
}