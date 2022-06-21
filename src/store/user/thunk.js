
import { updateUserFirebase } from "../../firebase/providers";
import { updateUser } from "./userSlice";

export const startUpdateUser = ({ name }) => {
    return async ( dispatch ) => {
        const { isSaving, messageSaved, nameUser } = await updateUserFirebase({name});
        // dispatch( updateUser({ isSaving, messageSaved, nameUser }) );
    }
}