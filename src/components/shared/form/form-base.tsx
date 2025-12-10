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
  controlFirst,
  horizontal,
  showErrorMessage = true,
  customLabel = undefined,
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
      orientation={horizontal ? "horizontal" : undefined}
      className="gap-2 font-main"
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {customLabel ?? labelElement}
            {showErrorMessage && errorElement}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent>{customLabel ?? labelElement}</FieldContent>
          {children}
          {showErrorMessage && errorElement}
        </>
      )}
    </Field>
  );
}
