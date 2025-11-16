import { Badge } from "@/components/ui/badge";
import { CREATE_ACCOUNT_DEFAULT_VALUES } from "./constants/create-acount.constants";
import { CreateAccountFormSchema } from "./schemas/create-account.schema";
import {
  FieldGroup,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useAppForm } from "../../shared/form/form-hooks";

export const CreateAccountPage = () => {
  const createAccountForm = useAppForm({
    defaultValues: CREATE_ACCOUNT_DEFAULT_VALUES,
    validators: {
      onSubmit: CreateAccountFormSchema,
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted with values:", value);
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div className="flex w-full flex-col items-center gap-8">
        <Badge variant="pop">1/3</Badge>
        <h1 className="font-accent text-qo-h3">Create Account</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createAccountForm.handleSubmit();
        }}
        className="flex w-full flex-col items-center justify-center gap-4"
      >
        <FieldGroup>
          <createAccountForm.AppField
            name="name"
            children={(field) => <field.Input label="Name" />}
          />

          <createAccountForm.AppField
            name="lastName"
            children={(field) => <field.Input label="Last name" />}
          />

          <createAccountForm.AppField
            name="email"
            children={(field) => <field.Input type="email" label="Email" />}
          />

          <createAccountForm.AppField
            name="phone"
            children={(field) => <field.Input label="Phone" />}
          />

          <createAccountForm.AppField
            name="documentNumber"
            children={(field) => <field.Input label="Document Number" />}
          />
        </FieldGroup>

        <Button type="submit" variant={"secondary"} className="w-full">
          Continue
        </Button>
      </form>
    </div>
  );
};
