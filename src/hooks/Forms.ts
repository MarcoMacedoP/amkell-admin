import { useState, ChangeEvent, Dispatch, SetStateAction } from "react"


export function useForm<S>(initialState: S): [S, (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, Dispatch<SetStateAction<S>>] {
    const [values, setValues] = useState(initialState);
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        event.preventDefault();
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return [values, handleChange, setValues]
}