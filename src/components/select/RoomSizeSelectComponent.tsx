import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetRoomSizesQuery } from '@/redux/slices/roomSizeSlice';
import { setRoomSizeFilter } from '@/redux/slices/hotelRoomSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200,
        },
    },
};



function getStyles(name: number, roomSizeIds: (number[] | undefined), theme: Theme) {
    return {
        fontWeight:
            roomSizeIds?.indexOf(name) === -1
                ? "normal"
                : "bold",
    };
}

export default function RoomSizeSelectComponent() {
    const theme = useTheme();
    const dispatch = useDispatch();

    const roomSizeIds = useSelector((state: RootState) => state.hotelRoom.filters.roomSizeIds)

    const handleChange = (event: SelectChangeEvent<typeof roomSizeIds>) => {
        const {
            target: { value },
        } = event;

        dispatch(setRoomSizeFilter(value))

    };

    const { data, } = useGetRoomSizesQuery()


    const roomSizes = useSelector((state: RootState) => state.roomSize.roomSizeOptions)


    return (
        <div>
            <FormControl size='small' sx={{ width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Zimmergröße</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={roomSizeIds}
                    onChange={handleChange}
                    input={<OutlinedInput label="zimmergröße" />}
                    MenuProps={MenuProps}
                >
                    {roomSizes.map((name) => (
                        <MenuItem
                            key={name.value}
                            value={name.value}
                            style={getStyles(name.value, roomSizeIds, theme)}
                        >
                            {name.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}