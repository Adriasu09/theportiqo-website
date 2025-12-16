import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormInput } from "./form-input";
import { FormCheckbox } from "./form-checkbox";
import { FormPhoneSelect } from "./form-phone-selector";
import { FormSelect } from "./form-select";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Checkbox: FormCheckbox,
    PhoneSelect: FormPhoneSelect,
    Select: FormSelect,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
