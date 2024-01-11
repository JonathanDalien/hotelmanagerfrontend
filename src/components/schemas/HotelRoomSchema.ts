 import * as yup from "yup";

 // yup schema for the form
    export const hotelRoomSchema = yup.object().shape({
        roomNumber: yup.number().positive("Bitte geben Sie eine gültige Zahl ein").required("Zimmernummer ist erforderlich").typeError("Bitte geben Sie eine gültige Zahl ein"),
        roomSize: yup.string().required("Zimmergröße ist erforderlich"),
        miniBar: yup.boolean().required("Minibar ist erforderlich")
    })
