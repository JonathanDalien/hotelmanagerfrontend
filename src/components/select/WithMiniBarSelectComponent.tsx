import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setWhithMinibarFilter } from '@/redux/slices/hotelRoomSlice';

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




function getStyles(name: boolean, options: (boolean[] | undefined), theme: Theme) {
    return {
        fontWeight:
            options?.indexOf(name) === -1
                ? "normal"
                : "bold",
    };
}

const options = [
    { value: true, label: 'Ja', id: 0 },
    { value: false, label: 'Nein', id: 1 },
]



export default function WithMiniBarSelectComponent() {
    const theme = useTheme();
    const dispatch = useDispatch();

    const withMinibar = useSelector((state: RootState) => state.hotelRoom.filters.withMinibar)


    const handleChange = (event: SelectChangeEvent<typeof withMinibar>) => {
        const { target: { value }, } = event;

        dispatch(setWhithMinibarFilter(value))

    };



    return (
        <div>
            <FormControl size='small' sx={{ width: 150 }}>
                <InputLabel id="demo-multiple-name-label">Minibar</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={withMinibar}
                    onChange={handleChange}
                    input={<OutlinedInput label="minibar" />}
                    MenuProps={MenuProps}
                >
                    {options.map((name) => (
                        //@ts-ignore
                        <MenuItem
                            key={name.id}
                            value={name.value}
                            style={getStyles(name.value, withMinibar, theme)}
                        >
                            {name.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}