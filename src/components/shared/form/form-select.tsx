import { ReactNode } from "react";
import { FormControlProps } from "./models/form.models";
import { FormBase } from "./form-base";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldContext } from "./form-hooks";

export function FormSelect({
  children,
  ...props
}: FormControlProps & { children: ReactNode }) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <Select
        onValueChange={(e) => field.handleChange(e)}
        value={field.state.value}
        aria-invalid={isInvalid}
      >
        <SelectTrigger onBlur={field.handleBlur}>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>{children}</SelectContent>
      </Select>
    </FormBase>
  );
}
