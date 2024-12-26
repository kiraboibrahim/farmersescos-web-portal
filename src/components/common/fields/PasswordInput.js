import {IconButton} from "@mui/joy";
import {useState} from "react";
import TextInput from "./TextInput";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function PasswordInput({sx = [], label, containerSx, ...props}) {
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    return (
        <TextInput
            sx={sx}
            label={label}
            containerSx={containerSx}
            {...props}
            type={passwordVisibility ? "text" : "password"}
            endDecorator={
                passwordVisibility ? (
                    <IconButton onClick={() => setPasswordVisibility(false)}>
                        <VisibilityOffOutlinedIcon/>
                    </IconButton>
                ) : (
                    <IconButton onClick={() => setPasswordVisibility(true)}>
                        <VisibilityOutlinedIcon/>
                    </IconButton>
                )
            }
        />
    );
}
