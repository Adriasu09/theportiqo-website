import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormInput } from "./form-input";
import { FormCheckbox } from "./form-checkbox";
import { FormPhoneSelector } from "./form-phone-selector";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Checkbox: FormCheckbox,
    PhoneSelector: FormPhoneSelector,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
