import TextField from "@mui/material/TextField";
import InputMask from "react-input-mask";

export function Input({
  mask,
  label,
  name,
  type,
  value,
  required,
  onChange,
}: {
  mask?: string;
  label: string;
  name: string;
  type?: string;
  value?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  if (!mask) {
    <TextField
      name={name}
      id="outlined-basic"
      label={label}
      variant="outlined"
    />;
  }

  return (
    <InputMask mask={mask as string} value={value} onChange={onChange}>
      <TextField
        name={name}
        id="outlined-basic"
        label={label}
        variant="outlined"
        required={required}
        type={type}
      />
    </InputMask>
  );
}
