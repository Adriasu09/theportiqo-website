import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FieldGroup } from "@/components/ui/field";
import { WaitingListData } from "@/src/types/auth.types";
import { useAuth } from "@/src/contexts/AuthContext";
import { ReactElement, useState } from "react";
import rocket3D from "@assets/imgs/3d/rocket.png";
import { WAITING_LIST_DEFAULT_VALUES } from "../../../constants/waiting-list.constants";
import { WaitingListFormSchema } from "../../../schemas/waiting-list.schema";
import { useAppForm } from "@/src/components/shared/form/form-hooks";

type Props = {
  type: "brand" | "primary";
  labelKey: string;
};

export const WaitingListDialog = ({ type, labelKey }: Props) => {
  const { t } = useTranslation();
  const { waitingList } = useAuth();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const waitingListForm = useAppForm({
    defaultValues: WAITING_LIST_DEFAULT_VALUES,
    validators: {
      onChange: WaitingListFormSchema,
    },
    onSubmit: async ({ value }) => {
      const waitingListData: WaitingListData = {
        name: `${value.firstName} ${value.lastName}`,
        email: value.email,
        lists: [9], //* Testing list ID
      };

      await waitingList(waitingListData)
        .then(() => {
          setShowConfirmation(true);
        })
        .catch((err) => {
          console.error("Error submitting to waiting list", err);
          setShowConfirmation(false);
        });
    },
  });

  const defaultHeader: ReactElement = (
    <DialogHeader>
      <DialogTitle>
        <div className="flex w-full flex-col items-start gap-4">
          <Badge variant={"outline"}>{t("global.badge.waitingList")}</Badge>
          <h1 className="font-accent text-[40px]">
            {t("landing.waitingList.default.title")}
          </h1>
        </div>
      </DialogTitle>
      <DialogDescription className="font-main text-qo-md">
        {t("landing.waitingList.default.description")}
      </DialogDescription>
    </DialogHeader>
  );

  const successHeader: ReactElement = (
    <DialogHeader>
      <DialogTitle>
        <div className="flex w-full flex-col items-start gap-4">
          <Badge variant={"outline"}>{t("global.badge.waitingList")}</Badge>
          <img src={rocket3D} width={"200px"} />
          <h1 className="font-accent text-[40px]">
            {t("landing.waitingList.success.title")}
          </h1>
        </div>
      </DialogTitle>
      <DialogDescription className="mt-8 font-main text-qo-base">
        {t("landing.waitingList.success.description")}
      </DialogDescription>
    </DialogHeader>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={type === "brand" ? "brand" : "primary"}>
          {t(
            `global.button.${labelKey}`,
          )}
          {type === "brand" && <ArrowRight />}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[800px] p-12">
        {showConfirmation ? successHeader : defaultHeader}

        {!showConfirmation ? (
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
                <field.Checkbox label={t("global.label.acceptCommunication")} />
              )}
            />
          </form>
        ) : (
          <DialogClose asChild>
            <Button variant={"brand"} className="onboarding-button">
              {t("global.button.close")}
              <ArrowRight />
            </Button>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  );
};
