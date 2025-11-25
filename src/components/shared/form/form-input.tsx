import { useFieldContext } from "./form-hooks";
import { Input } from "@/components/ui/input";
import { FormControlProps } from "./models/form.models";
import { FormBase } from "./form-base";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CircleAlert, Mail, CircleQuestionMark } from "lucide-react";

export function FormInput({
  type = "text",
  ...props
}: FormControlProps & { type?: string }) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props} horizontal={false} controlFirst={false}>
      {type === "password" ? (
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
      ) : (
        <InputGroup>
          <InputGroupInput
            type={type}
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            aria-invalid={isInvalid}
            autoComplete="off"
          />
          {type === "email" && (
            <InputGroupAddon align="inline-start">
              <Mail
                size={16}
                className={`${isInvalid ? "text-qo-brand-500" : "text-qo-icon-neutral"}`}
              />
            </InputGroupAddon>
          )}

          <InputGroupAddon align="inline-end" className="text-qo-icon-neutral">
            {isInvalid ? <CircleAlert /> : <CircleQuestionMark />}
          </InputGroupAddon>
        </InputGroup>
      )}
    </FormBase>
  );
}
