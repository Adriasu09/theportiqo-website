import { useFieldContext } from "./form-hooks";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { FormBaseProps } from "./models/form.models";
import { useTranslation } from "react-i18next";

export function FormBase({
  children,
  label,
  description,
  controlFirst,
  horizontal,
  showErrorMessage = true,
}: FormBaseProps) {
  const { t } = useTranslation();
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
      className="gap-2"
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {labelElement}
            {showErrorMessage && errorElement}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent>{labelElement}</FieldContent>
          {children}
          {showErrorMessage && errorElement}
        </>
      )}
    </Field>
  );
}
