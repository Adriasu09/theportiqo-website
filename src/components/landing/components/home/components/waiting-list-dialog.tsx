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
import { ArrowRight, XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FieldGroup } from "@/components/ui/field";
import { WaitingListData } from "@/src/types/auth.types";
import { useAuth } from "@/src/contexts/AuthContext";
import { ReactElement, useState } from "react";
import rocket3D from "@assets/imgs/3d/rocket.png";
import { WAITING_LIST_DEFAULT_VALUES } from "../../../constants/waiting-list.constants";
import { WaitingListFormSchema } from "../../../schemas/waiting-list.schema";
import { useAppForm } from "@/src/components/shared/form/form-hooks";
import { useDeviceStore } from "@/src/store/device.store";

type Props = {
  type: "brand" | "primary";
  labelKey: string;
};

export const WaitingListDialog = ({ type, labelKey }: Props) => {
  const { t } = useTranslation();
  const { waitingList } = useAuth();
  const { deviceLanguage } = useDeviceStore();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const waitingListForm = useAppForm({
    defaultValues: WAITING_LIST_DEFAULT_VALUES,
    validators: {
      onSubmit: WaitingListFormSchema,
    },
    onSubmit: async ({ value }) => {
      const waitingListData: WaitingListData = {
        firstName: value.firstName,
        lastName: value.lastName,
        lang: deviceLanguage && deviceLanguage.includes("es") ? "es" : "en",
        email: value.email,
      };

      await waitingList(waitingListData)
        .then(() => {
          setShowConfirmation(true);
        })
        .catch((err) => {
          console.error("Error submitting to waiting list", err);
          setShowError(true);
          setShowConfirmation(false);
        });
    },
  });

  const handleDialogOpenChange = () => {
    setIsOpen(!isOpen);

    setTimeout(() => {
      setShowConfirmation(false);
      setShowError(false);
      waitingListForm.reset(WAITING_LIST_DEFAULT_VALUES);
    }, 200);
  };

  const defaultHeader: ReactElement = (
    <DialogHeader className="h-auto">
      <DialogTitle>
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full items-center justify-between">
            <Badge variant={"outline"}>{t("global.badge.waitingList")}</Badge>

            <DialogClose asChild>
              <XIcon className="cursor-pointer" size={32} />
            </DialogClose>
          </div>
          <h1 className="text-left font-accent text-accent-xl">
            {t("landing.waitingList.default.title")}
          </h1>
        </div>
      </DialogTitle>
      <DialogDescription className="text-left font-accent-regular text-accent-md">
        {t("landing.waitingList.default.description")}
      </DialogDescription>
    </DialogHeader>
  );

  const successHeader: ReactElement = (
    <DialogHeader>
      <DialogTitle>
        <div className="flex w-full flex-col items-center gap-4">
          <Badge variant={"outline"}>{t("global.badge.waitingList")}</Badge>
          <img src={rocket3D} width={"200px"} />
          <h1 className="font-accent text-[40px]">
            {t("landing.waitingList.success.title")}
          </h1>
        </div>
      </DialogTitle>
      <DialogDescription className="mt-8 w-full text-center font-main">
        {t("landing.waitingList.success.description")}
      </DialogDescription>
    </DialogHeader>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant={type === "brand" ? "brand" : type}>
          {type === "brand" ? (
            <>
              <span className="max-xs:hidden">
                {t(`global.button.joinTheWaitList`)}
              </span>
              <span className="xs:hidden">
                {t(`global.button.joinTheWaitListReduced`)}
              </span>
            </>
          ) : (
            t(`global.button.${labelKey}`)
          )}
          {type === "brand" && <ArrowRight />}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] min-h-[688px] w-11/12 overflow-y-auto p-12 sm:w-[600px]">
        {showConfirmation ? successHeader : defaultHeader}

        {!showConfirmation ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              waitingListForm.handleSubmit();
            }}
            className="flex w-full flex-col items-center justify-start gap-qo-lg"
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

              {showError && (
                <p className="mt-2 text-sm font-bold text-qo-brand-500">
                  {t("global.error.registeredEmail")}
                </p>
              )}
            </FieldGroup>

            <waitingListForm.Subscribe
              selector={(state) => [
                state.values.firstName,
                state.values.lastName,
                state.values.email,
                state.values.acceptCommunication,
                state.values.acceptPrivacyPolicy,
              ]}
              children={([
                firstName,
                lastName,
                email,
                acceptCommunication,
                acceptPrivacyPolicy,
              ]) => (
                <Button
                  type="submit"
                  className="w-full max-w-[320px]"
                  disabled={
                    !firstName ||
                    !lastName ||
                    !email ||
                    !acceptCommunication ||
                    !acceptPrivacyPolicy
                  }
                >
                  {t("global.button.submit")}
                </Button>
              )}
            />

            <div className="flex w-full flex-col items-center justify-center gap-qo-lg">
              <waitingListForm.AppField
                name="acceptCommunication"
                children={(field) => (
                  <field.Checkbox
                    customLabel={
                      <p className="flex-1 text-base">
                        <span>{t("global.label.acceptCommunication.1")}</span>
                        <span
                          onClick={() =>
                            window.open("/landing/commercials", "_blank")
                          }
                          className="mx-1 cursor-pointer underline"
                        >
                          {t("global.label.acceptCommunication.2")}
                        </span>
                        <span>{t("global.label.acceptCommunication.3")}</span>
                      </p>
                    }
                  />
                )}
              />

              <waitingListForm.AppField
                name="acceptPrivacyPolicy"
                children={(field) => (
                  <field.Checkbox
                    customLabel={
                      <p className="flex-1 text-base">
                        <span>{t("global.label.acceptPrivacyPolicy.1")}</span>
                        <span
                          onClick={() =>
                            window.open("/landing/privacy-policy", "_blank")
                          }
                          className="mx-1 cursor-pointer underline"
                        >
                          {t("global.label.acceptPrivacyPolicy.2")}
                        </span>
                        <span>{t("global.label.acceptPrivacyPolicy.3")}</span>
                      </p>
                    }
                  />
                )}
              />
            </div>
          </form>
        ) : (
          <DialogClose asChild>
            <div className="flex w-full justify-center">
              <Button
                variant={"brand"}
                className="flex w-full max-w-[320px] justify-between"
              >
                <p className="w-56 text-center">{t("global.button.close")}</p>

                <ArrowRight />
              </Button>
            </div>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  );
};
