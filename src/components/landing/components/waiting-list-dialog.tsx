import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppForm } from "../../shared/form/form-hooks";
import { WAITING_LIST_DEFAULT_VALUES } from "../constants/waiting-list.constants";
import { WaitingListFormSchema } from "../schemas/waiting-list.schema";
import { FieldGroup } from "@/components/ui/field";

type Props = {
  type: "navbar" | "hero";
};

export const WaitingListDialog = ({ type }: Props) => {
  const { t } = useTranslation();

  const waitingListForm = useAppForm({
    defaultValues: WAITING_LIST_DEFAULT_VALUES,
    validators: {
      onChange: WaitingListFormSchema,
    },
    onSubmit: async ({ value }) => {
      // TODO: Implement waiting list submission logic
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={type === "navbar" ? "brand" : "primary"}>
          {t(
            `global.button.${type === "navbar" ? "joinTheWaitList" : "beTheFirst"}`,
          )}
          <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[800px] p-12">
        <DialogHeader>
          <DialogTitle>
            <div className="flex w-full flex-col items-start gap-4">
              <Badge variant={"outline"}>{t("global.badge.waitingList")}</Badge>
              <h1 className="font-accent text-[40px]">
                {t("landing.waitingList.title")}
              </h1>
            </div>
          </DialogTitle>
          <DialogDescription className="font-main text-qo-md">
            {t("landing.waitingList.description")}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            waitingListForm.handleSubmit();
          }}
          className="flex w-full flex-col items-start justify-start gap-8"
        >
          <FieldGroup className="max-w-[320px]">
            <waitingListForm.AppField
              name="firstName"
              children={(field) => (
                <field.Input label={t("global.label.firstName")} />
              )}
            />

            <waitingListForm.AppField
              name="lastName"
              children={(field) => (
                <field.Input label={t("global.label.lastName")} />
              )}
            />

            <waitingListForm.AppField
              name="email"
              children={(field) => (
                <field.Input label={t("global.label.email")} />
              )}
            />
          </FieldGroup>

          <waitingListForm.Subscribe
            selector={(state) => [state.canSubmit, state.isDirty]}
            children={([canSubmit, isDirty]) => (
              <Button
                type="submit"
                className="onboarding-button"
                disabled={!canSubmit || !isDirty}
              >
                {t("global.button.submit")}
              </Button>
            )}
          />

          <waitingListForm.AppField
            name="acceptCommunication"
            children={(field) => (
              <field.Checkbox
                label={t("global.label.acceptCommunication")}
              />
            )}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};
