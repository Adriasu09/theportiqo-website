import { useFieldContext } from "./form-hooks";
import { FormControlProps } from "./models/form.models";
import { FormBase } from "./form-base";
import { Checkbox } from "@/components/ui/checkbox";
import { ReactElement } from "react";

export function FormCheckbox(
  props: FormControlProps & { customLabel?: ReactElement },
) {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase
      {...props}
      customLabel={props.customLabel}
      horizontal={true}
      controlFirst={true}
    >
      <Checkbox
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onBlur={field.handleBlur}
        onCheckedChange={(e) => field.handleChange(e === true)}
        aria-invalid={isInvalid}
      />
    </FormBase>
  );
}
