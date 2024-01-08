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



function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function RoomSizeSelectComponent() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [selectedOptions, setSelectedOptions] = React.useState<number[]>([]);

    const roomSizeIds = useSelector((state: RootState) => state.hotelRoom.filters.roomSizeIds)

    const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
        const {
            target: { value },
        } = event;
        // setSelectedOptions(
        //     // On autofill we get a stringified value.
        //     typeof value === 'string' ? value.split(',') : value,
        // );

        dispatch(setRoomSizeFilter(value))

    };

    const { } = useGetRoomSizesQuery()


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
                            style={getStyles(name.label, roomSizeIds, theme)}
                        >
                            {name.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}