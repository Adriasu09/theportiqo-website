import { useFieldContext } from "./form-hooks";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { FormBaseProps } from "./models/form.models";

export function FormBase({
  children,
  label,
  description,
  horizontal,
}: FormBaseProps) {
  const field = useFieldContext();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const labelElement = (
    <>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  );

  const errorElement = isInvalid && (
    <FieldError errors={field.state.meta.errors} />
  );

  return (
    <Field
      data-invalid={isInvalid}
      data-horizontal={horizontal ? "horizontal" : undefined}
    >
      <FieldContent>{labelElement}</FieldContent>
      {children}
      {errorElement}
    </Field>
  );
}
