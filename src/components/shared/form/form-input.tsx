import { useFieldContext } from "./form-hooks";
import { Input } from "@/components/ui/input";
import { FormControlProps } from "./models/form.models";
import { FormBase } from "./form-base";

export function FormInput({
  
  type = "text",
  ...props
}: FormControlProps & { type?: string }) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <Input
        type={type}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        autoComplete="off"
      />
    </FormBase>
  );
}
